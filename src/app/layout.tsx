import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'FIS随机图 - 游戏图片展示平台',
    template: '%s | FIS随机图',
  },
  description: '浏览我的世界、暗区突围、终末地游戏图片，支持搜索、排序和高清预览',
  keywords: ['随机图', '我的世界', '暗区突围', '终末地', '游戏图片', 'Minecraft', 'Arena Breakout'],
  authors: [{ name: 'fishcpy' }],
  icons: {
    icon: 'https://file.fis.ink/img/fishcpy/logo_c.png',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'FIS随机图',
    title: 'FIS随机图 - 游戏图片展示平台',
    description: '浏览我的世界、暗区突围、终末地游戏图片，支持搜索、排序和高清预览',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIS随机图 - 游戏图片展示平台',
    description: '浏览我的世界、暗区突围、终末地游戏图片',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
