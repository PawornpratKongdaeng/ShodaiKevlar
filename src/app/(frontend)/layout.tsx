import React from 'react'
import { Footer } from '@/components/Footer'

export const metadata = {
  description: 'Shodai Carbon - Premium Carbon Fiber Products',
  title: 'Shodai Carbon - Premium Carbon Fiber Products',
}

// 1. กำหนด Type สำหรับ Props
type LayoutProps = {
  children: React.ReactNode
  // 👇 แก้ตรงนี้: เติม ? หลัง lang เพื่อบอกว่าเป็น Optional (มีก็ได้ ไม่มีก็ได้)
  params: Promise<{ lang?: string }> 
}

// 2. รับ params เข้ามาใน function
export default async function RootLayout({ children, params }: LayoutProps) {
  // 3. ดึงค่า lang ออกมาจาก params
  const resolvedParams = await params
  // 👇 แก้ตรงนี้: ถ้าไม่มีค่า lang ส่งมา ให้ใช้ 'en' แทน (Fallback)
  const lang = resolvedParams?.lang || 'en'

  return (
    // 4. ใส่ lang ให้ tag html
      <body lang={lang}>
        <main>{children}</main>
      </body>
  )
}