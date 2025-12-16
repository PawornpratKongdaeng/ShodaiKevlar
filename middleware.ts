import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['th', 'en']

export function middleware(request: NextRequest) {
  // เช็คว่า path เป็นของ admin หรือ api หรือไม่ (ถ้าใช่ ให้ข้ามไป)
  if (
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.') // ข้ามพวกไฟล์รูป/css
  ) {
    return
  }

  const { pathname } = request.nextUrl
  
  // เช็คว่า URL มีภาษาหรือยัง (เช่น /th/...)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // ถ้าไม่มี ให้ Redirect ไปภาษาไทย (/th)
  const locale = 'th'
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}