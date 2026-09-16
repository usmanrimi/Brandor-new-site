export const dynamic = "force-dynamic";

import React from 'react'
import { PrismaClient } from '@prisma/client'
import PublishClient from './PublishClient'
import { getGitHubConfig, getLatestDeploymentStatus } from '@/lib/github'

const prisma = new PrismaClient()

export default async function PublishPage() {
  const [config, deployment, servicesCount, projectsCount, teamCount, partnersCount] = await Promise.all([
    getGitHubConfig(),
    getLatestDeploymentStatus(),
    prisma.service.count().catch(() => 0),
    prisma.project.count().catch(() => 0),
    prisma.teamMember.count().catch(() => 0),
    prisma.partner.count().catch(() => 0)
  ])

  return (
    <div>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <h1>Publish to GitHub</h1>
        <p>Publish your saved website content updates directly to your GitHub repository.</p>
      </header>

      <PublishClient
        isConfigured={config.isConfigured}
        repoInfo={{
          owner: config.owner,
          repo: config.repo,
          branch: config.branch
        }}
        deployment={deployment}
        summary={{
          servicesCount,
          projectsCount,
          teamCount,
          partnersCount
        }}
      />
    </div>
  )
}
