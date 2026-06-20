'use client'

import { useAppStore } from '@/stores/useAppStore'
import { categories } from '@/data/categories'
import { GameCategory } from '@/lib/types'

export function CategoryTabs() {
  const category = useAppStore((s) => s.category)
  const setCategory = useAppStore((s) => s.setCategory)

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      {categories.map((cat) => {
        const isActive = cat.id === category
        return (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as GameCategory)}
            className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={isActive}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
