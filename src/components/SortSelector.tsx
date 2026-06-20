'use client'

import { useAppStore } from '@/stores/useAppStore'
import { SortType } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const sortOptions: { value: SortType; label: string }[] = [
  { value: 'random', label: '随机展示' },
  { value: 'latest', label: '最新优先' },
]

export function SortSelector() {
  const sortType = useAppStore((s) => s.sortType)
  const setSortType = useAppStore((s) => s.setSortType)

  return (
    <Select
      value={sortType}
      onValueChange={(v) => setSortType(v as SortType)}
    >
      <SelectTrigger className="w-[130px] h-9">
        <SelectValue placeholder="排序方式" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
