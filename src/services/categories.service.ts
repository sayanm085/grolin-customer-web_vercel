import api from '@/lib/api'
import { getDemoCategories, getDemoCategory, getDemoCategoryProducts } from '@/lib/shopfront/shopfront-demo-data'
import type { Pagination } from '@/types/api.types'
import type { Category } from '@/types/product.types'
import { normalizeProducts } from '@/services/products.service'

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null
}

function toNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function createPagination(page = 1, limit = 20): Pagination {
  return {
    page,
    limit,
    total: 0,
    totalPages: 0,
  }
}

function collectImageStrings(value: unknown, depth = 0): string[] {
  if (!value || depth > 4) return []

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectImageStrings(item, depth + 1))
  }

  if (typeof value === 'string') {
    return value.trim() ? [value] : []
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    const direct = [
      asString(record.url),
      asString(record.src),
      asString(record.path),
      asString(record.image_url),
      asString(record.imageUrl),
      asString(record.image),
      asString(record.thumbnail_url),
      asString(record.thumbnailUrl),
      asString(record.thumbnail),
      asString(record.publicUrl),
    ].filter((entry): entry is string => Boolean(entry))

    const nested = [
      record.file,
      record.asset,
      record.assets,
      record.media,
      record.attributes,
      record.data,
      record.formats,
      record.cover,
      record.image,
      record.thumbnail,
    ].flatMap((entry) => collectImageStrings(entry, depth + 1))

    return [...direct, ...nested]
  }

  return []
}

function normalizeCategory(raw: Record<string, unknown>): Category {
  const imageCandidates = Array.from(
    new Set([
      ...collectImageStrings(raw.image_url),
      ...collectImageStrings(raw.imageUrl),
      ...collectImageStrings(raw.image),
      ...collectImageStrings(raw.thumbnail_url),
      ...collectImageStrings(raw.thumbnailUrl),
      ...collectImageStrings(raw.thumbnail),
      ...collectImageStrings(raw.media),
      ...collectImageStrings(raw.asset),
      ...collectImageStrings(raw.assets),
    ]),
  )

  return {
    id: (raw.id as string) ?? '',
    name: (raw.name as string) ?? 'Category',
    description: asString(raw.description),
    image_url: imageCandidates[0] ?? null,
    parent_id: asString(raw.parent_id) ?? asString(raw.parentId),
    sort_order: toNumber(raw.sort_order ?? raw.sortOrder),
    is_active: typeof raw.is_active === 'boolean' ? raw.is_active : raw.isActive !== false,
    product_count: toNumber(raw.product_count ?? raw.productCount),
  }
}

async function fetchCategoryPreviewImage(categoryId: string) {
  try {
    const { data } = await api.get(`/categories/${categoryId}/products`, {
      params: { page: 1, limit: 1 },
    })

    const records = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
    if (records.length === 0) return null

    const [product] = normalizeProducts(records as Record<string, unknown>[])
    return product?.thumbnail_url ?? product?.images?.[0] ?? null
  } catch {
    return null
  }
}

async function attachCategoryPreviewImages(categories: Category[]) {
  const missing = categories.filter((category) => !category.image_url)
  if (missing.length === 0) return categories

  const previewEntries = await Promise.all(
    missing.map(async (category) => [category.id, await fetchCategoryPreviewImage(category.id)] as const),
  )

  const previewMap = new Map(
    previewEntries.filter((entry): entry is readonly [string, string] => Boolean(entry[1])),
  )

  return categories.map((category) => ({
    ...category,
    image_url: category.image_url ?? previewMap.get(category.id) ?? null,
  }))
}

function isDemoCategoryId(id: string) {
  return id.startsWith('cat-')
}

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const { data } = await api.get('/categories')
      const records = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
      if (records.length > 0) {
        const normalized = records.map((record: Record<string, unknown>) => normalizeCategory(record))
        return attachCategoryPreviewImages(normalized)
      }
    } catch {
      // Fall through to demo categories.
    }

    return getDemoCategories()
  },

  getById: async (id: string): Promise<Category> => {
    if (isDemoCategoryId(id)) {
      const demoCategory = getDemoCategory(id)
      if (demoCategory) return demoCategory
    }

    try {
      const { data } = await api.get(`/categories/${id}`)
      const category = normalizeCategory((data.data ?? data) as Record<string, unknown>)
      if (category.id) return category
    } catch {
      // Fall through to demo category.
    }

    const demoCategory = getDemoCategory(id)
    if (demoCategory) return demoCategory

    throw new Error('Category not found')
  },

  getProducts: async (id: string, params: Record<string, unknown> = {}) => {
    const page = toNumber(params.page, 1)
    const limit = toNumber(params.limit, 20)

    if (isDemoCategoryId(id)) {
      return getDemoCategoryProducts(id, { page, limit, ...params })
    }

    try {
      const { data } = await api.get(`/categories/${id}/products`, {
        params: { page, limit, ...params },
      })
      const products = normalizeProducts((data.data ?? []) as Record<string, unknown>[])
      if (products.length > 0) {
        return {
          products,
          pagination: (data.pagination as Pagination | undefined) ?? createPagination(page, limit),
        }
      }
    } catch {
      // Fall through to demo category products.
    }

    return getDemoCategoryProducts(id, { page, limit, ...params })
  },
}
