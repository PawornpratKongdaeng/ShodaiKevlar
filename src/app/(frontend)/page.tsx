// ไฟล์: src/app/page.tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  // ทันทีที่มีคนเข้าหน้าแรก (/) ให้ดีดไปที่ (/th)
  redirect('/th')
}