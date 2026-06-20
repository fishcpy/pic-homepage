'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { LightboxState } from '@/lib/types'

export function useLightbox() {
  const [state, setState] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
    images: [],
  })

  const open = useCallback((images: string[], index: number) => {
    setState({ isOpen: true, currentIndex: index, images })
  }, [])

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const goToPrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex <= 0
          ? prev.images.length - 1
          : prev.currentIndex - 1,
    }))
  }, [])

  const goToNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex >= prev.images.length - 1
          ? 0
          : prev.currentIndex + 1,
    }))
  }, [])

  // 键盘事件
  useEffect(() => {
    if (!state.isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          close()
          break
        case 'ArrowLeft':
          goToPrev()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // 打开时禁止背景滚动
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [state.isOpen, close, goToPrev, goToNext])

  const currentImage = state.images[state.currentIndex] ?? null

  return {
    ...state,
    currentImage,
    open,
    close,
    goToPrev,
    goToNext,
  }
}
