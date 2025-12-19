import React from 'react'
import { Footer } from '@/components/Footer'

// ไม่ต้องใส่ metadata ซ้ำ (มันจะใช้ของตัวแม่เอง หรือถ้าจะแก้ title เฉพาะหน้าค่อยใส่)

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

// ✅ เปลี่ยนชื่อ Function ไม่ให้ซ้ำ (optional)
export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params

  return (
    // ❌ ลบ <html> และ <body> ทิ้งให้หมด
    // ✅ ใช้ Fragment (<>...</>) หรือ <div> ห่อแทน
    <div className="flex flex-col min-h-screen"> 
      <main className="grow">
        {children}
      </main>
      
      {/* Footer อยู่ที่นี่ ถูกต้องแล้ว เพราะต้องรับค่า lang */}
      <Footer lang={lang as 'th' | 'en'} />
    </div>
  )
}