import type { Metadata } from 'next'
import { GalleryPage } from '@/components/GalleryPage'

export const metadata: Metadata = {
  title: '我的世界',
  description: '浏览我的世界（Minecraft）游戏高清截图与壁纸，支持随机展示、最新排序和搜索功能',
  alternates: {
    canonical: 'https://pic.fis.ink/',
  },
}

export default function HomePage() {
  return <GalleryPage categoryId="mc" />
}
