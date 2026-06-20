'use client'

import { useMemo } from 'react'

export function useSearch(images: string[], searchQuery: string) {
  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) return images
    const query = searchQuery.toLowerCase().trim()
    return images.filter((url) => url.toLowerCase().includes(query))
  }, [images, searchQuery])

  return { filteredImages, isSearching: searchQuery.trim().length > 0 }
}
