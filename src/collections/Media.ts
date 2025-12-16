import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // ❌ ลบ required: true ออก หรือใส่เป็น false
      // เพื่อให้ระบบยอมสร้างรูปโดยไม่ต้องกรอก Alt ทันที (ค่อยมาแก้ทีหลังได้)
      required: false, 
      label: 'Alt Text (คำอธิบายรูป)',
    },
  ],
  upload: {
    staticDir: 'media', 
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'], 
  },
}