// 随机图分类标识符
export type GameCategory = 'mc' | 'aqtw' | 'end'

// 分类信息接口
export interface CategoryInfo {
  id: GameCategory
  name: string
  apiUrl: string       // 实际获取图片数据的 JSON 接口
  displayUrl?: string   // 顶部展示用的 API 地址（如 pic.fis.ink/mc）
}

// 排序方式
export type SortType = 'random' | 'latest'

// Lightbox 状态
export interface LightboxState {
  isOpen: boolean
  currentIndex: number
  images: string[]
}

// 图片加载状态
export type ImageLoadStatus = 'idle' | 'loading' | 'success' | 'error'
