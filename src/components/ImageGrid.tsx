'use client'

import { useMemo } from 'react'
import { ImageCard } from './ImageCard'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, RefreshCw, ImageOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageGridProps {
  images: string[]
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
  onImageClick: (src: string, index: number) => void
  onRetry: () => void
}

const SKELETON_COUNT = 12

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-xl" />
      ))}
    </div>
  )
}

export function ImageGrid({ images, status, error, onImageClick, onRetry }: ImageGridProps) {
  // 渲染层去重保护
  const uniqueImages = useMemo(() => {
    const seen = new Set<string>()
    return images.filter((url) => {
      if (seen.has(url)) return false
      seen.add(url)
      return true
    })
  }, [images])

  if (status === 'loading' || status === 'idle') {
    return <GridSkeleton />
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">加载失败</p>
          <p className="mt-1 text-sm text-muted-foreground">{error || '请检查网络后重试'}</p>
        </div>
        <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-3.5 w-3.5" />
          重试
        </Button>
      </div>
    )
  }

  if (uniqueImages.length === 0 && status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <ImageOff className="h-10 w-10 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">暂无匹配的图片</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {uniqueImages.map((src, i) => (
        <ImageCard
          key={`${src}-${i}`}
          src={src}
          alt={`图片 ${i + 1}`}
          index={i}
          onClick={onImageClick}
        />
      ))}
    </div>
  )
}
