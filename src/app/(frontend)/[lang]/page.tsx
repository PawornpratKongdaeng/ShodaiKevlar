import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer' // อย่าลืม import Footer ถ้ามี

// ================= TYPES =================
interface Media {
  id: string
  url: string
  alt?: string
}

interface Product {
  id: string
  name: string
  price: number
  carModel?: string
  image?: Media | string
  slug?: string
}

interface HomeData {
  heroTitle?: string
  heroSubtitle?: string
  bannerTH?: Media | string
  bannerEN?: Media | string
  videoTitle?: string
  videoUrl?: string
}

// ================= DATA FETCHING =================
async function getData(lang: 'th' | 'en') {
  const payload = await getPayload({ config: configPromise })

  const homeData = await payload.findGlobal({
    slug: 'home-page',
    locale: lang,
    depth: 1, // เพิ่ม depth เพื่อให้แน่ใจว่าได้ object Media มา
  })

  const productsData = await payload.find({
    collection: 'products',
    locale: lang,
    limit: 8,
    sort: '-createdAt',
  })

  return {
    homeData: homeData as HomeData,
    products: productsData.docs as Product[]
  }
}

// ================= MAIN COMPONENT =================
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // Security Check: ถ้าภาษาไม่ใช่ th หรือ en ให้ดีดไปหน้า 404
  if (!['th', 'en'].includes(lang)) {
    return notFound()
  }

  const { homeData, products } = await getData(lang as 'th' | 'en')

  // เลือก Banner ตามภาษา
  const rawBanner = lang === 'th' ? homeData.bannerTH : homeData.bannerEN
  const activeBanner = (rawBanner && typeof rawBanner !== 'string') ? rawBanner : null

  return (
    <div className="min-h-screen bg-[#020000] font-sans selection:bg-orange-600 selection:text-white relative flex flex-col">

      {/* 1. Global Background Effect (อยู่หลังสุดและไม่ขวางการคลิก) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[5000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[7000ms]"></div>
      </div>

      {/* 2. Header (อยู่บนสุด z-50) */}
      <Header lang={lang as 'th' | 'en'} />

      <main className="flex-grow">
        
        {/* === HERO IMAGE SECTION === */}
        <section className="w-full bg-[#020000] overflow-hidden relative z-10">
          {activeBanner && activeBanner.url ? (
            <div className="relative w-full">
              {/* Image */}
              <img
              className="w-full h-auto block object-contain" // ลบ min-h-... และ object-cover ออก เพื่อให้รูปยืดหดตามสัดส่วนจริง ไม่โดนตัด
              src={activeBanner.url}
              alt={activeBanner.alt || 'Hero Banner'}
            />

              {/* Gradient Overlays: เพื่อให้ตัวหนังสืออ่านง่ายและกลืนกับพื้นหลัง */}
               <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-linear-to-b from-black/90 via-black/50 to-transparent z-20 pointer-events-none"></div>
              {/*<div className="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-[#020000] via-[#020000]/80 to-transparent z-20 pointer-events-none"></div>
              
              
  
              {/* Hero Text Overlay (Optional: ถ้าอยากใส่ Text ทับรูป) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pt-20">
                 <h1 className="text-4xl md:text-7xl font-black italic text-white uppercase tracking-tighter drop-shadow-2xl opacity-0 animate-fadeInUp" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                    {homeData.heroTitle || 'SHODAI KEVLAR'}
                 </h1>
                 <p className="text-red-500 font-bold text-lg md:text-2xl mt-2 tracking-widest opacity-0 animate-fadeInUp" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
                    {homeData.heroSubtitle || 'CARBON FIBER SPECIALIST'}
                 </p>
              </div>
            </div>
          ) : (
            // Fallback กรณีลืมใส่รูป
            <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-[#1a0505] border-b border-red-900/30 relative pt-20">
              <div className="text-red-500/50 font-bold uppercase tracking-widest text-xl">No Banner Image</div>
            </div>
          )}
        </section>

        {/* === VIDEO SECTION === */}
        <section className="relative py-12 md:py-24 overflow-hidden z-10">
          {/* Background Glow หลังวิดีโอ */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 italic">
                {homeData.videoTitle || (lang === 'th' ? 'สมรรถนะที่เหนือกว่า' : 'Unleash Performance')}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mx-auto rounded-full skew-x-12 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative group rounded-2xl overflow-hidden border border-red-900/30 bg-black shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                {/* Border Glow Animation */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-30 blur-md transition duration-1000 group-hover:opacity-60 group-hover:duration-200 animate-pulse"></div>

                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  {homeData.videoUrl ? (
                    <iframe
                      className="w-full h-full"
                      src={homeData.videoUrl}
                      title="Product Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0000] text-gray-500">
                      <div className="w-16 h-16 rounded-full border-2 border-red-900/50 flex items-center justify-center mb-4 text-red-700 animate-pulse">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <span className="uppercase tracking-widest text-xs font-bold text-red-900">Video Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === PRODUCTS SECTION === */}
        <section id="featured-products" className="w-full relative py-20 md:py-32 scroll-mt-20 overflow-hidden z-10">
          
          {/* Decorative Blobs */}
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] translate-x-1/3 pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-screen"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
            <div className="relative text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-6xl font-black text-white uppercase mb-4 italic">
                {lang === 'th' ? 'สินค้า' : 'Featured'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{lang === 'th' ? 'แนะนำ' : 'Products'}</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full skew-x-12 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${lang}/shop/${product.slug || product.id}`}
                  className="group relative block bg-gradient-to-b from-[#1a0505] to-[#050000] border border-red-900/20 rounded-2xl overflow-hidden hover:border-red-500/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
                    {product.image && typeof product.image !== 'string' ? (
                      <img
                        src={product.image.url}
                        alt={product.image.alt || product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1a0a0a] text-red-900/40">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}

                    {/* Quick View Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white text-black text-sm font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-600 hover:text-white">
                        {lang === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                      </span>
                    </div>

                    {/* Stock Badge */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-green-400 border border-green-500/30 shadow-lg">
                      {lang === 'th' ? 'พร้อมส่ง' : 'In Stock'}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-red-500/80 mb-1 uppercase tracking-wider font-semibold">{product.carModel || 'Universal'}</p>
                    <h3 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-red-500 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-end justify-between border-t border-red-900/20 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Price</span>
                        <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">฿{product.price.toLocaleString()}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-red-950/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 border border-red-900/30 group-hover:border-red-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12 md:mt-20">
              <Link href={`/${lang}/shop`} className="inline-block border-b-2 border-red-600 text-white pb-1 hover:text-red-500 hover:border-orange-500 transition-all text-lg tracking-wide uppercase font-bold italic group">
                {lang === 'th' ? 'ดูสินค้าทั้งหมด' : 'View All Products'} 
                <span className="inline-block transform group-hover:translate-x-1 transition-transform ml-2"></span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}