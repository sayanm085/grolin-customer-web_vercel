import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Grolin Grocery',
        short_name: 'Grolin',
        description: 'Fresh groceries delivered in minutes. Order from 1000+ products.',
        start_url: '/',
        display: 'standalone',
        background_color: 'rgb(240 237 232)',
        theme_color: 'rgb(104 72 198)',
        icons: [
            { src: '/icons/grolin-app-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
    }
}
