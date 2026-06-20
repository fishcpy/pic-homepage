import { CategoryInfo } from '@/lib/types'

export const categories: CategoryInfo[] = [
  {
    id: 'mc',
    name: '我的世界',
    apiUrl: 'https://api.fis.ink/img/pic/mc.json',
    displayUrl: 'pic.fis.ink/mc',
  },
  {
    id: 'aqtw',
    name: '暗区突围',
    apiUrl: 'https://api.fis.ink/img/pic/aqtw.json',
    displayUrl: 'pic.fis.ink/aqtw',
  },
  {
    id: 'end',
    name: '终末地',
    apiUrl: 'https://api.fis.ink/img/pic/end.json',
    displayUrl: 'pic.fis.ink/end',
  },
]

export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find((cat) => cat.id === id)
}
