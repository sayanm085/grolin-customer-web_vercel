import type { Category, Product } from '@/types/product.types'

const FALLBACK_MEDIA_ORIGIN = 'https://grocery-api.shotlin.in'
const LOCAL_PUBLIC_ASSET_PREFIXES = [
  '/demo-catalog/',
  '/images/',
  '/placeholder-product.svg',
  '/favicon.ico',
  '/manifest.webmanifest',
  '/og-default.png',
] as const

export const PRODUCT_IMAGE_PLACEHOLDER = '/images/product-placeholder.svg'

function getImageBaseUrl() {
  const apiOrigin = getAbsoluteOrigin(process.env.NEXT_PUBLIC_API_URL)
  if (apiOrigin) {
    return apiOrigin
  }

  const socketOrigin = getAbsoluteOrigin(process.env.NEXT_PUBLIC_SOCKET_URL)
  if (socketOrigin && shouldUseLocalOrigin(socketOrigin)) {
    return socketOrigin
  }

  if (socketOrigin && !isLocalOrigin(socketOrigin)) {
    return socketOrigin
  }

  return FALLBACK_MEDIA_ORIGIN
}

export const getImageUrl = (url: string | null | undefined): string => {
  if (!url) return PRODUCT_IMAGE_PLACEHOLDER
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/')) {
    if (LOCAL_PUBLIC_ASSET_PREFIXES.some((prefix) => url.startsWith(prefix))) {
      return url
    }
    return `${getImageBaseUrl()}${url}`
  }
  return url
}

const CATEGORY_VISUAL_FALLBACKS = [
  {
    image: '/demo-catalog/categories/vegetables.svg',
    keywords: ['vegetable', 'veg', 'greens', 'leafy', 'tomato', 'onion', 'potato', 'okra', 'broccoli'],
  },
  {
    image: '/demo-catalog/categories/fruits.svg',
    keywords: ['fruit', 'mango', 'apple', 'banana', 'citrus', 'berry', 'avocado', 'grapes'],
  },
  {
    image: '/demo-catalog/categories/dairy.svg',
    keywords: ['dairy', 'milk', 'curd', 'cheese', 'paneer', 'yogurt', 'butter', 'egg'],
  },
  {
    image: '/demo-catalog/categories/bakery.svg',
    keywords: ['bakery', 'bread', 'croissant', 'bun', 'cake'],
  },
  {
    image: '/demo-catalog/categories/beverages.svg',
    keywords: ['beverage', 'drink', 'juice', 'tea', 'coffee', 'soda'],
  },
  {
    image: '/demo-catalog/categories/snacks.svg',
    keywords: ['snack', 'chips', 'biscuit', 'namkeen', 'cookie'],
  },
  {
    image: '/demo-catalog/categories/pantry.svg',
    keywords: ['pantry', 'atta', 'rice', 'dal', 'oil', 'spice', 'masala', 'sauce', 'grocery'],
  },
  {
    image: '/demo-catalog/categories/baby.svg',
    keywords: ['baby', 'infant', 'kid'],
  },
  {
    image: '/demo-catalog/categories/care.svg',
    keywords: ['care', 'beauty', 'personal', 'cleaning', 'home'],
  },
] as const

