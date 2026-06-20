'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/Header'
import { Toolbar } from '@/components/Toolbar'
import { ImageGrid } from '@/components/ImageGrid'
import { FancyboxProvider, openLightbox } from '@/components/FancyboxProvider'
import { useImages } from '@/hooks/useImages'
import { useSearch } from '@/hooks/useSearch'
import { useAppStore } from '@/stores/useAppStore'
import { categories } from '@/data/categories'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ApiAddressBar() {
  const category = useAppStore((s) => s.category)
  const currentCategory = categories.find((c) => c.id === category)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    if (!currentCategory?.displayUrl) return
    try {
      await navigator.clipboard.writeText(currentCategory.displayUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textArea = document.createElement('textarea')
      textArea.value = currentCategory.displayUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [currentCategory])

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-muted/40 px-6 py-10 sm:py-14">
      <p className="text-sm font-medium text-muted-foreground">API 地址</p>
      <div className="flex items-center gap-3">
        <code className="rounded-lg bg-background px-4 py-2.5 text-base sm:text-lg font-mono font-semibold shadow-sm border">
          {currentCategory?.displayUrl}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className={copied ? 'border-green-500 text-green-600' : ''}
          aria-label={copied ? '已复制' : '复制地址'}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default function Home() {
  const { images, status, error, retry } = useImages()
  const { filteredImages } = useSearch(images)

  const handleImageClick = (src: string, index: number) => {
    openLightbox(filteredImages, index)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 space-y-6">
        {/* API 地址区域 */}
        <ApiAddressBar />

        {/* 搜索 + 图片列表 */}
        <Toolbar totalCount={filteredImages.length} />
        <ImageGrid
          images={filteredImages}
          status={status}
          error={error}
          onImageClick={handleImageClick}
          onRetry={retry}
        />
      </main>

      {/* 页脚 */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          京ICP备2025138063号
        </a>
      </footer>

      {/* Fancybox 灯箱 */}
      <FancyboxProvider />
    </div>
  )
}
