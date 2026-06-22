import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: '关于',
  description: '关于 FIS 随机图平台及版权声明',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">关于 FIS 随机图</h1>
            <p className="text-lg text-muted-foreground">
              一个高清图片展示平台，支持随机展示、搜索与排序
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">平台介绍</h2>
              <p className="text-muted-foreground leading-relaxed">
                FIS 随机图是一个专注于高清图片展示的平台。我们致力于为用户提供便捷的图片浏览体验，
                支持按分类浏览、随机展示、搜索和排序等功能。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">版权声明</h2>
              <p className="text-muted-foreground leading-relaxed">
                本站展示的图片来源于互联网。如果您认为本站的某些内容侵犯了您的版权，
                请及时与我们联系，我们将在收到通知后尽快处理。
              </p>
              <div className="bg-muted/50 rounded-lg p-4 border">
                <p className="text-sm font-medium mb-2">版权问题联系方式：</p>
                <a
                  href="mailto:abuse@furry.sarl"
                  className="text-primary hover:underline"
                >
                  abuse@furry.sarl
                </a>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">免责声明</h2>
              <p className="text-muted-foreground leading-relaxed">
                本站所有图片均来自互联网。如有侵权，请通过上述联系方式告知，
                我们将及时删除相关内容。
              </p>
            </section>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}