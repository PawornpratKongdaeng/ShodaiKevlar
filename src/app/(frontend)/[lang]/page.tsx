import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation' // 👈 เหลือแค่ notFound พอครับ ไม่ต้องใช้ redirect ในหน้านี้
import { Header } from '@/components/Header'

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
  // ❌ ลบ redirect('/th') ออกไปเลยครับ เพราะ middleware จัดการให้แล้ว
  
  const { lang } = await params
  if (!['th', 'en'].includes(lang)) return notFound()

  const { homeData, products } = await getData(lang as 'th' | 'en')

  const rawBanner = lang === 'th' ? homeData.bannerTH : homeData.bannerEN
  const activeBanner = (rawBanner && typeof rawBanner !== 'string') ? rawBanner : null

  return (
    <main className="min-h-screen bg-[#020000] font-sans selection:bg-orange-600 selection:text-white relative">

      {/* 2. Global Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-50">
        <Header lang={lang as 'th' | 'en'} />
      </div>

      {/* HERO IMAGE SECTION */}
      <section className="w-full bg-[#020000] overflow-hidden relative z-10">

        {activeBanner && activeBanner.url ? (
          <>
            <img
              className="w-full h-auto block"
              src={activeBanner.url}
              alt={activeBanner.alt || 'Hero Banner'}
            />

            {/* เงาสีดำเฉพาะด้านบน */}
            <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-20 pointer-events-none"></div>

            {/* เงาสีดำด้านล่าง */}
            <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-[#020000] via-[#020000]/80 to-transparent z-20 pointer-events-none"></div>
          </>
        ) : (
          <div className="w-full h-[50vh] flex flex-col items-center justify-center bg-[#1a0505] border-b border-red-900/30">
            <div className="text-red-500/50 font-bold uppercase tracking-widest">No Banner Image</div>
          </div>
        )}
      </section>

      {/* VIDEO SECTION */}
      <section className="relative py-12 md:py-20 overflow-hidden z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-2 italic">
              {homeData.videoTitle || (lang === 'th' ? 'สมรรถนะที่เหนือกว่า' : 'Unleash Performance')}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mx-auto rounded-full skew-x-12"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative group rounded-2xl overflow-hidden border border-red-900/30 bg-black shadow-[0_0_50px_rgba(220,38,38,0.2)]">
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
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-red-900/50 flex items-center justify-center mb-4 text-red-700">
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <span className="uppercase tracking-widest text-[10px] md:text-xs text-red-900">Video Coming Soon</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="featured-products" className="w-full relative py-20 md:py-32 scroll-mt-20 overflow-hidden z-10">

        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[150px] translate-x-1/3 pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">

          <div className="relative text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-white uppercase mb-4 italic">
              {lang === 'th' ? 'สินค้า' : 'Featured'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{lang === 'th' ? 'แนะนำ' : 'Products'}</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full skew-x-12"></div>
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

                  <div className="absolute inset-0 bg-red-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="btn bg-white text-black border-none hover:bg-gray-200 rounded-full px-6 font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      {lang === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                    </button>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-green-400 border border-green-500/30 shadow-lg">
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
                      <span className="text-xs text-gray-400">Price</span>
                      <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">฿{product.price.toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-950/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 cursor-pointer border border-red-900/30 group-hover:border-red-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link href={`/${lang}/shop`} className="inline-block border-b-2 border-red-600 text-white pb-1 hover:text-red-500 hover:border-orange-500 transition-all text-lg tracking-wide uppercase font-bold italic">
              {lang === 'th' ? 'ดูสินค้าทั้งหมด ->' : 'View All Products ->'}
            </Link>
          </div>

        </div>
      </section>

    </main>
  )
}