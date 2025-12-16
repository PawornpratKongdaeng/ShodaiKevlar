'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

// Type Definition (เอามาให้ตรงกับหน้า Home)
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
  createdAt: string
}

interface ShopListProps {
  products: Product[]
  lang: 'th' | 'en'
}

export function ShopList({ products, lang }: ShopListProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest') // newest, price-asc, price-desc

  // 1. ดึงรายชื่อรุ่นรถ (Categories) ทั้งหมดจากสินค้าที่มีอยู่จริง
  const categories = useMemo(() => {
    const models = products.map(p => p.carModel || 'Universal')
    // ลบตัวซ้ำออก และเพิ่ม 'All' ไว้ตัวแรก
    return ['All', ...Array.from(new Set(models))]
  }, [products])

  // 2. Logic การกรองและเรียงลำดับ
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filter by Category
        const matchCategory = selectedCategory === 'All' || (product.carModel || 'Universal') === selectedCategory
        // Filter by Search
        const matchSearch = product.name.toLowerCase().includes(search.toLowerCase())
        return matchCategory && matchSearch
      })
      .sort((a, b) => {
        // Sort
        if (sortOrder === 'price-asc') return a.price - b.price
        if (sortOrder === 'price-desc') return b.price - a.price
        // Default: Newest (สมมติเทียบจาก id หรือ createdAt ถ้ามี)
        return 0 
      })
  }, [products, selectedCategory, search, sortOrder])

  return (
    <div className="w-full relative z-10">
      
      {/* --- CONTROLS SECTION (Search & Filter) --- */}
      <div className="mb-10 space-y-6">
        
        {/* Search Bar & Sort */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0f0f0f]/80 backdrop-blur-md p-4 rounded-2xl border border-white/5">
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              placeholder={lang === 'th' ? 'ค้นหาสินค้า...' : 'Search products...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-gray-600"
            />
            <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          {/* Sort Dropdown */}
        </div>

        {/* Categories (Pills) */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white border-transparent shadow-[0_0_15px_rgba(220,38,38,0.5)] transform scale-105'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-red-500/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            
            // 👇 แก้ตรงนี้: เปลี่ยนจาก div เป็น Link และใส่ href
            <Link
              key={product.id}
              href={`/${lang}/shop/${product.slug}`} // ลิงก์ไปหน้า slug
              className="group relative bg-gradient-to-b from-[#1a0505] to-[#050000] border border-red-900/20 rounded-2xl overflow-hidden hover:border-red-500/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:-translate-y-2 block"
            >
              {/* Image Area */}
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
                
                {/* Overlay Badge (Status) */}
                {/* เช็ค status ถ้ามี */}
                <div className={`absolute top-3 right-3 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border shadow-lg ${
                   (product as any).status === 'instock' || !(product as any).status // Default instock
                   ? 'bg-black/80 text-green-400 border-green-500/30'
                   : 'bg-red-900/80 text-white border-red-500/30'
                }`}>
                    {(product as any).status === 'instock' || !(product as any).status 
                      ? (lang === 'th' ? 'พร้อมส่ง' : 'In Stock')
                      : (lang === 'th' ? 'หมด/พรีออเดอร์' : 'Pre-order')
                    }
                </div>
              </div>

              {/* Content Area */}
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
                  
                  {/* ปุ่มลูกศร (แค่ Visual เพราะกดการ์ดก็ไปอยู่แล้ว) */}
                  <div className="w-10 h-10 rounded-full bg-red-950/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 border border-red-900/30 group-hover:border-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-32 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
            <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{lang === 'th' ? 'ไม่พบสินค้า' : 'No Products Found'}</h3>
            <p className="text-gray-400">{lang === 'th' ? 'ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดูนะครับ' : 'Try adjusting your search or category filter.'}</p>
        </div>
      )}

    </div>
  )
}