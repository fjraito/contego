import type { CollectionConfig } from 'payload'
import { put } from '@vercel/blob'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    disableLocalStorage: true,
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if ((operation === 'create' || operation === 'update') && args.req?.file) {
          const file = args.req.file
          const token = process.env.BLOB_READ_WRITE_TOKEN
          if (!token) return args

          const blob = await put(file.name || `media-${Date.now()}`, file.data, {
            access: 'public',
            token,
            contentType: file.mimetype,
          })

          args.req.file = {
            ...file,
            tempFilePath: undefined,
          }
          args.data = {
            ...args.data,
            url: blob.url,
            filename: file.name,
            mimeType: file.mimetype,
            filesize: file.size,
          }
        }
        return args
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: { readOnly: true, hidden: true },
    },
  ],
}
