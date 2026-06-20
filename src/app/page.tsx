import type { Metadata } from 'next'
import { HomePage } from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'FIS随机图',
  description: '浏览我的世界、暗区突围、终末地等高清随机图片，支持随机展示、最新排序和搜索功能',
  alternates: {
    canonical: 'https://pic.fis.ink/',
  },
}

export default function Page() {
  return <HomePage />
}
