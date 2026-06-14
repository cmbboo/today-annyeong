import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '오늘도 안녕',
  description: '부모님의 하루를 자녀에게 전달하는 서비스',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,  // 고령 사용자 확대 방지
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full bg-cream overflow-hidden">
        {children}
      </body>
    </html>
  )
}
