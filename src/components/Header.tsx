'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { categories } from '@/data/categories'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo - 点击返回首页 */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <img
            src="https://file.fis.ink/img/fishcpy/logo_c.png"
            alt="Logo"
            className="h-7 w-7 rounded"
          />
        </Link>

        {/* 分类标签 - 桌面端 */}
        <nav className="hidden sm:flex items-center gap-1 rounded-lg bg-muted p-1" aria-label="分类导航">
          {categories.map((cat) => {
            const isActive = pathname === `/${cat.id}`
            return (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {cat.name}
              </Link>
            )
          })}
        </nav>

        {/* 右侧：主题切换 */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>

      {/* 移动端分类导航 */}
      <nav className="sm:hidden border-t px-4 pb-2.5 pt-2" aria-label="移动端分类导航">
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = pathname === `/${cat.id}`
            return (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                className={`whitespace-nowrap relative rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {cat.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
