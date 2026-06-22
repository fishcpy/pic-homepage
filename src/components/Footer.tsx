import Link from 'next/link'
import { categories } from '@/data/categories'

const footerNav = [
  { label: '首页', href: '/' },
  ...categories.map((cat) => ({ label: cat.name, href: `/${cat.id}` })),
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12">
        {/* 导航链接区 */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-12 items-center sm:items-start">
          {/* 分类导航 */}
          <div className="text-center sm:text-left">
            <h3 className="mb-3 text-sm font-semibold text-foreground">图片分类</h3>
            <nav aria-label="页脚导航" className="flex flex-col gap-2 items-center sm:items-start">
              {footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 关于 */}
          <div className="text-center sm:text-right">
            <h3 className="mb-3 text-sm font-semibold text-foreground">关于</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              FIS 随机图是一个高清图片展示平台，支持随机展示、搜索与排序，为用户提供便捷的图片浏览体验。
            </p>
          </div>
        </div>

        {/* 分割线 + 版权 + 备案 */}
        <div className="mt-10 border-t pt-6 flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FIS随机图. All rights reserved.
          </p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            京ICP备2025138063号
          </a>
        </div>
      </div>
    </footer>
  )
}
