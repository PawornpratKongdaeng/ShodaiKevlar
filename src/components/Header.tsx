'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  lang: 'th' | 'en'
}

export function Header({ lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // 1. Detect Scroll เพื่อเปลี่ยนสี Header (เหมือนเดิม)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ✅ 2. เพิ่มส่วนนี้: ล็อค Scroll เมื่อเปิดเมนู
  useEffect(() => {
    if (isMobileMenuOpen) {
      // เมื่อเปิดเมนู: ห้ามเลื่อนหน้าจอ
      document.body.style.overflow = 'hidden'
    } else {
      // เมื่อปิดเมนู: ให้เลื่อนได้ปกติ
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup function: เผื่อกรณี component ถูก destroy
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // ฟังก์ชันสลับภาษา
  const switchLang = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`
    // ถ้า path เป็น '/' (root) ต้องจัดการพิเศษหน่อยเพื่อไม่ให้ url พัง
    if (pathname === '/th' || pathname === '/en') return `/${targetLang}`
    return pathname.replace(`/${lang}`, `/${targetLang}`)
  }

  const navLinks = [
    { label: lang === 'th' ? 'หน้าแรก' : 'Home', href: `/${lang}` },
    { label: lang === 'th' ? 'สินค้า' : 'Shop', href: `/${lang}/shop` },
    { label: lang === 'th' ? 'เกี่ยวกับเรา' : 'About', href: `/${lang}/about` },
    { label: lang === 'th' ? 'ติดต่อ' : 'Contact', href: `/${lang}/contact` },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        // ✅ 3. ปรับ Logic ตรงนี้:
        // ถ้าเปิดเมนูอยู่ (isMobileMenuOpen) -> ให้เป็น bg-transparent (ใส) ทันที
        // ถ้าปิดเมนู และเลื่อนลงมา (isScrolled) -> ให้เป็น bg-black (ดำ)
        isMobileMenuOpen 
            ? 'bg-transparent border-none' 
            : (isScrolled 
                ? 'bg-[#020000]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' 
                : 'bg-transparent py-5')
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href={`/${lang}`} className="relative z-50 group">
            <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase group-hover:text-red-500 transition-colors">
              SHODAI<span className="text-red-600 group-hover:text-white transition-colors">KEVLAR</span>
            </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors ${
                pathname === link.href ? 'text-red-500' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="w-px h-4 bg-white/20"></div>

          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
            <Link
              href={switchLang('th')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                lang === 'th' ? 'bg-red-600 text-white shadow-red-900/50 shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              TH
            </Link>
            <Link
              href={switchLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-red-600 text-white shadow-red-900/50 shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </Link>
          </div>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-white p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

        {/* MOBILE FULLSCREEN MENU */}
        {/* ✅ ปรับพื้นหลังให้ทึบขึ้น (bg-black) เพื่อปิดบังเนื้อหาที่ถูก scroll ด้านหลัง */}
        <div className={`fixed inset-0 bg-[#020000] z-40 flex flex-col items-center justify-center transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
            {/* Background Effects ในเมนู (Optional: เพื่อความสวยงาม) */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-red-900/20 rounded-full blur-[100px] pointer-events-none"></div>

            <nav className="flex flex-col items-center gap-8 mb-8 relative z-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-black uppercase text-white hover:text-red-500 transition-transform hover:scale-110"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex gap-4 relative z-10">
              <Link href={switchLang('th')} className={`text-xl font-bold ${lang === 'th' ? 'text-red-500 underline decoration-4 underline-offset-8' : 'text-gray-500'}`}>THAI</Link>
              <div className="w-px h-8 bg-white/20"></div>
              <Link href={switchLang('en')} className={`text-xl font-bold ${lang === 'en' ? 'text-red-500 underline decoration-4 underline-offset-8' : 'text-gray-500'}`}>ENGLISH</Link>
            </div>
        </div>

      </div>
    </header>
  )
}