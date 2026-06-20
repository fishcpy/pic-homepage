import { MetadataRoute } from 'next'
import { categories } from '@/data/categories'

const BASE_URL = 'https://www.pic.fis.ink'

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...categoryPages,
  ]
}
