import type { Metadata } from 'next'
import { DocsPageClient } from './DocsPageClient'

export const metadata: Metadata = {
  title: 'API 文档',
  description: 'FIS 随机图 API 使用文档',
}

export default function DocsPage() {
  return <DocsPageClient />
}
