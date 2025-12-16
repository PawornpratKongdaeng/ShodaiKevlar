import React from 'react'
import Link from 'next/link'

interface FooterProps {
  lang: 'th' | 'en'
}

export function Footer({ lang }: FooterProps) {
  const isTh = lang === 'th'

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Decoration (Optional: แสงฟุ้งๆ ด้านล่าง) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-16">
          
          {/* 1. BRAND & ABOUT */}
          <div className="space-y-6">
            <Link href={`/${lang}`} className="text-2xl font-black italic tracking-tighter text-white uppercase">
              SHODAI<span className="text-red-600">KEVLAR</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {isTh 
                ? 'โรงงานผลิตและจำหน่ายชิ้นส่วนคาร์บอนไฟเบอร์แท้ 100% สำหรับมอเตอร์ไซค์ รับประกันงานคุณภาพ ความเงา และความแข็งแรง ส่งทั่วไทย'
                : 'Manufacturer and distributor of 100% real carbon fiber parts for motorcycles. Quality guaranteed, premium finish, and durable. Shipping worldwide.'}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<FacebookIcon />} label="Facebook" />
              <SocialLink href="#" icon={<InstagramIcon />} label="Instagram" />
              <SocialLink href="#" icon={<LineIcon />} label="Line" />
              <SocialLink href="#" icon={<TiktokIcon />} label="TikTok" />
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 border-l-4 border-red-600 pl-3">
              {isTh ? 'เมนูลัด' : 'Quick Links'}
            </h3>
            <ul className="space-y-4">
              <FooterLink href={`/${lang}`} label={isTh ? 'หน้าแรก' : 'Home'} />
              <FooterLink href={`/${lang}/shop`} label={isTh ? 'สินค้าทั้งหมด' : 'All Products'} />
              <FooterLink href={`/${lang}/about`} label={isTh ? 'เกี่ยวกับเรา' : 'About Us'} />
              <FooterLink href={`/${lang}/contact`} label={isTh ? 'ติดต่อเรา' : 'Contact Us'} />
              <FooterLink href={`/${lang}/tracking`} label={isTh ? 'เช็คเลขพัสดุ' : 'Order Tracking'} />
            </ul>
          </div>

          {/* 3. CONTACT INFO */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 border-l-4 border-red-600 pl-3">
              {isTh ? 'ข้อมูลติดต่อ' : 'Contact Us'}
            </h3>
            <ul className="space-y-6">
              {/* Address */}
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                  <MapPinIcon />
                </div>
                <div>
                  <span className="block text-white font-bold text-sm mb-1">{isTh ? 'ที่อยู่ร้าน' : 'Address'}</span>
                  <span className="text-gray-400 text-sm">
                    123/45 ถนนสายไหม แขวงสายไหม <br /> เขตสายไหม กรุงเทพฯ 10220
                  </span>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <span className="block text-white font-bold text-sm mb-1">{isTh ? 'โทรศัพท์' : 'Phone'}</span>
                  <a href="tel:0995566453" className="text-gray-400 text-sm hover:text-white transition-colors">
                    099-556-6453
                  </a>
                </div>
              </li>

              {/* Line / Email */}
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                  <MailIcon />
                </div>
                <div>
                  <span className="block text-white font-bold text-sm mb-1">Line / Email</span>
                  <span className="text-gray-400 text-sm block">Line ID: @shodaishop</span>
                  <span className="text-gray-400 text-sm block">contact@shodai.com</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SHODAI KEVLAR. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">{isTh ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</Link>
            <Link href="#" className="hover:text-white transition-colors">{isTh ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ================= SUB-COMPONENTS =================

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-red-500 hover:pl-2 transition-all duration-300 text-sm flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-red-600"></span>
        {label}
      </Link>
    </li>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 hover:-translate-y-1 transition-all duration-300"
    >
      {icon}
    </a>
  )
}

// ================= ICONS (SVG) =================
// นำไอคอนมาใส่ไว้ตรงนี้เพื่อความสะดวก ไม่ต้องลง lib เพิ่ม

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
)

const TiktokIcon = () => (
   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.36-3.96 1.84-6.13 1.31-2.23-.54-4.13-2.19-4.98-4.32-.88-2.21-.49-4.8 1.05-6.61 1.45-1.7 3.66-2.58 5.86-2.33v4.06c-1.3-.15-2.61.37-3.4 1.48-.82 1.15-.65 2.79.41 3.73 1.05.94 2.69.82 3.59-.22.56-.64.84-1.47.8-2.31V.02h1.62z"/></svg>
)

const LineIcon = () => (
   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 5.92 2 10.75c0 4.34 3.55 8 8.19 8.65.32.07.75.22.86.5.1.25.07.63-.03 1.12l-.32 1.18c-.1.35-.44 1.37 1.2 0 .0 0 6.64-3.9 9.06-6.68C23.08 13.06 24 11.2 24 9.17 24 5.21 18.62 2 12 2zm-7.6 11.96c-.63 0-1.14-.5-1.14-1.13V8.67c0-.62.5-1.13 1.13-1.13.62 0 1.13.5 1.13 1.13v1.03h2.08c.62 0 1.13.5 1.13 1.13 0 .62-.5 1.13-1.13 1.13H4.4zm5.7 0c-.62 0-1.13-.5-1.13-1.13V8.67c0-.62.5-1.13 1.13-1.13.62 0 1.13.5 1.13 1.13v2.16c0 .63-.5 1.13-1.13 1.13zm5.74 0c-.62 0-1.13-.5-1.13-1.13V8.67c0-.63.51-1.13 1.13-1.13.53 0 .97.35 1.1.84l1.96 2.68V8.67c0-.62.5-1.13 1.13-1.13.62 0 1.13.5 1.13 1.13v3.25c0 .62-.51 1.13-1.13 1.13-.53 0-.97-.36-1.1-.84l-1.96-2.69v2.32c0 .63-.5 1.13-1.13 1.13zm6.38 0c-.62 0-1.13-.5-1.13-1.13V8.67c0-.62.5-1.13 1.13-1.13.62 0 1.13.5 1.13 1.13v1.03h2.08c.62 0 1.13.5 1.13 1.13 0 .62-.5 1.13-1.13 1.13h-3.2z"/></svg>
)