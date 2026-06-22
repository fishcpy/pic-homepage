'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { categories } from '@/data/categories'
import { Button } from '@/components/ui/button'
import { Check, Copy, ArrowRight } from 'lucide-react'

function CategoryCard({ name, displayUrl, href }: { name: string; displayUrl: string; href: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(displayUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = displayUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [displayUrl])

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border bg-card p-5 sm:p-6 transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          浏览
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm font-mono text-foreground break-all">
          {displayUrl}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className={`shrink-0 h-9 w-9 ${copied ? 'border-green-500 text-green-600' : ''}`}
          aria-label={copied ? '已复制' : '复制地址'}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 space-y-10 sm:space-y-14">
        {/* 标题区域 */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            FIS 随机图
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
            高清随机图片 API 服务，支持随机展示与最新排序
          </p>
        </div>

        {/* 分类 API 列表 */}
        <section>
          <h2 className="mb-5 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            可用接口
          </h2>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                displayUrl={cat.displayUrl || cat.apiUrl}
                href={`/pic/${cat.id}`}
              />
            ))}
          </div>
        </section>
      </main>

      {/* 完整页脚 */}
      <Footer />
    </div>
  )
}
