'use client'

import { ThemeToggle } from './ThemeToggle'
import { CategoryTabs } from './CategoryTabs'
import { useAppStore } from '@/stores/useAppStore'
import { categories } from '@/data/categories'

export function Header() {
  const category = useAppStore((s) => s.category)
  const currentCategory = categories.find((c) => c.id === category)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="https://file.fis.ink/img/fishcpy/logo_c.png"
            alt="Logo"
            className="h-7 w-7 rounded"
            crossOrigin="anonymous"
          />
        </div>

        {/* 分类标签 - 桌面端显示 */}
        <div className="hidden sm:block">
          <CategoryTabs />
        </div>

        {/* 右侧：主题切换 */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>

      {/* 移动端分类标签 */}
      <div className="sm:hidden border-t px-4 pb-2.5 pt-2">
        <CategoryTabs />
      </div>
    </header>
  )
}
