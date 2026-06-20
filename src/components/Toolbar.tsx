'use client'

import { SearchBar } from './SearchBar'
import { SortSelector } from './SortSelector'
import type { SortType } from '@/lib/types'

interface ToolbarProps {
  totalCount: number
  searchQuery: string
  onSearchChange: (value: string) => void
  sortType: SortType
  onSortChange: (value: SortType) => void
}

export function Toolbar({
  totalCount,
  searchQuery,
  onSearchChange,
  sortType,
  onSortChange,
}: ToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-4">
      <div className="flex items-center gap-3">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <SortSelector value={sortType} onChange={onSortChange} />
      </div>
      <p className="text-sm text-muted-foreground tabular-nums">
        共 <span className="font-medium text-foreground">{totalCount}</span> 张图片
      </p>
    </div>
  )
}
