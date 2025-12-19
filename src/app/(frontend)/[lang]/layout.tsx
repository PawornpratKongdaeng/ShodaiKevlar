import React from 'react'
import '../../(frontend)/globals.css'
import { Footer } from '@/components/Footer'

export const metadata = {
  description: 'Shodai Carbon - Premium Carbon Fiber Products',
  title: 'Shodai Carbon - Premium Carbon Fiber Products',
}

// 1. กำหนด Type สำหรับ Props
type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ lang: string }> // ต้องรับ params เป็น Promise
}

// 2. รับ params เข้ามาใน function
export default async function RootLayout({ children, params }: LayoutProps) {
  // 3. ดึงค่า lang ออกมาจาก params
  const { lang } = await params

  return (
    // 4. ใส่ lang ให้ tag html (Dynamic)
     <html lang={lang} suppressHydrationWarning>
      <body>
        <main>{children}</main>
        {/* ส่งค่า lang ไปให้ Footer */}
        <Footer lang={lang as 'th' | 'en'} />
      </body>
    </html>
  )
}