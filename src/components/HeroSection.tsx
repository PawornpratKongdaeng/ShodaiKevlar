import React from 'react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#0a0a0a]">
      
      {/* 1. BACKGROUND IMAGE (อยู่หลังสุด) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* เปลี่ยน src เป็น path รูปพื้นหลังของคุณ */}
        <Image 
          src="/images/banner-bg.jpg" // ⚠️ อย่าลืมแก้ path รูปภาพ
          alt="Background" 
          fill
          className="object-cover opacity-40" 
          priority
        />
        {/* Gradient Overlay เพื่อให้ตัวหนังสืออ่านง่าย */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
      </div>

      {/* 2. CONTENT (เนื้อหา) */}
      {/* ✅ จุดสำคัญ: pt-32 (ประมาณ 128px) หรือ pt-40 เพื่อดันเนื้อหาลงมาให้พ้น Header */}
      <div className="relative z-10 container mx-auto px-4 pt-32 md:pt-40 flex flex-col items-center text-center">
        
        {/* หัวข้อ */}
        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4 drop-shadow-xl">
          สมรรถนะที่<span className="text-red-600">เหนือกว่า</span>
        </h1>
        
        {/* ขีดเส้นใต้สวยๆ */}
        <div className="w-24 h-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-10"></div>

        {/* YOUTUBE VIDEO CONTAINER */}
        <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1" // ⚠️ ใส่ ID Youtube ของคุณ
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            ></iframe>
        </div>

        {/* ปุ่ม Call to Action (Optional) */}
        <button className="mt-10 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            ดูสินค้าทั้งหมด
        </button>

      </div>
    </section>
  )
}