const PRODUCT_VISUAL_THEMES = [
  {
    keywords: ['vegetable', 'veg', 'greens', 'leafy', 'tomato', 'onion', 'potato', 'okra', 'broccoli'],
    backgroundStart: '#EFFAF1',
    backgroundEnd: '#DDF5E6',
    accent: '#16945E',
    chip: 'Fresh',
  },
  {
    keywords: ['fruit', 'mango', 'apple', 'banana', 'citrus', 'berry', 'avocado', 'grapes'],
    backgroundStart: '#FFF5ED',
    backgroundEnd: '#FFE0C7',
    accent: '#D97706',
    chip: 'Fruit',
  },
  {
    keywords: ['dairy', 'milk', 'curd', 'cheese', 'paneer', 'yogurt', 'butter', 'egg'],
    backgroundStart: '#F1F6FF',
    backgroundEnd: '#DCE9FF',
    accent: '#2563EB',
    chip: 'Daily',
  },
  {
    keywords: ['bakery', 'bread', 'croissant', 'bun', 'cake', 'breakfast'],
    backgroundStart: '#FFF7ED',
    backgroundEnd: '#FFE8CC',
    accent: '#C2410C',
    chip: 'Baked',
  },
  {
    keywords: ['beverage', 'drink', 'juice', 'tea', 'coffee', 'soda', 'kombucha'],
    backgroundStart: '#F4F1FF',
    backgroundEnd: '#E7DEFF',
    accent: '#6E49D8',
    chip: 'Sip',
  },
  {
    keywords: ['snack', 'chips', 'biscuit', 'namkeen', 'cookie', 'nuts', 'almond'],
    backgroundStart: '#FFF5F7',
    backgroundEnd: '#FFDCE4',
    accent: '#DB2777',
    chip: 'Snack',
  },
  {
    keywords: ['pantry', 'atta', 'rice', 'dal', 'oil', 'spice', 'masala', 'sauce', 'grocery', 'honey'],
    backgroundStart: '#FFFBE8',
    backgroundEnd: '#FDE68A',
    accent: '#A16207',
    chip: 'Pantry',
  },
  {
    keywords: ['baby', 'infant', 'kid', 'diaper'],
    backgroundStart: '#F3F7FF',
    backgroundEnd: '#DBEAFE',
    accent: '#1D6FB8',
    chip: 'Care',
  },
  {
    keywords: ['care', 'beauty', 'personal', 'cleaning', 'home', 'wash'],
    backgroundStart: '#F7F3FF',
    backgroundEnd: '#E9DFFF',
    accent: '#7C3AED',
    chip: 'Home',
  },
] as const

type ProductMediaLike = Pick<Product, 'thumbnail_url' | 'images'> &
  Partial<Pick<Product, 'category_id' | 'category_name' | 'name' | 'unit'>>

type CategoryMediaLike = Partial<Pick<Category, 'id' | 'name' | 'description' | 'image_url'>>

function normalizeKeywordSource(values: Array<string | null | undefined>) {
  return values
    .filter((value): value is string => Boolean(value && value.trim()))
    .join(' ')
    .toLowerCase()
}

function getAbsoluteOrigin(candidate?: string | null) {
  if (!candidate) return null

  try {
    if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
      return new URL(candidate).origin
    }
  } catch {
    return null
  }

  return null
}

function isLocalOrigin(candidate: string) {
  try {
    const { hostname } = new URL(candidate)
    return hostname === 'localhost' || hostname === '127.0.0.1'
  } catch {
    return false
  }
}

function shouldUseLocalOrigin(candidate: string) {
  if (!isLocalOrigin(candidate)) return true

  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  }

  return process.env.NODE_ENV !== 'production'
}

function getMediaOrigin() {
  const cdnOrigin = getAbsoluteOrigin(process.env.NEXT_PUBLIC_CDN_URL)
  if (cdnOrigin) return cdnOrigin

  const apiOrigin = getAbsoluteOrigin(process.env.NEXT_PUBLIC_API_URL)
  if (apiOrigin) return apiOrigin

  const socketOrigin = getAbsoluteOrigin(process.env.NEXT_PUBLIC_SOCKET_URL)
  if (socketOrigin && shouldUseLocalOrigin(socketOrigin)) {
    return socketOrigin
  }

  if (socketOrigin && !isLocalOrigin(socketOrigin)) {
    return socketOrigin
  }

  return FALLBACK_MEDIA_ORIGIN
}

function inferCategoryFallback(values: Array<string | null | undefined>) {
  const haystack = normalizeKeywordSource(values)
  if (!haystack) return null

  const matched = CATEGORY_VISUAL_FALLBACKS.find((entry) =>
    entry.keywords.some((keyword) => haystack.includes(keyword)),
  )

  return matched?.image ?? null
}

function getProductTheme(product: ProductMediaLike) {
  const haystack = normalizeKeywordSource([product.category_id, product.category_name, product.name])
  return (
    PRODUCT_VISUAL_THEMES.find((theme) => theme.keywords.some((keyword) => haystack.includes(keyword))) ??
    PRODUCT_VISUAL_THEMES[0]
  )
}

function isPlaceholderProductImage(value: string | null | undefined) {
  if (!value) return false
  return value.includes(PRODUCT_IMAGE_PLACEHOLDER) || value.includes('/demo-catalog/categories/')
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function createSvgDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function splitTitle(value: string) {
  const cleaned = value.trim()
  if (!cleaned) return ['Fresh', 'Pick']

  const words = cleaned.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length <= 16) {
      current = next
      continue
    }

    if (current) {
      lines.push(current)
    }
    current = word

    if (lines.length === 2) break
  }

  if (current && lines.length < 2) {
    lines.push(current)
  }

  return lines.slice(0, 2)
}

