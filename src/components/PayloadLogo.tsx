'use client'

import React from 'react'
// ❌ ลบ import '../styles/admin-theme.css' ออกไปแล้ว

// ✅ ยังคงใช้ export const (Named Export) เพื่อป้องกัน Error addToImportMap
export const PayloadLogo = () => {
  return (
    // ❌ ลบ class 'logo-container' ออก เหลือแค่ Tailwind classes
    <div className="flex items-center gap-2 font-sans text-2xl select-none">
      
      {/* Icon Square */}
      <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-900 rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-500/30">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
          <span className="text-white font-black tracking-widest italic">
             SHODAI
          </span>
          <span className="text-red-600 font-black tracking-[0.15em] italic text-[0.7em]">
             CARBON
          </span>
      </div>
    </div>
  )
}