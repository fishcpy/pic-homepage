'use client'

import { useMemo } from 'react'
import { useAppStore } from '@/stores/useAppStore'

export function useSearch(images: string[]) {
  const searchQuery = useAppStore((s) => s.searchQuery)

  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) return images
    const query = searchQuery.toLowerCase().trim()
    return images.filter((url) => url.toLowerCase().includes(query))
  }, [images, searchQuery])

  return { filteredImages, isSearching: searchQuery.trim().length > 0 }
}
