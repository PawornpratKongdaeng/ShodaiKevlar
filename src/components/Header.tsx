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

  // ตรวจจับการ Scroll เพื่อเปลี่ยนสีพื้นหลัง Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ล็อคไม่ให้ Scroll หน้าจอตอนเปิดเมนูมือถือ
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  // ฟังก์ชันสลับภาษา
  const switchLang = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`
    if (pathname === '/th' || pathname === '/en') return `/${targetLang}`
    return pathname.replace(`/${lang}`, `/${targetLang}`)
  }

  const navLinks = [
    { label: lang === 'th' ? 'หน้าแรก' : 'Home', href: `/${lang}` },
    { label: lang === 'th' ? 'สินค้า' : 'Shop', href: `/${lang}/shop` },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isMobileMenuOpen 
            ? 'bg-transparent border-none' // ถ้าเปิดเมนูอยู่ ให้พื้นใส (เพราะมี overlay สีดำอยู่แล้ว)
            : (isScrolled 
                ? 'bg-[#020000]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' 
                : 'bg-transparent py-5')
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* === 1. LOGO หลัก (มุมซ้ายบน) === */}
        {/* ซ่อนเวลาเปิดเมนูมือถือ เพื่อไม่ให้ซ้อนกับ Logo ในเมนู (Optional: ถ้าชอบให้ซ้อนก็ลบ className hidden ออกได้) */}
        <Link href={`/${lang}`} className={`hidden md:block relative z-50 group transition-opacity duration-300`}>
    <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase group-hover:text-red-500 transition-colors">
      SHODAI<span className="text-red-600 group-hover:text-white transition-colors">KEVLAR</span>
    </span>
</Link>

        {/* === 2. DESKTOP MENU (จอใหญ่) === */}
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

          {/* Language Switcher Desktop */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
            <Link href={switchLang('th')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'th' ? 'bg-red-600 text-white shadow-red-900/50 shadow-md' : 'text-gray-400 hover:text-white'}`}>TH</Link>
            <Link href={switchLang('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-red-600 text-white shadow-red-900/50 shadow-md' : 'text-gray-400 hover:text-white'}`}>EN</Link>
          </div>
        </nav>

        {/* === 3. MOBILE MENU BUTTON (ปุ่ม Hamburger) === */}
        <button className="md:hidden text-white p-2 z-50 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            // Icon กากบาท (Close)
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            // Icon ขีดๆ (Hamburger)
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

        {/* === 4. MOBILE FULLSCREEN MENU (ส่วนที่เด้งขึ้นมา) === */}
        <div className={`fixed inset-0 bg-[#020000] z-40 flex flex-col items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-10 pointer-events-none'}`}>
            
            {/* Background Effect สวยๆ ในเมนู */}
            <div className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* ✅ LOGO ในเมนู Hamburger (ตามที่ขอ) */}
            <div className="mb-12 transform transition-all hover:scale-105 active:scale-95">
                <Link href={`/${lang}`} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-2xl">
                    SHODAI<span className="text-red-600">KEVLAR</span>
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-8 mb-12 relative z-10">
              {navLinks.map((link) => (
                <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={`text-2xl font-bold uppercase tracking-widest transition-all duration-300 hover:text-red-500 hover:scale-110 ${
                        pathname === link.href ? 'text-red-500 scale-110' : 'text-gray-300'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Language Switcher Mobile */}
            <div className="flex gap-6 relative z-10 border-t border-white/10 pt-8 w-1/2 justify-center">
                <Link href={switchLang('th')} className={`text-xl font-black ${lang === 'th' ? 'text-red-600 underline decoration-2 underline-offset-4' : 'text-gray-500 hover:text-white'}`}>TH</Link>
                <div className="w-px h-6 bg-white/20"></div>
                <Link href={switchLang('en')} className={`text-xl font-black ${lang === 'en' ? 'text-red-600 underline decoration-2 underline-offset-4' : 'text-gray-500 hover:text-white'}`}>EN</Link>
            </div>
        </div>

      </div>
    </header>
  )
}