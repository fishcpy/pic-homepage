'use client'

import { useEffect, useCallback, useRef } from 'react'

// 编程式打开 Fancybox
export function openLightbox(images: string[], index: number) {
  // 动态导入后调用 Fancybox.show()
  import('@fancyapps/ui/dist/fancybox/fancybox.js').then(({ Fancybox }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Fancybox.show(
      images.map((src) => ({ src, type: 'image' })),
      {
        startIndex: index,
        Toolbar: {
          display: {
            left: ['infobar'],
            middle: [],
            right: ['slideshow', 'fullscreen', 'close'],
          },
        },
        Images: { zoom: true },
        Carousel: { transition: 'slide' },
        Animation: { duration: 350 },
        l10n: {
          CLOSE: '关闭',
          NEXT: '下一张',
          PREV: '上一张',
          ERROR: '加载失败',
          IMAGE_ERROR: '图片加载失败',
        },
      } as any
    )
  })
}

export function FancyboxProvider() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // 预加载 Fancybox CSS 和 JS（不绑定 DOM，仅预加载资源）
    import('@fancyapps/ui/dist/fancybox/fancybox.css')
    import('@fancyapps/ui/dist/fancybox/fancybox.js')
  }, [])

  return null
}
