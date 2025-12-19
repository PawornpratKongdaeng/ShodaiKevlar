import React from 'react'
import './globals.css' // ✅ 1. ย้าย import CSS มาไว้ที่ตัวแม่สุด

// ✅ 2. Metadata และ Favicon อยู่ที่นี่ที่เดียว
export const metadata = {
  description: 'Shodai Carbon - Premium Carbon Fiber Products',
  title: 'Shodai Carbon - Premium Carbon Fiber Products',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ✅ 3. มี <html> และ <body> แค่ที่นี่ที่เดียว
    <html lang="en" suppressHydrationWarning> 
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}