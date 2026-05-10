import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    '@payloadcms/plugin-cloud-storage',
    '@payloadcms/storage-uploadthing',
    'uploadthing',
  ],
}

export default withPayload(nextConfig)