function buildProductFallbackImage(product: ProductMediaLike) {
  const theme = getProductTheme(product)
  const titleLines = splitTitle(product.name ?? product.category_name ?? 'Grolin Pick')
  const unitLabel = product.unit ? String(product.unit).toUpperCase() : theme.chip.toUpperCase()
  const monogram = (product.name ?? product.category_name ?? 'G')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join('') || 'G'

  return createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720" fill="none">
      <defs>
        <linearGradient id="bg" x1="104" y1="96" x2="620" y2="640" gradientUnits="userSpaceOnUse">
          <stop stop-color="${theme.backgroundStart}"/>
          <stop offset="1" stop-color="${theme.backgroundEnd}"/>
        </linearGradient>
      </defs>
      <rect width="720" height="720" rx="72" fill="url(#bg)"/>
      <circle cx="564" cy="156" r="132" fill="white" fill-opacity="0.42"/>
      <circle cx="162" cy="598" r="116" fill="white" fill-opacity="0.28"/>
      <rect x="64" y="72" width="150" height="54" rx="27" fill="white" fill-opacity="0.94"/>
      <text x="139" y="106" text-anchor="middle" fill="${theme.accent}" font-size="24" font-family="Arial, sans-serif" font-weight="700">${escapeXml(theme.chip.toUpperCase())}</text>
      <circle cx="170" cy="316" r="96" fill="white" fill-opacity="0.88"/>
      <circle cx="170" cy="316" r="72" fill="${theme.accent}" fill-opacity="0.15"/>
      <text x="170" y="332" text-anchor="middle" fill="${theme.accent}" font-size="70" font-family="Arial, sans-serif" font-weight="700">${escapeXml(monogram)}</text>
      <text x="64" y="500" fill="#18212B" font-size="54" font-family="Arial, sans-serif" font-weight="700">${escapeXml(titleLines[0] ?? '')}</text>
      <text x="64" y="564" fill="#18212B" font-size="54" font-family="Arial, sans-serif" font-weight="700">${escapeXml(titleLines[1] ?? '')}</text>
      <text x="64" y="624" fill="#5B6672" font-size="28" font-family="Arial, sans-serif" font-weight="500">Premium grocery selection</text>
      <rect x="520" y="590" width="136" height="54" rx="27" fill="${theme.accent}" fill-opacity="0.12"/>
      <text x="588" y="624" text-anchor="middle" fill="${theme.accent}" font-size="24" font-family="Arial, sans-serif" font-weight="700">${escapeXml(unitLabel)}</text>
    </svg>
  `)
}

export function resolveMediaUrl(value: string | null | undefined, fallback = PRODUCT_IMAGE_PLACEHOLDER) {
  if (!value) return fallback

  const trimmed = value.trim()
  if (!trimmed) return fallback

  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`
  }

  if (trimmed.startsWith('/')) {
    return getImageUrl(trimmed)
  }

  try {
    const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    return new URL(path, getMediaOrigin()).toString()
  } catch {
    return fallback
  }
}

export function getCategoryFallbackImage(category: CategoryMediaLike) {
  return inferCategoryFallback([category.id, category.name, category.description])
}

export function getProductFallbackImage(product: ProductMediaLike) {
  return buildProductFallbackImage(product)
}

export function getProductImageSrc(product: ProductMediaLike) {
  const primary = product.thumbnail_url || product.images?.[0] || null
  return getImageUrl(primary)
}

export function getProductGalleryImages(product: ProductMediaLike) {
  const images = [...(product.images ?? []), product.thumbnail_url]
    .filter((image): image is string => Boolean(image))
    .map((image) => getImageUrl(image))
    .filter((image) => !isPlaceholderProductImage(image))

  const unique = Array.from(new Set(images))
  return unique.length > 0 ? unique : [PRODUCT_IMAGE_PLACEHOLDER]
}

export function getCategoryImageSrc(category: CategoryMediaLike) {
  if (category.image_url?.startsWith('/demo-catalog/categories/')) {
    return category.image_url
  }

  if (category.image_url) {
    return resolveMediaUrl(category.image_url, '') || getCategoryFallbackImage(category) || ''
  }

  const fallback = getCategoryFallbackImage(category)
  if (fallback) return fallback
  return ''
}
