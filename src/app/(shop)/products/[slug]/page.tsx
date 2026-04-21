import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductDeliveryPanel } from '@/components/product/ProductDeliveryPanel'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ProductDetailsSection } from '@/components/product/ProductDetailsSection'
import { ProductReviewsSection } from '@/components/product/ProductReviewsSection'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { RecentlyViewedSection } from '@/components/product/RecentlyViewedSection'
import { PageShell, SectionHeader } from '@/components/shared'
import { getServerApiBase } from '@/lib/api-base'
import { getDemoProduct } from '@/lib/shopfront/shopfront-demo-data'
import { decodeHtmlEntities, formatINR } from '@/lib/utils'
import type { Product } from '@/types/product.types'

const API_URL = getServerApiBase()

interface Params {
  params: { slug: string }
}

interface ReviewSummary {
  averageRating: number
  totalReviews: number
}

function normalizeText(value: unknown) {
  return value == null ? null : decodeHtmlEntities(String(value))
}

function normalizeProduct(raw: Record<string, unknown> | null): Product | null {
  if (!raw || !raw.id || !raw.name || !raw.slug) return null

  const salePriceRaw = raw.sale_price ?? raw.salePrice
  const salePrice = salePriceRaw != null ? Number(salePriceRaw) : null

  return {
    id: String(raw.id),
    name: decodeHtmlEntities(String(raw.name)),
    slug: String(raw.slug),
    description: normalizeText(raw.description),
    price: Number(raw.price) || 0,
    sale_price: salePrice,
    salePrice: salePrice,
    stock_quantity: Number(raw.stock_quantity) || 0,
    unit: (raw.unit as Product['unit']) ?? 'piece',
    category_id: raw.category_id != null ? String(raw.category_id) : '',
    category_name: normalizeText(raw.category_name),
    images: Array.isArray(raw.images) ? (raw.images as string[]) : [],
    thumbnail_url: raw.thumbnail_url != null ? String(raw.thumbnail_url) : null,
    is_featured: Boolean(raw.is_featured),
    total_sold: Number(raw.total_sold) || 0,
    weekly_sales:
      raw.weekly_sales != null
        ? Number(raw.weekly_sales) || 0
        : raw.weeklySales != null
          ? Number(raw.weeklySales) || 0
          : null,
    max_order_qty: raw.max_order_qty != null ? Number(raw.max_order_qty) : null,
    tags: Array.isArray(raw.tags) ? raw.tags.map((tag) => decodeHtmlEntities(String(tag))) : [],
    ingredients: normalizeText(raw.ingredients),
    allergen_info: normalizeText(raw.allergen_info),
    shelf_life: normalizeText(raw.shelf_life),
    storage_instructions: normalizeText(raw.storage_instructions),
    certifications: Array.isArray(raw.certifications)
      ? raw.certifications.map((certification) => decodeHtmlEntities(String(certification)))
      : null,
    nutrition_info: (raw.nutrition_info as Record<string, string>) ?? null,
    variants: (raw.variants as Product['variants']) ?? null,
    created_at: raw.created_at != null ? String(raw.created_at) : new Date().toISOString(),
  }
}

function normalizeReviewSummary(raw: unknown): ReviewSummary {
  if (!raw || typeof raw !== 'object') {
    return { averageRating: 0, totalReviews: 0 }
  }

  const record = raw as Record<string, unknown>
  const pagination = (record.pagination as Record<string, unknown> | undefined) ?? undefined

  return {
    averageRating: Number(record.averageRating ?? record.average_rating ?? 0) || 0,
    totalReviews: Number(pagination?.total ?? 0) || 0,
  }
}

function hasProductDetails(product: Product) {
  return Boolean(
    product.ingredients ||
      product.allergen_info ||
      product.shelf_life ||
      product.storage_instructions ||
      (product.certifications?.filter(Boolean).length ?? 0) > 0 ||
      (product.nutrition_info && Object.keys(product.nutrition_info).length > 0),
  )
}

async function parseJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T
  } catch {
    return null
  }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const json = await parseJson<{ data?: Record<string, unknown> } & Record<string, unknown>>(res)
      const raw = json?.data ?? (json as Record<string, unknown> | undefined)
      const liveProduct = normalizeProduct(raw ?? null)
      if (liveProduct) return liveProduct
    }
  } catch {
    // Fall through to demo fallback.
  }

  return getDemoProduct(slug)
}

async function getInitialReviews(productId: string): Promise<unknown> {
  const endpoints = [
    `${API_URL}/products/${productId}/reviews?page=1&limit=6`,
    `${API_URL}/reviews/products/${productId}?page=1&limit=6`,
  ]

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { next: { revalidate: 120 }, signal: AbortSignal.timeout(4000) })
      if (!res.ok) continue
      const json = await parseJson<Record<string, unknown>>(res)
      if (!json) continue
      return json.data ?? json
    } catch {
      // Continue to fallback endpoint.
    }
  }

  return null
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) {
    return { title: 'Product Not Found | Grolin Grocery' }
  }

  const price = product.sale_price ?? product.salePrice ?? product.price
  const image = product.images?.[0] || product.thumbnail_url || '/og-default.png'

  return {
    title: `${product.name} - ${formatINR(price)} | Grolin Grocery`,
    description:
      product.description?.slice(0, 160) ||
      `Buy ${product.name} at best price on Grolin Grocery. Fresh quality guaranteed.`,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160) || `Buy ${product.name} on Grolin`,
      images: [{ url: image, width: 1200, height: 630 }],
      type: 'website',
      locale: 'en_IN',
      siteName: 'Grolin Grocery',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      images: [image],
    },
  }
}

function ProductJsonLd({ product }: { product: Product }) {
  const price = product.sale_price ?? product.salePrice ?? product.price
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.length ? product.images : [product.thumbnail_url],
    description: product.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price,
      availability:
        product.stock_quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

export default async function ProductDetailPage({ params }: Params) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const initialReviews = await getInitialReviews(product.id)
  const reviewSummary = normalizeReviewSummary(initialReviews)
  const showDetails = hasProductDetails(product)

  return (
    <>
      <ProductJsonLd product={product} />
      <PageShell spacing="relaxed">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-8">
          <div className="shop-surface-soft rounded-[30px] p-4 sm:p-5 lg:p-6">
            <ProductGallery product={product} />
          </div>
          <div className="shop-surface-soft space-y-5 rounded-[30px] p-5 sm:p-6">
            <ProductInfo product={product} reviewSummary={reviewSummary} />
            <ProductDeliveryPanel />
          </div>
        </div>
        {showDetails && (
          <div className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
            <ProductDetailsSection product={product} />
          </div>
        )}
        <div className="shop-surface-soft rounded-[30px] p-5 sm:p-6" id="reviews">
          <SectionHeader
            title="Ratings & Reviews"
            subtitle="Read verified feedback and see how this product performs over time."
          />
          <div className="mt-5">
            <ProductReviewsSection productId={product.id} initialData={initialReviews} />
          </div>
        </div>
        <div className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
          <SectionHeader
            title="Related Products"
            subtitle="More curated picks from the same shopping mission."
          />
          <div className="mt-5">
            <RelatedProducts productId={product.id} />
          </div>
        </div>
        <div className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
          <RecentlyViewedSection currentProductId={product.id} />
        </div>
      </PageShell>
    </>
  )
}

