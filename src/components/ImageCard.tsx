'use client'

import { useState, memo } from 'react'
import { cn } from '@/lib/utils'

interface ImageCardProps {
  src: string
  alt: string
  index: number
  onClick: (src: string, index: number) => void
}

function ImageCardComponent({ src, alt, index, onClick }: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <button
      onClick={() => onClick(src, index)}
      className={cn(
        'group relative aspect-square w-full overflow-hidden rounded-xl',
        'bg-muted/50 cursor-pointer',
        'transition-all duration-300 ease-out',
        'hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40',
        'hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'animate-fade-in-up'
      )}
      style={{ animationDelay: `${Math.min(index * 50, 600)}ms` }}
      aria-label={`查看${alt}图片`}
    >
      {/* 加载骨架屏 */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* 图片 - 原生 img 标签，前端直接请求 */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn(
            'h-full w-full object-cover transition-all duration-500',
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
            'group-hover:scale-105'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground text-xs">
          加载失败
        </div>
      )}

      {/* Hover 遮罩 */}
      <div
        className={cn(
          'absolute inset-0 bg-black/0 transition-colors duration-300',
          'group-hover:bg-black/10'
        )}
      />
    </button>
  )
}

export const ImageCard = memo(ImageCardComponent)
