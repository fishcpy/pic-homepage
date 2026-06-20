'use client'

import { SearchBar } from './SearchBar'
import { SortSelector } from './SortSelector'

interface ToolbarProps {
  totalCount: number
}

export function Toolbar({ totalCount }: ToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-4">
      <div className="flex items-center gap-3">
        <SearchBar />
        <SortSelector />
      </div>
      <p className="text-sm text-muted-foreground tabular-nums">
        共 <span className="font-medium text-foreground">{totalCount}</span> 张图片
      </p>
    </div>
  )
}
