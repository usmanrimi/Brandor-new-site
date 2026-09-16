"use server"

import { publishSnapshotToGitHub, getGitHubConfig, getLatestDeploymentStatus } from '@/lib/github'
import { revalidatePath } from 'next/cache'

export async function triggerGitHubPublish() {
  const result = await publishSnapshotToGitHub()
  revalidatePath('/admin/publish')
  return result
}

export async function checkPublishEnvironment() {
  const config = await getGitHubConfig()
  const deployment = await getLatestDeploymentStatus()
  return {
    ...config,
    token: undefined, // Never expose secret token to client
    deployment
  }
}
