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
import PayloadLogo from './components/PayloadLogo'
import { SiteVideos } from './globals/SiteVideos'
import { HomePage } from './globals/HomePage'

// ❌ ลบบรรทัด import {css} ... ออกครับ ไม่ต้องใช้

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    // ✅ จุดสำคัญ: ตรวจสอบว่าไฟล์ admin-theme.css อยู่ที่ src/styles/admin-theme.css จริงๆ
    
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    
    // ✅ ใช้ as any เพื่อแก้ Error เรื่อง Type (ตามที่เราคุยกัน)
    components: {
      graphics: {
        Logo: PayloadLogo as any, 
        Icon: PayloadLogo as any, 
      },
    },
    
    meta: {
      titleSuffix: '- SHODAI KEVLAR Admin',
      icons: [
        {
          rel: 'icon',
          type: 'image/png', // หรือ 'image/x-icon' ถ้าใช้ไฟล์ .ico
          url: '/favicon.png', // ลิงก์ไปยังไฟล์ในโฟลเดอร์ public
        },
      ],
    },
  },
  localization: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    fallback: true,
  },
  globals: [
    HomePage,
    SiteVideos, 
  ],
  collections: [Users, Media, Products],
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
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
})