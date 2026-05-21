import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import "./globals.css"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "대한중앙 형사전문센터 | 형사 전문 법무법인",
  description: "형사 분야 전문 변호사가 구속·기소부터 항소·상고까지 의뢰인의 자유와 권리를 끝까지 지켜드립니다.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} bg-white`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
