import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    '@payloadcms/storage-vercel-blob',
    '@payloadcms/plugin-cloud-storage',
    '@vercel/blob',
  ],
}

export default withPayload(nextConfig)
