'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Type แบบคร่าวๆ (ปรับตามที่ generate มาจริง)
interface ProductViewProps {
  product: any // รับข้อมูลสินค้ามาทั้งก้อน
  lang: 'th' | 'en'
}

export function ProductView({ product, lang }: ProductViewProps) {
  // State สำหรับเปลี่ยนรูปภาพ
  const [activeImage, setActiveImage] = useState(product.image?.url || '')

  // รวมรูปทั้งหมด (รูปหลัก + แกลเลอรี่)
  const allImages = [
    product.image,
    ...(product.gallery?.map((g: any) => g.image) || [])
  ].filter(Boolean)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
      
      {/* --- LEFT: IMAGE GALLERY --- */}
      <div className="space-y-4">
        {/* รูปใหญ่ */}
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 group">
          {/* 👇 แก้ตรงนี้: เช็คว่า activeImage ไม่ใช่ค่าว่างก่อน render */}
          {activeImage ? (
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            // (Optional) ส่วนนี้จะแสดงถ้าไม่มีรูป (Placeholder)
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
               No Image
            </div>
          )}
        </div>

        {/* รูปย่อย (Thumbnails) */}
        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {allImages.map((img: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img.url)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === img.url ? 'border-red-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- RIGHT: PRODUCT INFO --- */}
      <div className="flex flex-col justify-center">
        
        <div className="mb-6">
          <span className="text-red-500 font-bold uppercase tracking-widest text-sm block mb-2">
            {product.carModel || 'Universal'}
          </span>
          <h1 className="text-3xl md:text-5xl font-black italic uppercase leading-tight mb-4">
            {product.name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
        </div>

        {/* ราคา */}
        <div className="text-4xl font-bold text-white mb-8">
          ฿{product.price?.toLocaleString()}
        </div>

        {/* คำอธิบาย */}
        <div className="prose prose-invert prose-p:text-gray-400 mb-10 max-w-none border-t border-white/10 pt-6">
          <p>{product.description || (lang === 'th' ? 'ไม่มีรายละเอียด' : 'No description available.')}</p>
        </div>

        {/* ปุ่ม Action */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* ปุ่มสั่งซื้อ (Line) */}
          <a 
            href="https://line.me/R/ti/p/@shodaiev"
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:to-green-400 text-white font-bold py-4 px-8 rounded-full text-center transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.6 .5.5 5.6.5 11.8c0 3.2 1.8 6 4.5 7.6v3.4l4.2-2.3c.9.2 1.8.4 2.8.4 6.4 0 11.5-5.1 11.5-11.3C23.5 5.6 18.4.5 12 .5z"/></svg>
            {lang === 'th' ? 'สั่งซื้อผ่าน LINE' : 'Buy via LINE'}
          </a>
        </div>

        {/* Features / Guarantee */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Real Carbon 100%
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
             <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
             Warranty 1 Year
          </div>
        </div>

      </div>
    </div>
  )
}