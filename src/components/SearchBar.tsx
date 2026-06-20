'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useCallback, useRef, useEffect, useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localValue, setLocalValue] = useState(value)

  // 防抖：300ms 后同步到父组件
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, 300)
    return () => clearTimeout(timer)
  }, [localValue, onChange])

  // 外部变化时同步本地值（如路由切换重置）
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const clearSearch = useCallback(() => {
    setLocalValue('')
    onChange('')
    inputRef.current?.focus()
  }, [onChange])

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="搜索图片..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-9 pr-8 h-9 w-full sm:w-[200px] lg:w-[260px]"
      />
      {localValue && (
        <button
          onClick={clearSearch}
          className="absolute right-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="清除搜索"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
