import type { GlobalConfig } from 'payload'

export const SiteVideos: GlobalConfig = {
  slug: 'site-videos', // ชื่ออ้างอิงสำหรับ API (ห้ามเปลี่ยน)
  label: 'วิดีโอแนะนำ (Featured Videos)',
  access: {
    read: () => true, // เปิดให้ทุกคนดูข้อมูลได้ (Public)
  },
  fields: [
    {
      name: 'videos',
      type: 'array',
      label: 'รายการวิดีโอ (Videos List)',
      minRows: 0,
      maxRows: 2, 
      labels: {
        singular: 'Video',
        plural: 'Videos',
      },
      fields: [
        {
          name: 'videoType',
          type: 'radio',
          label: 'ประเภทวิดีโอ (Video Type)',
          defaultValue: 'youtube',
          options: [
            { label: 'YouTube Link', value: 'youtube' },
            { label: 'อัปโหลดไฟล์ (Upload)', value: 'upload' },
          ],
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            description: 'เช่น https://www.youtube.com/watch?v=xxxxx',
            condition: (data, siblingData) => siblingData?.videoType === 'youtube',
          },
        },
        {
          name: 'videoFile',
          type: 'upload',
          relationTo: 'media', // ต้องตรงกับชื่อ Collection Media ของคุณ
          label: 'ไฟล์วิดีโอ (Video File)',
          admin: {
            condition: (data, siblingData) => siblingData?.videoType === 'upload',
          },
        },
      ],
    },
  ],
}