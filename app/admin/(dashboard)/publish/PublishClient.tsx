"use client"

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { triggerGitHubPublish } from './actions'
import { GitHubPublishResult } from '@/lib/github'

interface PublishClientProps {
  isConfigured: boolean
  repoInfo: {
    owner: string
    repo: string
    branch: string
  }
  deployment: any
  summary: {
    servicesCount: number
    projectsCount: number
    teamCount: number
    partnersCount: number
  }
}

export default function PublishClient({ isConfigured, repoInfo, deployment, summary }: PublishClientProps) {
  const [publishing, setPublishing] = useState(false)
  const [result, setResult] = useState<GitHubPublishResult | null>(null)

  const handlePublish = async () => {
    setPublishing(true)
    setResult(null)
    try {
      const res = await triggerGitHubPublish()
      setResult(res)
    } catch (e: any) {
      setResult({
        success: false,
        message: 'Publication request failed',
        error: e.message || 'Unknown error'
      })
    }
    setPublishing(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '900px' }}>
      {/* Overview Card */}
      <div className="admin-card" style={{ padding: '28px', backgroundColor: '#ffffff', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '1.3rem', color: 'var(--admin-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icons.GitBranch size={22} color="var(--orange)" />
          Repository Connection
        </h2>
        <p style={{ color: 'var(--admin-text-light)', fontSize: '0.92rem', marginBottom: '20px' }}>
          Publish your saved database changes as an atomic content snapshot to your connected GitHub repository without affecting codebase files.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Repository</span>
            <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--admin-primary)', fontSize: '0.95rem' }}>
              {repoInfo.owner}/{repoInfo.repo}
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Target Branch</span>
            <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--admin-primary)', fontSize: '0.95rem' }}>
              {repoInfo.branch}
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Authentication</span>
            <p style={{ margin: '4px 0 0', fontWeight: 600, color: isConfigured ? '#16a34a' : '#ea580c', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isConfigured ? <Icons.CheckCircle2 size={16} /> : <Icons.AlertTriangle size={16} />}
              {isConfigured ? 'Ready to Publish' : 'Token Required'}
            </p>
          </div>
        </div>

        {/* Content Staging Summary */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#334155', marginBottom: '12px', fontWeight: 700 }}>
            Live Content Ready in PostgreSQL Database:
          </h4>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
              {summary.servicesCount} Services
            </span>
            <span style={{ backgroundColor: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
              {summary.projectsCount} Projects & Reports
            </span>
            <span style={{ backgroundColor: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
              {summary.teamCount} Team Members
            </span>
            <span style={{ backgroundColor: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
              {summary.partnersCount} Partner Logos
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="btn-admin"
            style={{
              backgroundColor: 'var(--orange)',
              color: '#ffffff',
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: publishing ? 'not-allowed' : 'pointer',
              opacity: publishing ? 0.8 : 1,
              boxShadow: '0 4px 14px rgba(253, 137, 22, 0.3)'
            }}
          >
            {publishing ? (
              <>
                <Icons.Loader2 size={18} className="animate-spin" />
                Publishing to GitHub...
              </>
            ) : (
              <>
                <Icons.UploadCloud size={18} />
                Publish to GitHub
              </>
            )}
          </button>
        </div>
      </div>

      {/* Publication Progress / Status Display */}
      {result && (
        <div style={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: result.success ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${result.success ? '#bbf7d0' : '#fecaca'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {result.success ? (
              <Icons.CheckCircle2 size={24} color="#16a34a" />
            ) : (
              <Icons.AlertCircle size={24} color="#dc2626" />
            )}
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: result.success ? '#15803d' : '#b91c1c' }}>
              {result.message}
            </h3>
          </div>

          {result.error && (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#b91c1c' }}>
              <strong>Details:</strong> {result.error}
            </p>
          )}

          {result.commitSha && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '8px',
              fontSize: '0.92rem',
              color: '#1e293b'
            }}>
              <span><strong>Commit:</strong> <code>{result.commitSha}</code></span>
              <span><strong>Published At:</strong> {result.publishedAt}</span>
              {result.commitUrl && (
                <a
                  href={result.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--orange)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  View on GitHub <Icons.ExternalLink size={14} />
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hosting Deployment Status */}
      {deployment && (
        <div className="admin-card" style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--admin-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Rocket size={18} color="var(--orange)" />
            Hosting Deployment Status
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.92rem' }}>
            <span style={{
              backgroundColor: deployment.state === 'success' ? '#dcfce7' : '#fef9c3',
              color: deployment.state === 'success' ? '#166534' : '#854d0e',
              padding: '4px 12px',
              borderRadius: '999px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.75rem'
            }}>
              {deployment.state}
            </span>
            <span style={{ color: '#64748b' }}>
              Environment: <strong>{deployment.environment}</strong>
            </span>
            {deployment.targetUrl && (
              <a
                href={deployment.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--orange)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Visit Site <Icons.ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Setup Guide if GITHUB_TOKEN is missing */}
      {!isConfigured && (
        <div style={{
          padding: '24px',
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <h4 style={{ margin: 0, color: '#92400e', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.KeyRound size={18} />
            GitHub Token Setup Instructions
          </h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#78350f', lineHeight: 1.6 }}>
            To enable publishing directly to your GitHub repository, add your GitHub Personal Access Token to your environment variables:
          </p>
          <ol style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '0.9rem', color: '#78350f', lineHeight: 1.7 }}>
            <li>Go to <strong>GitHub Settings &gt; Developer settings &gt; Personal access tokens</strong> (Fine-grained or Classic).</li>
            <li>Create a token with <strong>Contents: Read and write</strong> permissions on <code>{repoInfo.owner}/{repoInfo.repo}</code>.</li>
            <li>Add the token to your local <code>.env</code> file (and in your hosting platform dashboard):<br />
              <code style={{ display: 'inline-block', backgroundColor: '#fef3c7', padding: '4px 8px', borderRadius: '4px', marginTop: '6px', fontWeight: 'bold' }}>
                GITHUB_TOKEN="ghp_your_token_here"
              </code>
            </li>
          </ol>
        </div>
      )}
    </div>
  )
}
