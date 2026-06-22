import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategoryById } from '@/data/categories'
import { GalleryPage } from '@/components/GalleryPage'

interface PageProps {
  params: Promise<{ category: string }>
}

const categoryMeta: Record<string, { title: string; description: string }> = {
  mc: {
    title: '我的世界',
    description: '浏览我的世界（Minecraft）游戏高清截图与壁纸，支持随机展示、最新排序和搜索功能',
  },
  aqtw: {
    title: '暗区突围',
    description: '浏览暗区突围（Arena Breakout）游戏高清截图与壁纸，支持随机展示、最新排序和搜索功能',
  },
  end: {
    title: '终末地',
    description: '浏览终末地游戏高清截图与壁纸，支持随机展示、最新排序和搜索功能',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const meta = categoryMeta[category]

  if (!meta) {
    return { title: '未找到' }
  }

  const catInfo = getCategoryById(category)

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} - FIS随机图`,
      description: meta.description,
      url: `https://pic.fis.ink/pic/${category}`,
      images: catInfo?.apiUrl ? [
        {
          url: catInfo.apiUrl.replace('.json', ''),
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} - FIS随机图`,
      description: meta.description,
    },
    alternates: {
      canonical: `https://pic.fis.ink/pic/${category}`,
    },
  }
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  // 验证分类是否存在
  if (!getCategoryById(category)) {
    notFound()
  }

  return <GalleryPage categoryId={category} />
}
