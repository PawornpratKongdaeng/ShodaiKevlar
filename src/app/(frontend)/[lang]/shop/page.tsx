import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { ShopList } from '@/components/ShopList'


export default async function ShopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!['th', 'en'].includes(lang)) return notFound()

  // 1. Fetch Data (ดึงสินค้าทั้งหมด)
  // หมายเหตุ: ถ้าสินค้ามีเยอะมาก (หลักพันชิ้น) ควรใช้ Pagination แต่สำหรับร้านแต่งรถปกติ ดึงมาหมด 100-200 ชิ้นแล้วกรองฝั่ง Client จะเร็วกว่า
  const payload = await getPayload({ config: configPromise })
  const productsData = await payload.find({
    collection: 'products',
    locale: lang as 'th' | 'en',
    limit: 100, // ปรับจำนวนตามต้องการ
    sort: '-createdAt', 
  })

  return (
    <main className="min-h-screen bg-[#020000] font-sans selection:bg-orange-600 selection:text-white relative">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* สลับตำแหน่ง Blob ให้ต่างจากหน้า Home นิดหน่อย เพื่อความไม่ซ้ำจำเจ */}
         <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-red-900/10 rounded-full blur-[150px] mix-blend-screen -translate-x-1/4 -translate-y-1/4"></div>
         <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-orange-900/10 rounded-full blur-[150px] mix-blend-screen translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative z-50">
        <Header lang={lang as 'th' | 'en'} />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        
        {/* --- PAGE TITLE --- */}
        <div className="text-center mb-16">
            <span className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2 block animate-pulse">
                {lang === 'th' ? 'แคตตาล็อกสินค้า' : 'Official Catalog'}
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic">
                {lang === 'th' ? 'สินค้า' : 'Shop'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{lang === 'th' ? 'ทั้งหมด' : 'All Parts'}</span>
            </h1>
            <div className="w-32 h-2 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-4 rounded-full skew-x-12"></div>
        </div>

        {/* --- CLIENT COMPONENT (LIST & FILTER) --- */}
        {/* ส่งข้อมูล products ทั้งหมดเข้าไปจัดการใน Client */}
        <ShopList 
            products={productsData.docs as any} 
            lang={lang as 'th' | 'en'} 
        />
        
      </div>
    </main>
  )
}