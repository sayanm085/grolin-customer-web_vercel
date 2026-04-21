import api from '@/lib/api'
import { resolveMediaUrl } from '@/lib/media'
import {
  getDemoAllProducts,
  getDemoDealProducts,
  getDemoFeaturedProducts,
  getDemoNewArrivals,
  getDemoProduct,
  getDemoRelatedProducts,
  searchDemoProducts,
} from '@/lib/shopfront/shopfront-demo-data'
import type { Pagination } from '@/types/api.types'
import type { Product } from '@/types/product.types'

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
      asString(record.thumb),
      asString(record.publicUrl),
      asString(record.secure_url),
    ].filter((entry): entry is string => Boolean(entry))

    const nested = [
      record.file,
      record.asset,
      record.assets,
      record.media,
      record.mediaAsset,
      record.mediaAssets,
      record.attributes,
      record.data,
      record.formats,
      record.photo,
      record.photos,
      record.gallery,
      record.gallery_images,
      record.galleryImages,
      record.cover,
      record.preview,
      record.image,
      record.thumbnail,
    ].flatMap((entry) => collectImageStrings(entry, depth + 1))

    return [...direct, ...nested]
  }

  return []
}

function getRawCategoryRecord(raw: Record<string, unknown>) {
  return raw.category && typeof raw.category === 'object' ? (raw.category as Record<string, unknown>) : null
}

export function normalizeProduct(raw: Record<string, unknown>): Product {
  const category = getRawCategoryRecord(raw)
  const images = Array.from(
    new Set([
      ...collectImageStrings(raw.images),
      ...collectImageStrings(raw.thumbnail_url),
      ...collectImageStrings(raw.thumbnailUrl),
      ...collectImageStrings(raw.thumbnail),
      ...collectImageStrings(raw.image_url),
      ...collectImageStrings(raw.imageUrl),
      ...collectImageStrings(raw.image),
      ...collectImageStrings(raw.photo),
      ...collectImageStrings(raw.photos),
      ...collectImageStrings(raw.gallery),
      ...collectImageStrings(raw.gallery_images),
      ...collectImageStrings(raw.galleryImages),
      ...collectImageStrings(raw.media),
      ...collectImageStrings(raw.assets),
      ...collectImageStrings(category?.image_url),
      ...collectImageStrings(category?.image),
    ]),
  ).map((img) => resolveMediaUrl(img, img))

  const rawThumbnail =
    asString(raw.thumbnail_url) ??
    asString(raw.thumbnailUrl) ??
    asString(raw.thumbnail) ??
    asString(raw.image_url) ??
    asString(raw.imageUrl) ??
    asString(raw.image) ??
    asString(raw.cover_image_url) ??
    images[0] ??
    null
  const thumbnail = rawThumbnail ? resolveMediaUrl(rawThumbnail, rawThumbnail) : null

  return {
    id: (raw.id as string) ?? '',
    name: (raw.name as string) ?? 'Product',
    slug: (raw.slug as string) ?? '',
    description: (raw.description as string) ?? null,
    price: toNumber(raw.price),
    sale_price: raw.sale_price != null ? toNumber(raw.sale_price) : raw.salePrice != null ? toNumber(raw.salePrice) : null,
    salePrice: raw.sale_price != null ? toNumber(raw.sale_price) : raw.salePrice != null ? toNumber(raw.salePrice) : undefined,
    stock_quantity: toNumber(raw.stock_quantity ?? raw.stock),
    unit: (raw.unit as Product['unit']) ?? 'piece',
    category_id: (raw.category_id as string) ?? (raw.categoryId as string) ?? (category?.id as string) ?? '',
    category_name:
      (raw.category_name as string) ??
      (raw.categoryName as string) ??
      ((category?.name as string) ?? null),
    images,
    thumbnail_url: thumbnail,
    is_featured: typeof raw.is_featured === 'boolean' ? raw.is_featured : raw.isFeatured === true,
    total_sold: toNumber(raw.total_sold ?? raw.totalSold),
    weekly_sales:
      raw.weekly_sales != null
        ? toNumber(raw.weekly_sales)
        : raw.weeklySales != null
          ? toNumber(raw.weeklySales)
          : null,
    max_order_qty: raw.max_order_qty != null ? toNumber(raw.max_order_qty) : raw.maxOrderQty != null ? toNumber(raw.maxOrderQty) : null,
    tags: Array.isArray(raw.tags) ? raw.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    ingredients: (raw.ingredients as string) ?? null,
    allergen_info: (raw.allergen_info as string) ?? null,
    shelf_life: (raw.shelf_life as string) ?? null,
    storage_instructions: (raw.storage_instructions as string) ?? null,
    certifications: Array.isArray(raw.certifications)
      ? raw.certifications.filter((cert): cert is string => typeof cert === 'string')
      : null,
    nutrition_info: (raw.nutrition_info as Record<string, string>) ?? null,
    variants: (raw.variants as Product['variants']) ?? null,
    created_at: (raw.created_at as string) ?? (raw.createdAt as string) ?? new Date().toISOString(),
  }
}

