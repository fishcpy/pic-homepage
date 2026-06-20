import { create } from 'zustand'
import { GameCategory, SortType } from '@/lib/types'

interface AppState {
  category: GameCategory
  sortType: SortType
  searchQuery: string
  setCategory: (cat: GameCategory) => void
  setSortType: (sort: SortType) => void
  setSearchQuery: (query: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  category: 'mc',
  sortType: 'random',
  searchQuery: '',
  setCategory: (cat) => set({ category: cat }),
  setSortType: (sort) => set({ sortType: sort }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
