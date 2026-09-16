import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

export interface GitHubPublishResult {
  success: boolean
  message: string
  commitSha?: string
  commitUrl?: string
  publishedAt?: string
  deploymentStatus?: string
  error?: string
}

export async function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER || 'usmanrimi'
  const repo = process.env.GITHUB_REPO || 'Brandor-new-site'
  const branch = process.env.GITHUB_BRANCH || 'main'

  let hasLocalGit = false
  try {
    const remote = execSync('git remote get-url origin', { encoding: 'utf8', timeout: 3000 }).trim()
    hasLocalGit = Boolean(remote && remote.includes('Brandor-new-site'))
  } catch {
    hasLocalGit = false
  }

  const isConfigured = Boolean((token && token.trim().length > 0) || hasLocalGit)

  return {
    isConfigured,
    mode: (token && token.trim().length > 0) ? 'api' : (hasLocalGit ? 'git-cli' : 'none'),
    token,
    owner,
    repo,
    branch
  }
}

/**
 * Builds the content snapshot JSON payload from the authoritative PostgreSQL database.
 * Preserves media references without bloating Git with binary blobs.
 */
export async function buildContentSnapshot() {
  const [homeContent, aboutContent, services, projects, team, partners, setting] = await Promise.all([
    prisma.homeContent.findUnique({ where: { id: 'global' } }).catch(() => null),
    prisma.aboutContent.findUnique({ where: { id: 'global' } }).catch(() => null),
    prisma.service.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.teamMember.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.partner.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.setting.findUnique({ where: { id: 'global' } }).catch(() => null)
  ])

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    site: setting || {},
    home: homeContent || {},
    about: aboutContent || {},
    services: services || [],
    projects: (projects || []).map(p => ({
      id: p.id,
      title: p.title,
      client: p.client,
      category: p.category,
      date: p.date,
      location: p.location,
      description: p.description,
      images: p.images,
      videoUrl: p.videoUrl,
      pdfUrl: p.pdfUrl,
      isPdfPublished: p.isPdfPublished
    })),
    team: team || [],
    partners: partners || []
  }
}

/**
 * Commits the published content snapshot to the GitHub repository.
 * Uses GitHub REST API if GITHUB_TOKEN is present, or local authenticated Git CLI if available.
 */
export async function publishSnapshotToGitHub(): Promise<GitHubPublishResult> {
  const config = await getGitHubConfig()

  if (!config.isConfigured) {
    return {
      success: false,
      message: 'GitHub is not configured.',
      error: 'Missing GITHUB_TOKEN environment variable and local git remote is unavailable.'
    }
  }

  const { token, owner, repo, branch, mode } = config
  const snapshot = await buildContentSnapshot()
  const contentString = JSON.stringify(snapshot, null, 2)
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16)
  const commitMessage = `Publish website content from Brandor Super Admin [${timestamp} UTC]`

  // Method 1: Local Authenticated Git CLI
  if (mode === 'git-cli' || !token) {
    try {
      const dataDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      const dataFilePath = path.join(dataDir, 'published-content.json')
      fs.writeFileSync(dataFilePath, contentString, 'utf8')

      execSync('git add data/published-content.json', { encoding: 'utf8', timeout: 10000 })
      
      // Check if there are changes to commit
      const status = execSync('git status --porcelain data/published-content.json', { encoding: 'utf8', timeout: 5000 }).trim()
      let commitSha = ''
      
      if (status) {
        execSync(`git commit -m "${commitMessage}"`, { encoding: 'utf8', timeout: 15000 })
        execSync(`git push origin ${branch}`, { encoding: 'utf8', timeout: 30000 })
        commitSha = execSync('git rev-parse HEAD', { encoding: 'utf8', timeout: 5000 }).trim()
      } else {
        commitSha = execSync('git rev-parse HEAD', { encoding: 'utf8', timeout: 5000 }).trim()
      }

      const shortSha = commitSha.substring(0, 7)
      const commitUrl = `https://github.com/${owner}/${repo}/commit/${commitSha}`

      return {
        success: true,
        message: 'Content snapshot successfully published and pushed to GitHub!',
        commitSha: shortSha,
        commitUrl,
        publishedAt: new Date().toLocaleString(),
        deploymentStatus: 'Pushed to GitHub main'
      }
    } catch (gitError: any) {
      console.error('Git CLI publish error:', gitError)
      return {
        success: false,
        message: 'Git publish failed.',
        error: gitError?.stderr || gitError?.message || 'Unknown git execution error'
      }
    }
  }

  // Method 2: GitHub REST API
  const filePath = 'data/published-content.json'
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`

  try {
    let fileSha: string | undefined = undefined
    const checkRes = await fetch(`${url}?ref=${branch}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Brandor-Super-Admin'
      },
      cache: 'no-store'
    })

    if (checkRes.status === 200) {
      const checkData = await checkRes.json()
      fileSha = checkData.sha
    } else if (checkRes.status === 401 || checkRes.status === 403) {
      return {
        success: false,
        message: 'GitHub authentication failed. Please verify your GITHUB_TOKEN permissions.',
        error: `HTTP ${checkRes.status} from GitHub API`
      }
    }

    const contentBase64 = Buffer.from(contentString, 'utf8').toString('base64')

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Brandor-Super-Admin'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: contentBase64,
        branch,
        ...(fileSha ? { sha: fileSha } : {})
      })
    })

    if (!putRes.ok) {
      const errorData = await putRes.json().catch(() => ({}))
      return {
        success: false,
        message: 'Failed to commit changes to GitHub repository.',
        error: errorData.message || `HTTP ${putRes.status}`
      }
    }

    const putData = await putRes.json()
    const commitSha = putData.commit?.sha || 'unknown'
    const commitUrl = putData.commit?.html_url || `https://github.com/${owner}/${repo}/commit/${commitSha}`

    return {
      success: true,
      message: 'Content snapshot successfully published and committed to GitHub!',
      commitSha: commitSha.substring(0, 7),
      commitUrl,
      publishedAt: new Date().toLocaleString(),
      deploymentStatus: 'Queued / In Progress'
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'Network error communicating with GitHub.',
      error: error?.message || 'Unknown network error'
    }
  }
}

/**
 * Fetches the latest deployment status from GitHub for the repository.
 */
export async function getLatestDeploymentStatus() {
  const config = await getGitHubConfig()
  if (!config.token) return null

  const { token, owner, repo } = config
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/deployments?per_page=1`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Brandor-Super-Admin'
      },
      cache: 'no-store'
    })

    if (!res.ok) return null
    const deployments = await res.json()
    if (!Array.isArray(deployments) || deployments.length === 0) return null

    const latest = deployments[0]
    const statusRes = await fetch(latest.statuses_url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Brandor-Super-Admin'
      },
      cache: 'no-store'
    })

    if (statusRes.ok) {
      const statuses = await statusRes.json()
      if (Array.isArray(statuses) && statuses.length > 0) {
        return {
          state: statuses[0].state,
          environment: latest.environment,
          updatedAt: statuses[0].created_at,
          targetUrl: statuses[0].target_url || latest.payload?.web_url
        }
      }
    }

    return {
      state: 'pending',
      environment: latest.environment,
      updatedAt: latest.created_at
    }
  } catch {
    return null
  }
}
