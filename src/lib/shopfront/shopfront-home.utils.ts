import type { Banner } from '@/types/banner.types'
import type { Category, Product } from '@/types/product.types'
import { SHOPFRONT_CATEGORY_PREFERENCES, type CategoryIconKey } from './shopfront-content'

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function uniqueById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

function getCategoryPresentation(category: Category): Pick<HomepageCategoryNavItem, 'navLabel' | 'iconKey'> {
  const haystack = `${category.name} ${category.description ?? ''}`.toLowerCase()
  const preference = SHOPFRONT_CATEGORY_PREFERENCES.find((pref) =>
    pref.keywords.some((keyword) => haystack.includes(keyword)),
  )

  if (preference) {
    return {
      navLabel: preference.label,
      iconKey: preference.icon,
    }
  }

  return {
    navLabel: category.name,
    iconKey: 'default',
  }
}

export type HomepageCategoryNavItem = Category & {
  navLabel: string
  iconKey: CategoryIconKey | 'default'
}

export function getTopLevelActiveCategories(categories: Category[]) {
  const activeCategories = [...categories].filter((category) => category.is_active)
  const topLevelCategories = activeCategories.filter((category) => !category.parent_id)
  const source = topLevelCategories.length > 0 ? topLevelCategories : activeCategories

  return source.sort((a, b) => a.sort_order - b.sort_order || b.product_count - a.product_count)
}

export function getHomepageCategoryNav(
  categories: Category[],
  limit = 12,
  selectedId?: string,
): HomepageCategoryNavItem[] {
  const active = getTopLevelActiveCategories(categories)
  const used = new Set<string>()

  const matched = SHOPFRONT_CATEGORY_PREFERENCES.flatMap((pref) => {
    const category = active.find((entry) => {
      if (used.has(entry.id)) return false
      const haystack = `${entry.name} ${entry.description ?? ''}`.toLowerCase()
      return pref.keywords.some((keyword) => haystack.includes(keyword))
    })

    if (!category) return []
    used.add(category.id)

    return [{ ...category, navLabel: pref.label, iconKey: pref.icon }]
  })

  const fallback = active
    .filter((category) => !used.has(category.id))
    .slice(0, Math.max(0, limit - matched.length))
    .map((category) => ({
      ...category,
      navLabel: category.name,
      iconKey: 'default' as const,
    }))

  const result = [...matched, ...fallback].slice(0, limit)

  if (!selectedId || result.some((category) => category.id === selectedId)) {
    return result
  }

  const selectedCategory = active.find((category) => category.id === selectedId)
  if (!selectedCategory) {
    return result
  }

  const selectedCategoryNav = {
    ...selectedCategory,
    ...getCategoryPresentation(selectedCategory),
  }

  if (result.length < limit) {
    return [...result, selectedCategoryNav]
  }

  return [...result.slice(0, limit - 1), selectedCategoryNav]
}

export function getHomepageCategoryGrid(categories: Category[], limit = 6, excludeIds: string[] = []) {
  const excluded = new Set(excludeIds)
  return getTopLevelActiveCategories(categories)
    .filter((category) => !excluded.has(category.id))
    .slice(0, limit)
}

export function getTrendingProducts(input: {
  featured: Product[]
  deals: Product[]
  newArrivals: Product[]
  excludeIds?: string[]
}) {
  const exclude = new Set(input.excludeIds ?? [])
  return uniqueById([...input.featured, ...input.deals, ...input.newArrivals])
    .filter((product) => !exclude.has(product.id))
    .sort((a, b) => {
      const soldDelta = (b.total_sold || 0) - (a.total_sold || 0)
      if (soldDelta !== 0) return soldDelta
      return (b.sale_price ? 1 : 0) - (a.sale_price ? 1 : 0)
    })
    .slice(0, 12)
}

export function getHeroBannerSet(banners: Banner[]) {
  const sorted = [...banners].sort((a, b) => a.sort_order - b.sort_order)
  return {
    hero: sorted[0] ?? null,
    secondary: sorted.slice(1, 3),
  }
}

export function getPromoBannerSet(banners: Banner[]) {
  const sorted = [...banners].sort((a, b) => a.sort_order - b.sort_order)
  const remaining = sorted.slice(3)

  return {
    cards: remaining.slice(0, 2),
    strip: remaining[2] ?? null,
  }
}

export function getBannerHeadline(banner: Banner | null | undefined) {
  if (!banner?.title) return ''
  return normalize(banner.title)
}
