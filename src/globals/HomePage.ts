import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'แก้ไขหน้าแรก (Home Page)',
  fields: [
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
    // ❌ ลบส่วน videoTitle, videoUrl เก่าทิ้งได้เลย
  ],
}