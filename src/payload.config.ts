import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: ['th', 'en'], // ภาษาที่มี
    defaultLocale: 'th',   // ภาษาหลัก
    fallback: true,        // ถ้าภาษาอังกฤษไม่มีข้อมูล ให้โชว์ไทยแทน
  },

  globals: [HomePage],

  collections: [Users, Media,Products],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true, // 👈 บอกว่าจะใช้ S3 กับ Collection ชื่อ 'media'
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION || 'auto', // Cloudflare R2 ใช้ 'auto'
        endpoint: process.env.S3_ENDPOINT, // ใส่ URL ของ R2/S3
        forcePathStyle: true, // จำเป็นสำหรับ R2
      },
    }),],
})
