'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { categories } from '@/data/categories'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Copy, ExternalLink, RefreshCw, Image as ImageIcon, FileJson, ArrowRightLeft } from 'lucide-react'

type ResponseType = 'image' | 'json' | 'redirect'

interface ApiResponse {
  type: 'success' | 'error'
  data?: unknown
  error?: string
  url?: string
}

interface EndpointConfig {
  label: string
  description: string
  type: ResponseType
  query: string
}

function ApiEndpointRow({
  fullUrl,
  endpoint,
}: {
  fullUrl: string
  endpoint: EndpointConfig
}) {
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // 使用实际 API 地址，不走后端代理
  const apiUrl = fullUrl.replace('/pic/', 'https://pic.fis.ink/')

  const handleFetch = useCallback(async () => {
    setLoading(true)
    setResponse(null)

    try {
      if (endpoint.type === 'json') {
        const res = await fetch(apiUrl)
        const data = await res.json()
        setResponse({ type: 'success', data })
      } else if (endpoint.type === 'redirect') {
        const res = await fetch(apiUrl, { method: 'HEAD', redirect: 'manual' })
        const location = res.headers.get('location')
        setResponse({
          type: 'success',
          data: { status: res.status, location: location || '(已重定向)' },
          url: apiUrl,
        })
      } else {
        // Image - 实际请求图片
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setResponse({ type: 'success', data: null, url: apiUrl })
      }
    } catch (err) {
      setResponse({ type: 'error', error: err instanceof Error ? err.message : '请求失败' })
    } finally {
      setLoading(false)
    }
  }, [apiUrl, endpoint.type])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(apiUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = apiUrl
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [apiUrl])

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-5 space-y-4">
      {/* 标题 + 描述 + 复制 */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {endpoint.type === 'json' ? (
              <FileJson className="h-4 w-4 text-blue-500" />
            ) : endpoint.type === 'redirect' ? (
              <ArrowRightLeft className="h-4 w-4 text-orange-500" />
            ) : (
              <ImageIcon className="h-4 w-4 text-green-500" />
            )}
            <span className="font-semibold text-sm">{endpoint.label}</span>
          </div>
          <p className="text-xs text-muted-foreground">{endpoint.description}</p>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={handleCopy}>
          <Copy className={`h-3.5 w-3.5 ${copied ? 'text-green-500' : ''}`} />
        </Button>
      </div>

      {/* URL */}
      <code className="block rounded-lg bg-muted px-3 py-2 text-sm font-mono break-all leading-relaxed">
        {apiUrl}
      </code>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button onClick={handleFetch} disabled={loading} size="sm" className="flex-1">
          {loading ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              请求中...
            </>
          ) : (
            <>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              发送请求
            </>
          )}
        </Button>
        {(endpoint.type === 'image' || endpoint.type === 'redirect') && response?.url && (
          <Button variant="outline" size="sm" asChild>
            <a href={response.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3.5 w-3.5" />
              打开
            </a>
          </Button>
        )}
      </div>

      {/* 响应结果 */}
      {response && (
        <div className="rounded-lg border bg-muted/30 overflow-hidden">
          {response.type === 'error' ? (
            <div className="px-4 py-3 text-sm text-red-500">错误：{response.error}</div>
          ) : endpoint.type === 'json' && response.data ? (
            <pre className="px-4 py-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all max-h-60 overflow-y-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          ) : endpoint.type === 'redirect' && response.data ? (
            <div className="px-4 py-3 space-y-1.5">
              <pre className="text-xs font-mono bg-background rounded px-3 py-2">
                {JSON.stringify(response.data, null, 2)}
              </pre>
              <a
                href={apiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
              >
                点击此链接体验完整重定向 <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ) : response.url ? (
            <div className="p-3 flex justify-center bg-background/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${response.url}?t=${Date.now()}`}
                alt="随机图片"
                className="max-h-64 rounded-lg object-contain"
                loading="lazy"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

const endpoints: EndpointConfig[] = [
  {
    label: '代理图片',
    description: '原有逻辑，代理图片流式返回',
    type: 'image',
    query: '',
  },
  {
    label: 'JSON 格式',
    description: '返回 JSON：{"url":"https://...","ext":"jpg"}',
    type: 'json',
    query: '?=json',
  },
  {
    label: '重定向',
    description: '301 重定向到图片原始地址，不经过代理',
    type: 'redirect',
    query: '?=redirect',
  },
]

export function DocsPageClient() {
  const [selectedId, setSelectedId] = useState<string>('')

  const selectedCat = categories.find((c) => c.id === selectedId)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        {/* 页面标题 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">API 文档</h1>
          <p className="text-muted-foreground">FIS 随机图 API 接口说明与在线测试</p>
        </div>

        {/* 分类选择器 */}
        <section className="rounded-xl border bg-card p-5 space-y-3">
          <label className="text-sm font-medium">选择分类</label>
          <Select value={selectedId} onValueChange={(v) => { setSelectedId(v); }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="请选择图片分类..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* 使用说明 */}
        <section className="rounded-xl border bg-card p-5 space-y-3">
          <h2 className="text-base font-semibold">使用说明</h2>
          <div className="grid gap-2.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="h-4 w-4 shrink-0 text-green-500" />
              <span><strong>默认</strong> - 通过代理返回图片</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FileJson className="h-4 w-4 shrink-0 text-blue-500" />
              <span><strong>?=json</strong> - 返回 JSON 格式的图片信息</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ArrowRightLeft className="h-4 w-4 shrink-0 text-orange-500" />
              <span><strong>?=redirect</strong> - 301 重定向到原图地址</span>
            </div>
          </div>
        </section>

        {/* 接口测试（选中分类后显示） */}
        {selectedCat && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold">{selectedCat.name}</h2>
            <div className="space-y-4">
              {endpoints.map((ep) => (
                <ApiEndpointRow
                  key={ep.label}
                  fullUrl={`/pic/${selectedCat.id}${ep.query}`}
                  endpoint={ep}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
