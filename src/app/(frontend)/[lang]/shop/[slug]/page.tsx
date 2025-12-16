import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { ProductView } from '@/components/ProductView'

// 1. จำเป็นสำหรับ Next.js App Router เพื่อสร้าง path สินค้าล่วงหน้า (SEO ดีขึ้น)
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 100,
  })

  // สร้าง params สำหรับทั้ง 2 ภาษา
  const params: any[] = []
  products.docs.forEach((product: any) => {
    if (product.slug) {
        params.push({ lang: 'th', slug: product.slug })
        params.push({ lang: 'en', slug: product.slug })
    }
  })
  return params
}

export default async function ProductDetailPage({ 
    params 
}: { 
    params: Promise<{ lang: string; slug: string }> 
}) {
  const { lang, slug } = await params
  
  // 2. Fetch ข้อมูลสินค้าตาม Slug
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // ถ้าไม่เจอสินค้า ให้ไปหน้า 404
  if (!products.docs.length) {
    return notFound()
  }

  const product = products.docs[0]

  return (
    <main className="min-h-screen bg-[#020000] font-sans selection:bg-orange-600 selection:text-white relative">
      
      {/* Background Ambient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-red-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="relative z-50">
        <Header lang={lang as 'th' | 'en'} />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        
        {/* Breadcrumb (ทางนำทาง) */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-bold uppercase tracking-wider">
            <a href={`/${lang}`} className="hover:text-white">Home</a>
            <span>/</span>
            <a href={`/${lang}/shop`} className="hover:text-white">Shop</a>
            <span>/</span>
            <span className="text-red-500">{product.name}</span>
        </div>

        {/* เรียกใช้ Component แสดงผล */}
        <ProductView product={product} lang={lang as 'th' | 'en'} />

      </div>
    </main>
  )
}