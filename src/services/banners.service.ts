import api from '@/lib/api'
import { resolveMediaUrl } from '@/lib/media'
import { getDemoBanners } from '@/lib/shopfront/shopfront-demo-data'
import type { Banner, BannerLinkType } from '@/types/banner.types'

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null
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
      asString(record.desktop_image_url),
      asString(record.desktopImageUrl),
      asString(record.mobile_image_url),
      asString(record.mobileImageUrl),
      asString(record.thumbnail_url),
      asString(record.thumbnailUrl),
    ].filter((entry): entry is string => Boolean(entry))

    const nested = [
      record.file,
      record.asset,
      record.assets,
      record.media,
      record.attributes,
      record.data,
      record.formats,
      record.image,
      record.desktop_image,
      record.mobile_image,
    ].flatMap((entry) => collectImageStrings(entry, depth + 1))

    return [...direct, ...nested]
  }

  return []
}

function normalizeBanner(raw: Record<string, unknown>): Banner {
  const linkType = (raw.link_type ?? raw.linkType ?? 'none') as BannerLinkType
  const imageCandidates = Array.from(
    new Set([
      ...collectImageStrings(raw.image_url),
      ...collectImageStrings(raw.imageUrl),
      ...collectImageStrings(raw.image),
      ...collectImageStrings(raw.desktop_image_url),
      ...collectImageStrings(raw.desktopImageUrl),
      ...collectImageStrings(raw.desktop_image),
      ...collectImageStrings(raw.mobile_image_url),
      ...collectImageStrings(raw.mobileImageUrl),
      ...collectImageStrings(raw.mobile_image),
      ...collectImageStrings(raw.media),
      ...collectImageStrings(raw.asset),
      ...collectImageStrings(raw.assets),
    ]),
  )

  const rawImageUrl = imageCandidates[0] ?? ''
  return {
    id: (raw.id as string) ?? crypto.randomUUID(),
    title: asString(raw.title),
    subtitle: asString(raw.subtitle),
    image_url: rawImageUrl ? resolveMediaUrl(rawImageUrl, '') : '',
    link_type: ['category', 'product', 'url', 'none'].includes(linkType) ? linkType : 'none',
    link_value: asString(raw.link_value) ?? asString(raw.linkValue),
    sort_order: Number(raw.sort_order ?? raw.sortOrder) || 0,
  }
}

async function fetchBanners(endpoint: string) {
  const { data } = await api.get(endpoint)
  const records = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
  return records.map((record: Record<string, unknown>) => normalizeBanner(record))
}

export const bannersService = {
  getActive: async (): Promise<Banner[]> => {
    for (const endpoint of ['/banners', '/banners/active']) {
      try {
        const banners = await fetchBanners(endpoint)
        if (banners.length > 0) return banners
      } catch {
        // Fall through to the next live endpoint.
      }
    }

    return getDemoBanners()
  },
}
