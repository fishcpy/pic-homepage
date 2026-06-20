'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { getCategoryById } from '@/data/categories'
import { ImageLoadStatus } from '@/lib/types'

// Fisher-Yates 洗牌算法
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 从 URL 中提取日期用于排序
function extractDateFromUrl(url: string): Date | null {
  const match = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//)
  if (match) {
    const [, year, month, day] = match
    return new Date(`${year}-${month}-${day}`)
  }
  return null
}

interface UseImagesProps {
  categoryId: string
  sortType: 'random' | 'latest'
}

export function useImages({ categoryId, sortType }: UseImagesProps) {
  const [images, setImages] = useState<string[]>([])
  const [status, setStatus] = useState<ImageLoadStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const cacheRef = useRef<Map<string, string[]>>(new Map())

  const fetchImages = useCallback(async (catId: string) => {
    if (cacheRef.current.has(catId)) {
      const cached = cacheRef.current.get(catId)!
      setImages(cached)
      setStatus('success')
      return
    }

    setStatus('loading')
    setError(null)

    try {
      const catInfo = getCategoryById(catId)
      if (!catInfo) throw new Error(`未知分类: ${catId}`)

      const res = await fetch(catInfo.apiUrl)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data: string[] = await res.json()
      const unique = [...new Set(data)]
      cacheRef.current.set(catId, unique)
      setImages(unique)
      setStatus('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载失败'
      setError(message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    fetchImages(categoryId)
  }, [categoryId, fetchImages])

  // 排序逻辑
  const sortedImages = (() => {
    if (sortType === 'random') {
      return shuffle(images)
    }
    return [...images].sort((a, b) => {
      const dateA = extractDateFromUrl(a)
      const dateB = extractDateFromUrl(b)
      if (!dateA && !dateB) return 0
      if (!dateA) return 1
      if (!dateB) return -1
      return dateB.getTime() - dateA.getTime()
    })
  })()

  const retry = useCallback(() => {
    cacheRef.current.delete(categoryId)
    fetchImages(categoryId)
  }, [categoryId, fetchImages])

  return { images: sortedImages, status, error, retry }
}
