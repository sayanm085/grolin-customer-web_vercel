'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Search, Sparkles, X } from 'lucide-react'
import { WishlistButton } from '@/components/product/WishlistButton'
import { ShareButton } from '@/components/shared/ShareButton'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { PRODUCT_IMAGE_PLACEHOLDER, getProductGalleryImages } from '@/lib/media'
import { discountPercent } from '@/lib/utils'
import type { Product } from '@/types/product.types'

interface ProductGalleryProps {
    product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
    const [activeIdx, setActiveIdx] = useState(0)
    const [zoomOpen, setZoomOpen] = useState(false)
    const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})
    const { addViewed } = useRecentlyViewed()

    useEffect(() => {
        if (product?.id) addViewed(product.id)
    }, [product?.id, addViewed])

    const images = useMemo(() => getProductGalleryImages(product), [product])
    const mainImage = images[activeIdx] || images[0] || PRODUCT_IMAGE_PLACEHOLDER
    const mainImageSrc = failedImages[mainImage] ? PRODUCT_IMAGE_PLACEHOLDER : mainImage

    useEffect(() => {
        setActiveIdx(0)
        setFailedImages({})
    }, [product.id, images.length])

    const salePrice = product.sale_price ?? product.salePrice ?? null
    const isOnSale = salePrice !== null && salePrice < product.price
    const discount = isOnSale ? discountPercent(product.price, salePrice) : null
    const isFreshArrival = Date.now() - new Date(product.created_at).getTime() < 1000 * 60 * 60 * 24 * 14
    const isOrganic =
        product.tags?.some((tag) => tag.toLowerCase().includes('organic')) ||
        product.certifications?.some((cert) => cert.toLowerCase().includes('organic'))

    const prevImage = () => setActiveIdx((idx) => (idx > 0 ? idx - 1 : images.length - 1))
    const nextImage = () => setActiveIdx((idx) => (idx < images.length - 1 ? idx + 1 : 0))
    const markFailed = (src: string) => setFailedImages((prev) => ({ ...prev, [src]: true }))

    return (
        <>
            <div className="group relative overflow-hidden rounded-[28px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-soft)]">
                <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[450px]">
                    <Image
                        src={mainImageSrc}
                        alt={product.name}
                        fill
                        onError={() => markFailed(mainImage)}
                        unoptimized={mainImageSrc.startsWith('http')}
                        className="object-contain p-8"
                        priority
                        sizes="(max-width: 768px) 100vw, 55vw"
                    />

                    <button
                        type="button"
                        onClick={() => setZoomOpen(true)}
                        className="absolute inset-0 z-0"
                        aria-label={`Zoom image of ${product.name}`}
                    />

                    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
                        {discount && (
                            <div className="rounded-lg bg-[color:var(--shop-discount)] px-3 py-1.5 text-sm font-bold text-white shadow-md">
                                {discount}% OFF
                            </div>
                        )}
                        {isFreshArrival && (
                            <div className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                                New
                            </div>
                        )}
                        {isOrganic && (
                            <div className="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-700 shadow-sm">
                                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
                                Certified Organic
                            </div>
                        )}
                    </div>

                    <div className="absolute right-4 top-4 z-10 flex gap-2">
                        <WishlistButton productId={product.id} className="h-10 w-10" />
                        <ShareButton
                            title={product.name}
                            text={`Check out ${product.name} on Grolin!`}
                            url={`/products/${product.slug}`}
                        />
                    </div>

                    <div className="absolute bottom-4 right-4 z-10 hidden items-center gap-1.5 rounded-full bg-[color:var(--shop-surface)]/85 px-3 py-1.5 text-[11px] font-medium text-[color:var(--shop-ink-muted)] shadow-sm backdrop-blur md:flex">
                        <Search className="h-3.5 w-3.5" strokeWidth={1.8} />
                        Click to zoom
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation()
                                    prevImage()
                                }}
                                className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)]/92 text-[color:var(--shop-ink-muted)] opacity-100 shadow-[var(--shop-shadow-level-1)] backdrop-blur transition-opacity hover:bg-[color:var(--shop-surface)] md:opacity-0 md:group-hover:opacity-100"
                                aria-label="Previous product image"
                            >
                                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation()
                                    nextImage()
                                }}
                                className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)]/92 text-[color:var(--shop-ink-muted)] opacity-100 shadow-[var(--shop-shadow-level-1)] backdrop-blur transition-opacity hover:bg-[color:var(--shop-surface)] md:opacity-0 md:group-hover:opacity-100"
                                aria-label="Next product image"
                            >
                                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {images.length > 1 && (
                <div className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto pb-1 pr-1">
                    {images.map((img, index) => {
                        const thumbSrc = failedImages[img] ? PRODUCT_IMAGE_PLACEHOLDER : img

                        return (
                            <button
                                key={`${img}-${index}`}
                                type="button"
                                onClick={() => setActiveIdx(index)}
                                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                                    activeIdx === index
                                        ? 'border-[color:var(--shop-primary)] shadow-[0_0_0_2px_rgba(34,197,94,0.15)]'
                                        : 'border-[color:var(--shop-border)] hover:border-[color:var(--shop-primary-soft)]'
                                }`}
                                aria-label={`Show image ${index + 1}`}
                                aria-current={activeIdx === index ? 'true' : undefined}
                            >
                                <span className="relative block h-full w-full">
                                    <Image
                                        src={thumbSrc}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        onError={() => markFailed(img)}
                                        unoptimized={thumbSrc.startsWith('http')}
                                        className="object-contain p-1"
                                        sizes="64px"
                                    />
                                </span>
                            </button>
                        )
                    })}
                </div>
            )}

            {zoomOpen && (
                <div
                    className="fixed inset-0 z-[320] bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setZoomOpen(false)}
                >
                    <div className="mx-auto flex h-full w-full max-w-5xl flex-col" onClick={(event) => event.stopPropagation()}>
                        <div className="mb-3 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setZoomOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                aria-label="Close image zoom"
                            >
                                <X className="h-5 w-5" strokeWidth={1.8} />
                            </button>
                        </div>
                        <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                            <Image
                                src={mainImageSrc}
                                alt={product.name}
                                fill
                                onError={() => markFailed(mainImage)}
                                unoptimized={mainImageSrc.startsWith('http')}
                                className="object-contain p-6"
                                sizes="100vw"
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
                                        aria-label="Previous zoomed product image"
                                    >
                                        <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
                                        aria-label="Next zoomed product image"
                                    >
                                        <ChevronRight className="h-5 w-5" strokeWidth={1.7} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
