import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      localized: true,
      label: 'หัวข้อใหญ่ (Hero Title)',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      localized: true,
      label: 'คำโปรย (Hero Subtitle)',
    },
    {
      name: 'bannerTH', 
      label: 'Banner (ภาษาไทย)',
      type: 'upload',
      relationTo: 'media',
      required: true, 
    },
    {
      name: 'bannerEN',
      label: 'Banner (English)',
      type: 'upload',
      relationTo: 'media',
      required: true, 
    },
    {
      type: 'row',
      fields: [
        {
          name: 'videoTitle',
          type: 'text',
          localized: true,
          label: 'หัวข้อวิดีโอ',
        },
        {
          name: 'videoUrl',
          type: 'text', // ใส่ YouTube ID หรือ URL
          label: 'YouTube Embed URL (เช่น https://www.youtube.com/embed/xxxx)',
        },
      ]
    }
  ],
}