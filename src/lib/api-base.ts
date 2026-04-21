const FALLBACK_BACKEND_API_URL = 'https://grocery-api.shotlin.in/api/v1'

function ensureApiV1(url: string) {
    const trimmed = url.replace(/\/+$/, '')
    return /\/api\/v1$/i.test(trimmed) ? trimmed : `${trimmed}/api/v1`
}

export function getClientApiBase() {
    return process.env.NEXT_PUBLIC_API_PROXY_PATH || '/api/v1'
}

export function getServerApiBase() {
    const configured =
        process.env.INTERNAL_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        FALLBACK_BACKEND_API_URL

    return ensureApiV1(configured)
}
