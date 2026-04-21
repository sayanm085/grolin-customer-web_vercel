import type { NextRequest } from 'next/server'
import { getServerApiBase } from '@/lib/api-base'
import {
    getDemoAllProducts,
    getDemoBanners,
    getDemoCategories,
    getDemoCategory,
    getDemoCategoryProducts,
    getDemoDealProducts,
    getDemoFeaturedProducts,
    getDemoNewArrivals,
    getDemoProduct,
    getDemoRelatedProducts,
    searchDemoProducts,
} from '@/lib/shopfront/shopfront-demo-data'

export const dynamic = 'force-dynamic'

function buildTargetUrl(path: string[], search: string) {
    const encodedPath = path.map((segment) => encodeURIComponent(segment)).join('/')
    return `${getServerApiBase()}/${encodedPath}${search}`
}

function getNumberParam(searchParams: URLSearchParams, key: string, fallback: number) {
    const value = Number(searchParams.get(key))
    return Number.isFinite(value) && value > 0 ? value : fallback
}

function getStringParam(searchParams: URLSearchParams, key: string) {
    const value = searchParams.get(key)
    return value && value.trim() ? value.trim() : undefined
}

function createJsonResponse(payload: unknown, status = 200) {
    return new Response(JSON.stringify(payload), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
        },
    })
}

function createApiResponse(data: unknown, pagination?: unknown, extra: Record<string, unknown> = {}) {
    return createJsonResponse({
        success: true,
        message: 'OK',
        data,
        ...(pagination ? { pagination } : {}),
        ...extra,
    })
}

function buildFallbackResponse(path: string[], searchParams: URLSearchParams) {
    const [resource, identifier, child] = path

    if (resource === 'banners') {
        if (!identifier || identifier === 'active') {
            return createApiResponse(getDemoBanners())
        }
        return null
    }

    if (resource === 'categories') {
        if (!identifier) {
            return createApiResponse(getDemoCategories())
        }

        if (!child) {
            const category = getDemoCategory(identifier)
            return category ? createApiResponse(category) : null
        }

        if (child === 'products') {
            const page = getNumberParam(searchParams, 'page', 1)
            const limit = getNumberParam(searchParams, 'limit', 20)
            const sort = getStringParam(searchParams, 'sort')
            const { products, pagination } = getDemoCategoryProducts(identifier, { page, limit, sort })
            return createApiResponse(products, pagination)
        }

        return null
    }

    if (resource === 'products') {
        if (!identifier) {
            const page = getNumberParam(searchParams, 'page', 1)
            const limit = getNumberParam(searchParams, 'limit', 20)
            const sort = getStringParam(searchParams, 'sort')
            const search = getStringParam(searchParams, 'search')
            const categoryId = getStringParam(searchParams, 'categoryId')
            const inStock = searchParams.get('inStock') === 'true'
            const { products, pagination } = getDemoAllProducts({ page, limit, sort, search, categoryId, inStock })
            return createApiResponse(products, pagination)
        }

        if (identifier === 'featured') {
            return createApiResponse(getDemoFeaturedProducts(getNumberParam(searchParams, 'limit', 12)))
        }

        if (identifier === 'new-arrivals') {
            return createApiResponse(getDemoNewArrivals(getNumberParam(searchParams, 'limit', 12)))
        }

        if (identifier === 'deals') {
            return createApiResponse(getDemoDealProducts(getNumberParam(searchParams, 'limit', 20)))
        }

        if (identifier === 'search') {
            const query = getStringParam(searchParams, 'q') ?? ''
            const page = getNumberParam(searchParams, 'page', 1)
            const { products, suggestions, pagination } = searchDemoProducts(query, page)
            return createApiResponse(products, pagination, { suggestions })
        }

        if (child === 'related') {
            return createApiResponse(getDemoRelatedProducts(identifier, getNumberParam(searchParams, 'limit', 8)))
        }

        const product = getDemoProduct(identifier)
        return product ? createApiResponse(product) : null
    }

    if (resource === 'reviews' && identifier === 'products' && child) {
        const page = getNumberParam(searchParams, 'page', 1)
        const limit = getNumberParam(searchParams, 'limit', 6)

        return createApiResponse({
            reviews: [],
            averageRating: 0,
            pagination: {
                page,
                limit,
                total: 0,
                totalPages: 1,
            },
        })
    }

    return null
}

async function proxy(request: NextRequest, context: { params: { path: string[] } }) {
    const method = request.method.toUpperCase()
    const path = context.params.path ?? []
    const targetUrl = buildTargetUrl(path, request.nextUrl.search)
    const headers = new Headers(request.headers)

    headers.delete('host')
    headers.delete('connection')
    headers.delete('content-length')
    headers.delete('expect')

    const init: RequestInit = {
        method,
        headers,
        redirect: 'manual',
        cache: 'no-store',
    }

    if (method !== 'GET' && method !== 'HEAD') {
        init.body = await request.arrayBuffer()
    }

    try {
        const response = await fetch(targetUrl, init)

        if (!response.ok && method === 'GET') {
            const fallback = buildFallbackResponse(path, request.nextUrl.searchParams)
            if (fallback) return fallback
        }

        const responseHeaders = new Headers(response.headers)

        responseHeaders.delete('content-encoding')
        responseHeaders.delete('content-length')
        responseHeaders.set('cache-control', 'no-store')

        return new Response(response.body, {
            status: response.status,
            headers: responseHeaders,
        })
    } catch {
        if (method === 'GET') {
            const fallback = buildFallbackResponse(path, request.nextUrl.searchParams)
            if (fallback) return fallback
        }

        return createJsonResponse(
            {
                success: false,
                message: 'Upstream request failed',
            },
            502,
        )
    }
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
export const OPTIONS = proxy