export function normalizeProducts(rawList: Record<string, unknown>[]): Product[] {
  return (rawList ?? []).map(normalizeProduct).filter((product) => Boolean(product.id))
}

export const productsService = {
  getAll: async (params: Record<string, unknown> = {}) => {
    const page = toNumber(params.page, 1)
    const limit = toNumber(params.limit, 20)

    try {
      const { data } = await api.get('/products', { params: { page, limit, ...params } })
      const products = normalizeProducts((data.data ?? []) as Record<string, unknown>[])
      if (products.length > 0) {
        return {
          products,
          pagination: (data.pagination as Pagination | undefined) ?? createPagination(page, limit),
        }
      }
    } catch {
      // Fall through to demo products.
    }

    return getDemoAllProducts({ page, limit, ...params })
  },

  getById: async (id: string): Promise<Product> => {
    try {
      const { data } = await api.get(`/products/${id}`)
      const product = normalizeProduct((data.data ?? data) as Record<string, unknown>)
      if (product.id) return product
    } catch {
      // Fall through to demo product.
    }

    const demoProduct = getDemoProduct(id)
    if (demoProduct) return demoProduct

    throw new Error('Product not found')
  },

  getFeatured: async (limit = 12): Promise<Product[]> => {
    try {
      const { data } = await api.get('/products/featured', { params: { limit } })
      const products = normalizeProducts((data.data ?? []) as Record<string, unknown>[])
      if (products.length > 0) return products
    } catch {
      // Fall through to demo products.
    }

    return getDemoFeaturedProducts(limit)
  },

  getNewArrivals: async (limit = 12): Promise<Product[]> => {
    try {
      const { data } = await api.get('/products/new-arrivals', { params: { limit } })
      const products = normalizeProducts((data.data ?? []) as Record<string, unknown>[])
      if (products.length > 0) return products
    } catch {
      // Fall through to demo products.
    }

    return getDemoNewArrivals(limit)
  },

  getDeals: async (limit = 20): Promise<Product[]> => {
    try {
      const { data } = await api.get('/products/deals', { params: { limit } })
      const products = normalizeProducts((data.data ?? []) as Record<string, unknown>[])
      if (products.length > 0) return products
    } catch {
      // Fall through to demo products.
    }

    return getDemoDealProducts(limit)
  },

  search: async (q: string, page = 1) => {
    try {
      const { data } = await api.get('/products/search', { params: { q, page, limit: 20 } })
      const products = normalizeProducts((data.data ?? []) as Record<string, unknown>[])
      const suggestions = normalizeProducts((data.suggestions || []) as Record<string, unknown>[])
      if (products.length > 0 || suggestions.length > 0) {
        return {
          products,
          suggestions,
          pagination: (data.pagination as Pagination | undefined) ?? createPagination(page, 20),
        }
      }
    } catch {
      // Fall through to demo products.
    }

    return searchDemoProducts(q, page)
  },

  getRelated: async (id: string, limit = 8): Promise<Product[]> => {
    try {
      const { data } = await api.get(`/products/${id}/related`, { params: { limit } })
      const products = normalizeProducts((data.data ?? []) as Record<string, unknown>[])
      if (products.length > 0) return products
    } catch {
      // Fall through to demo products.
    }

    return getDemoRelatedProducts(id, limit)
  },
}

