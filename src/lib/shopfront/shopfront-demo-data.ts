import type { Pagination } from '@/types/api.types'
import type { Banner } from '@/types/banner.types'
import type { Category, Product } from '@/types/product.types'

const PLACEHOLDER_IMAGE = '/placeholder-product.svg'

const CATEGORY_IMAGE_MAP: Record<string, string> = {
    'cat-vegetables': '/demo-catalog/categories/vegetables.svg',
    'cat-fruits': '/demo-catalog/categories/fruits.svg',
    'cat-dairy': '/demo-catalog/categories/dairy.svg',
    'cat-bakery': '/demo-catalog/categories/bakery.svg',
    'cat-beverages': '/demo-catalog/categories/beverages.svg',
    'cat-snacks': '/demo-catalog/categories/snacks.svg',
    'cat-pantry': '/demo-catalog/categories/pantry.svg',
    'cat-baby': '/demo-catalog/categories/baby.svg',
    'cat-care': '/demo-catalog/categories/care.svg',
}

const BANNER_IMAGE_MAP: Record<string, string> = {
    'banner-fresh-dinner': '/images/hero/hero-basket.webp',
    'banner-breakfast': '/images/hero/hands-produce.webp',
    'banner-snacks': '/images/hero/produce-scatter.webp',
}

const RAW_DEMO_PRODUCTS: Product[] = [
    {
        id: 'prod-spinach',
        name: 'Organic Baby Spinach',
        slug: 'organic-baby-spinach',
        description: 'Tender baby spinach leaves washed, packed, and ready for salads, smoothies, and sauteed greens.',
        price: 89,
        sale_price: 69,
        salePrice: 69,
        stock_quantity: 24,
        unit: 'pack',
        category_id: 'cat-vegetables',
        category_name: 'Fresh Vegetables',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 320,
        weekly_sales: 47,
        max_order_qty: 6,
        tags: ['organic', 'greens', 'fresh'],
        ingredients: 'Baby spinach leaves',
        allergen_info: null,
        shelf_life: '3 days refrigerated',
        storage_instructions: 'Keep chilled and consume soon after opening.',
        certifications: ['Organic'],
        nutrition_info: { iron: '2.7mg', fiber: '2.2g', vitamin_a: '2813 IU' },
        variants: null,
        created_at: '2026-03-01T09:00:00.000Z',
    },
    {
        id: 'prod-tomatoes',
        name: 'Vine Tomatoes',
        slug: 'vine-tomatoes',
        description: 'Bright red tomatoes with balanced sweetness for curries, salads, and everyday cooking.',
        price: 58,
        sale_price: 49,
        salePrice: 49,
        stock_quantity: 40,
        unit: 'g',
        category_id: 'cat-vegetables',
        category_name: 'Fresh Vegetables',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 515,
        max_order_qty: 10,
        tags: ['daily', 'fresh'],
        ingredients: 'Tomatoes',
        allergen_info: null,
        shelf_life: '4 days refrigerated',
        storage_instructions: 'Keep cool and dry. Refrigerate after ripening.',
        certifications: null,
        nutrition_info: { vitamin_c: '13mg', fiber: '1.5g' },
        variants: null,
        created_at: '2026-02-24T10:00:00.000Z',
    },
    {
        id: 'prod-avocado',
        name: 'Premium Avocado Duo',
        slug: 'premium-avocado-duo',
        description: 'Two creamy Hass avocados selected for ripeness and rich texture.',
        price: 199,
        sale_price: 169,
        salePrice: 169,
        stock_quantity: 16,
        unit: 'pack',
        category_id: 'cat-fruits',
        category_name: 'Seasonal Fruits',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 178,
        max_order_qty: 4,
        tags: ['premium', 'healthy'],
        ingredients: 'Avocado',
        allergen_info: null,
        shelf_life: '2 days at room temperature',
        storage_instructions: 'Refrigerate once ripe.',
        certifications: null,
        nutrition_info: { fiber: '6.7g', potassium: '485mg' },
        variants: null,
        created_at: '2026-03-05T08:00:00.000Z',
    },
    {
        id: 'prod-mango',
        name: 'Alphonso Mangoes',
        slug: 'alphonso-mangoes',
        description: 'Seasonal Alphonso mangoes with fragrant sweetness and smooth golden flesh.',
        price: 349,
        sale_price: 299,
        salePrice: 299,
        stock_quantity: 20,
        unit: 'kg',
        category_id: 'cat-fruits',
        category_name: 'Seasonal Fruits',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 260,
        max_order_qty: 5,
        tags: ['seasonal', 'fruit'],
        ingredients: 'Mangoes',
        allergen_info: null,
        shelf_life: '3 days at room temperature',
        storage_instructions: 'Keep at room temperature until ripe.',
        certifications: null,
        nutrition_info: { vitamin_c: '36mg', fiber: '1.6g' },
        variants: null,
        created_at: '2026-03-07T07:30:00.000Z',
    },
    {
        id: 'prod-bananas',
        name: 'Sweet Banana Bunch',
        slug: 'sweet-banana-bunch',
        description: 'Naturally sweet bananas ideal for breakfast bowls, shakes, and snacking.',
        price: 72,
        sale_price: null,
        salePrice: null,
        stock_quantity: 38,
        unit: 'pack',
        category_id: 'cat-fruits',
        category_name: 'Seasonal Fruits',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 410,
        max_order_qty: 8,
        tags: ['fruit', 'breakfast'],
        ingredients: 'Bananas',
        allergen_info: null,
        shelf_life: '3 days at room temperature',
        storage_instructions: 'Store at room temperature.',
        certifications: null,
        nutrition_info: { potassium: '358mg', fiber: '2.6g' },
        variants: null,
        created_at: '2026-02-18T08:30:00.000Z',
    },
    {
        id: 'prod-milk',
        name: 'Farm Fresh Cow Milk',
        slug: 'farm-fresh-cow-milk',
        description: 'Pasteurized full-cream milk sourced daily and chilled for doorstep delivery.',
        price: 74,
        sale_price: 68,
        salePrice: 68,
        stock_quantity: 44,
        unit: 'l',
        category_id: 'cat-dairy',
        category_name: 'Dairy & Eggs',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 610,
        weekly_sales: 1240,
        max_order_qty: 6,
        tags: ['dairy', 'daily'],
        ingredients: 'Cow milk',
        allergen_info: 'Contains milk',
        shelf_life: '2 days refrigerated',
        storage_instructions: 'Keep refrigerated below 4Â°C.',
        certifications: ['Quality Checked'],
        nutrition_info: { protein: '3.2g', calcium: '120mg' },
        variants: [
            { id: 'milk-500ml', name: '500 ml', price: 42, sale_price: 39, stock: 20, display_order: 1, is_active: true },
            { id: 'milk-1l', name: '1 L', price: 74, sale_price: 68, stock: 44, display_order: 2, is_active: true },
        ],
        created_at: '2026-02-26T06:45:00.000Z',
    },
    {
        id: 'prod-yogurt',
        name: 'Greek Yogurt Cup',
        slug: 'greek-yogurt-cup',
        description: 'Thick and creamy Greek yogurt with clean protein and a mild tang.',
        price: 125,
        sale_price: 109,
        salePrice: 109,
        stock_quantity: 22,
        unit: 'g',
        category_id: 'cat-dairy',
        category_name: 'Dairy & Eggs',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 208,
        max_order_qty: 6,
        tags: ['protein', 'breakfast'],
        ingredients: 'Milk solids, live cultures',
        allergen_info: 'Contains milk',
        shelf_life: '5 days refrigerated',
        storage_instructions: 'Keep chilled.',
        certifications: null,
        nutrition_info: { protein: '10g', calcium: '110mg' },
        variants: null,
        created_at: '2026-03-03T05:15:00.000Z',
    },
    {
        id: 'prod-eggs',
        name: 'Free Range Eggs',
        slug: 'free-range-eggs',
        description: 'Twelve clean, quality-checked eggs from free-range farms.',
        price: 149,
        sale_price: 129,
        salePrice: 129,
        stock_quantity: 18,
        unit: 'pack',
        category_id: 'cat-dairy',
        category_name: 'Dairy & Eggs',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 194,
        max_order_qty: 4,
        tags: ['protein', 'breakfast'],
        ingredients: 'Eggs',
        allergen_info: 'Contains egg',
        shelf_life: '7 days refrigerated',
        storage_instructions: 'Refrigerate in original carton.',
        certifications: ['Quality Checked'],
        nutrition_info: { protein: '6g', vitamin_d: '41 IU' },
        variants: null,
        created_at: '2026-02-22T05:15:00.000Z',
    },
    {
        id: 'prod-sourdough',
        name: 'Multigrain Sourdough Bread',
        slug: 'multigrain-sourdough-bread',
        description: 'Fresh-baked sourdough loaf with seeds, grains, and a chewy crust.',
        price: 169,
        sale_price: null,
        salePrice: null,
        stock_quantity: 15,
        unit: 'pack',
        category_id: 'cat-bakery',
        category_name: 'Bakery & Breakfast',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 180,
        weekly_sales: 640,
        max_order_qty: 4,
        tags: ['bakery', 'artisan'],
        ingredients: 'Flour, sourdough starter, seeds, salt',
        allergen_info: 'Contains gluten',
        shelf_life: '2 days',
        storage_instructions: 'Store in a bread box or airtight bag.',
        certifications: null,
        nutrition_info: { fiber: '4g', protein: '7g' },
        variants: null,
        created_at: '2026-02-28T04:10:00.000Z',
    },
    {
        id: 'prod-croissant',
        name: 'Butter Croissant Pack',
        slug: 'butter-croissant-pack',
        description: 'Flaky croissants baked with cultured butter for a rich breakfast bite.',
        price: 159,
        sale_price: 139,
        salePrice: 139,
        stock_quantity: 12,
        unit: 'pack',
        category_id: 'cat-bakery',
        category_name: 'Bakery & Breakfast',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 120,
        max_order_qty: 4,
        tags: ['bakery', 'breakfast'],
        ingredients: 'Flour, butter, yeast, sugar, salt',
        allergen_info: 'Contains gluten and milk',
        shelf_life: '2 days',
        storage_instructions: 'Keep sealed and warm lightly before serving.',
        certifications: null,
        nutrition_info: { fat: '12g', protein: '5g' },
        variants: null,
        created_at: '2026-03-06T04:10:00.000Z',
    },
    {
        id: 'prod-coldbrew',
        name: 'Cold Brew Coffee',
        slug: 'cold-brew-coffee',
        description: 'Slow-brewed cold coffee with a smooth finish and no added sugar.',
        price: 149,
        sale_price: 129,
        salePrice: 129,
        stock_quantity: 28,
        unit: 'ml',
        category_id: 'cat-beverages',
        category_name: 'Beverages',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 210,
        max_order_qty: 6,
        tags: ['beverage', 'coffee'],
        ingredients: 'Cold brew coffee, water',
        allergen_info: null,
        shelf_life: '4 days refrigerated',
        storage_instructions: 'Keep chilled and shake before use.',
        certifications: null,
        nutrition_info: { caffeine: '120mg' },
        variants: null,
        created_at: '2026-03-08T07:00:00.000Z',
    },
    {
        id: 'prod-kombucha',
        name: 'Ginger Kombucha',
        slug: 'ginger-kombucha',
        description: 'Lightly sparkling kombucha brewed with ginger and live cultures.',
        price: 135,
        sale_price: null,
        salePrice: null,
        stock_quantity: 18,
        unit: 'ml',
        category_id: 'cat-beverages',
        category_name: 'Beverages',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 88,
        max_order_qty: 6,
        tags: ['beverage', 'gut-health'],
        ingredients: 'Tea, sugar, SCOBY, ginger',
        allergen_info: null,
        shelf_life: '6 days refrigerated',
        storage_instructions: 'Keep refrigerated.',
        certifications: null,
        nutrition_info: { sugar: '6g' },
        variants: null,
        created_at: '2026-03-04T07:00:00.000Z',
    },
    {
        id: 'prod-almonds',
        name: 'Roasted Almonds',
        slug: 'roasted-almonds',
        description: 'Dry roasted almonds with a clean crunch for workday snacking.',
        price: 265,
        sale_price: 229,
        salePrice: 229,
        stock_quantity: 26,
        unit: 'g',
        category_id: 'cat-snacks',
        category_name: 'Snacks & Munchies',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 174,
        max_order_qty: 5,
        tags: ['snack', 'nuts'],
        ingredients: 'Almonds, sea salt',
        allergen_info: 'Contains tree nuts',
        shelf_life: '30 days',
        storage_instructions: 'Store airtight in a cool place.',
        certifications: null,
        nutrition_info: { protein: '6g', fiber: '3g' },
        variants: null,
        created_at: '2026-02-20T12:30:00.000Z',
    },
    {
        id: 'prod-chips',
        name: 'Sea Salt Kettle Chips',
        slug: 'sea-salt-kettle-chips',
        description: 'Small-batch kettle chips with sea salt and a crisp finish.',
        price: 99,
        sale_price: 79,
        salePrice: 79,
        stock_quantity: 34,
        unit: 'pack',
        category_id: 'cat-snacks',
        category_name: 'Snacks & Munchies',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 240,
        max_order_qty: 8,
        tags: ['snack', 'savory'],
        ingredients: 'Potatoes, sunflower oil, sea salt',
        allergen_info: null,
        shelf_life: '45 days',
        storage_instructions: 'Store in a cool, dry place.',
        certifications: null,
        nutrition_info: { fat: '10g', sodium: '140mg' },
        variants: null,
        created_at: '2026-03-02T12:30:00.000Z',
    },
    {
        id: 'prod-rice',
        name: 'Aged Basmati Rice',
        slug: 'aged-basmati-rice',
        description: 'Long-grain basmati rice with aromatic fragrance and fluffy texture.',
        price: 479,
        sale_price: 429,
        salePrice: 429,
        stock_quantity: 14,
        unit: 'kg',
        category_id: 'cat-pantry',
        category_name: 'Pantry Staples',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: true,
        total_sold: 190,
        max_order_qty: 4,
        tags: ['pantry', 'rice'],
        ingredients: 'Basmati rice',
        allergen_info: null,
        shelf_life: '180 days',
        storage_instructions: 'Keep sealed in a dry place.',
        certifications: null,
        nutrition_info: { carbs: '78g' },
        variants: null,
        created_at: '2026-02-17T11:00:00.000Z',
    },
    {
        id: 'prod-oil',
        name: 'Extra Virgin Olive Oil',
        slug: 'extra-virgin-olive-oil',
        description: 'Cold-extracted olive oil for salad dressings, drizzles, and clean cooking.',
        price: 699,
        sale_price: 629,
        salePrice: 629,
        stock_quantity: 10,
        unit: 'l',
        category_id: 'cat-pantry',
        category_name: 'Pantry Staples',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 96,
        max_order_qty: 3,
        tags: ['pantry', 'premium'],
        ingredients: 'Extra virgin olive oil',
        allergen_info: null,
        shelf_life: '240 days',
        storage_instructions: 'Store away from direct heat and sunlight.',
        certifications: ['Cold Pressed'],
        nutrition_info: { fat: '14g' },
        variants: [
            { id: 'oil-500ml', name: '500 ml', price: 379, sale_price: 349, stock: 12, display_order: 1, is_active: true },
            { id: 'oil-1l', name: '1 L', price: 699, sale_price: 629, stock: 10, display_order: 2, is_active: true },
        ],
        created_at: '2026-03-09T11:00:00.000Z',
    },
    {
        id: 'prod-honey',
        name: 'Organic Wildflower Honey',
        slug: 'organic-wildflower-honey',
        description: 'Raw wildflower honey with floral notes and natural sweetness.',
        price: 325,
        sale_price: 289,
        salePrice: 289,
        stock_quantity: 17,
        unit: 'g',
        category_id: 'cat-pantry',
        category_name: 'Pantry Staples',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 116,
        max_order_qty: 4,
        tags: ['pantry', 'organic'],
        ingredients: 'Raw honey',
        allergen_info: null,
        shelf_life: '365 days',
        storage_instructions: 'Store sealed at room temperature.',
        certifications: ['Organic'],
        nutrition_info: { sugar: '17g' },
        variants: null,
        created_at: '2026-02-25T11:00:00.000Z',
    },
    {
        id: 'prod-diapers',
        name: 'Soft Care Baby Diapers',
        slug: 'soft-care-baby-diapers',
        description: 'Ultra-soft diapers with breathable layers for overnight comfort.',
        price: 549,
        sale_price: 499,
        salePrice: 499,
        stock_quantity: 21,
        unit: 'pack',
        category_id: 'cat-baby',
        category_name: 'Baby Care',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 92,
        max_order_qty: 3,
        tags: ['baby', 'care'],
        ingredients: 'Non-woven fabric, absorbent core',
        allergen_info: null,
        shelf_life: '24 months',
        storage_instructions: 'Store sealed in a dry place.',
        certifications: ['Dermatologically Tested'],
        nutrition_info: null,
        variants: null,
        created_at: '2026-03-01T13:10:00.000Z',
    },
    {
        id: 'prod-handwash',
        name: 'Botanical Hand Wash',
        slug: 'botanical-hand-wash',
        description: 'Gentle hand wash with a botanical fragrance and skin-friendly formula.',
        price: 149,
        sale_price: 129,
        salePrice: 129,
        stock_quantity: 25,
        unit: 'ml',
        category_id: 'cat-care',
        category_name: 'Personal Care',
        images: [PLACEHOLDER_IMAGE],
        thumbnail_url: PLACEHOLDER_IMAGE,
        is_featured: false,
        total_sold: 74,
        max_order_qty: 5,
        tags: ['care', 'household'],
        ingredients: 'Aqua, glycerin, botanical extracts',
        allergen_info: null,
        shelf_life: '24 months',
        storage_instructions: 'Store capped at room temperature.',
        certifications: ['Dermatologically Tested'],
        nutrition_info: null,
        variants: null,
        created_at: '2026-02-27T13:10:00.000Z',
    },
]

const RAW_CATEGORY_SEEDS: Omit<Category, 'product_count'>[] = [
    {
        id: 'cat-vegetables',
        name: 'Fresh Vegetables',
        description: 'Leafy greens, salad staples, and daily cooking vegetables delivered fresh.',
        image_url: null,
        parent_id: null,
        sort_order: 1,
        is_active: true,
    },
    {
        id: 'cat-fruits',
        name: 'Seasonal Fruits',
        description: 'Handpicked fruits with premium quality and better ripeness selection.',
        image_url: null,
        parent_id: null,
        sort_order: 2,
        is_active: true,
    },
    {
        id: 'cat-dairy',
        name: 'Dairy & Eggs',
        description: 'Milk, yogurt, eggs, and breakfast refrigeration essentials.',
        image_url: null,
        parent_id: null,
        sort_order: 3,
        is_active: true,
    },
    {
        id: 'cat-bakery',
        name: 'Bakery & Breakfast',
        description: 'Fresh-baked breads, breakfast staples, and easy morning picks.',
        image_url: null,
        parent_id: null,
        sort_order: 4,
        is_active: true,
    },
    {
        id: 'cat-beverages',
        name: 'Beverages',
        description: 'Coffee, kombucha, and chilled beverages for everyday refreshment.',
        image_url: null,
        parent_id: null,
        sort_order: 5,
        is_active: true,
    },
    {
        id: 'cat-snacks',
        name: 'Snacks & Munchies',
        description: 'Smarter snacking with nuts, chips, and pantry bites.',
        image_url: null,
        parent_id: null,
        sort_order: 6,
        is_active: true,
    },
    {
        id: 'cat-pantry',
        name: 'Pantry Staples',
        description: 'Rice, oils, honey, and clean cooking essentials for weekly stocking.',
        image_url: null,
        parent_id: null,
        sort_order: 7,
        is_active: true,
    },
    {
        id: 'cat-baby',
        name: 'Baby Care',
        description: 'Trusted everyday essentials for baby care and family convenience.',
        image_url: null,
        parent_id: null,
        sort_order: 8,
        is_active: true,
    },
    {
        id: 'cat-care',
        name: 'Personal Care',
        description: 'Daily self-care and hygiene products for the whole household.',
        image_url: null,
        parent_id: null,
        sort_order: 9,
        is_active: true,
    },
]

const RAW_SHOPFRONT_DEMO_BANNERS: Banner[] = [
    {
        id: 'banner-fresh-dinner',
        title: 'Fresh picks for tonight\'s dinner',
        subtitle: 'Vegetables, herbs, and premium produce that make quick weeknight cooking easier.',
        image_url: '',
        link_type: 'category',
        link_value: 'cat-vegetables',
        sort_order: 1,
    },
    {
        id: 'banner-breakfast',
        title: 'Breakfast essentials in one basket',
        subtitle: 'Milk, eggs, yogurt, and bakery staples arranged for a better morning restock.',
        image_url: '',
        link_type: 'category',
        link_value: 'cat-dairy',
        sort_order: 2,
    },
    {
        id: 'banner-snacks',
        title: 'Healthy snacking without guesswork',
        subtitle: 'Curated nuts, lighter bites, and clean pantry favourites ready for checkout.',
        image_url: '',
        link_type: 'category',
        link_value: 'cat-snacks',
        sort_order: 3,
    },
]

const DEMO_PRODUCTS: Product[] = RAW_DEMO_PRODUCTS.map((product) => {
    const image = CATEGORY_IMAGE_MAP[product.category_id] ?? PLACEHOLDER_IMAGE
    return {
        ...product,
        images: [image],
        thumbnail_url: image,
    }
})

export const SHOPFRONT_DEMO_CATEGORIES: Category[] = RAW_CATEGORY_SEEDS.map((category) => ({
    ...category,
    image_url: CATEGORY_IMAGE_MAP[category.id] ?? null,
    product_count: DEMO_PRODUCTS.filter((product) => product.category_id === category.id).length,
}))

export const SHOPFRONT_DEMO_BANNERS: Banner[] = RAW_SHOPFRONT_DEMO_BANNERS.map((banner) => ({
    ...banner,
    image_url: BANNER_IMAGE_MAP[banner.id] ?? '',
}))

function getDisplayPrice(product: Product) {
    return product.sale_price ?? product.salePrice ?? product.price
}

function sortProducts(items: Product[], sort?: string) {
    const list = [...items]

    switch (sort) {
        case 'newest':
            return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        case 'price_asc':
        case 'price_low':
            return list.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b))
        case 'price_desc':
        case 'price_high':
            return list.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a))
        case 'popular':
            return list.sort((a, b) => b.total_sold - a.total_sold)
        default:
            return list.sort((a, b) => {
                if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
                return b.total_sold - a.total_sold
            })
    }
}

function paginate<T>(items: T[], page = 1, limit = 20) {
    const safePage = Math.max(1, Number(page) || 1)
    const safeLimit = Math.max(1, Number(limit) || 20)
    const total = items.length
    const totalPages = Math.max(1, Math.ceil(total / safeLimit))
    const start = (safePage - 1) * safeLimit

    return {
        data: items.slice(start, start + safeLimit),
        pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages,
        } satisfies Pagination,
    }
}

function normalizeSearch(value: string) {
    return value.trim().toLowerCase()
}

export function getDemoCategories() {
    return [...SHOPFRONT_DEMO_CATEGORIES]
}

export function getDemoCategory(id: string) {
    return SHOPFRONT_DEMO_CATEGORIES.find((category) => category.id === id) ?? null
}

export function getDemoAllProducts(params: Record<string, unknown> = {}) {
    const page = Number(params.page) || 1
    const limit = Number(params.limit) || 20
    const categoryId = typeof params.categoryId === 'string' ? params.categoryId : undefined
    const search = typeof params.search === 'string' ? normalizeSearch(params.search) : ''
    const inStock = Boolean(params.inStock)
    const sort = typeof params.sort === 'string' ? params.sort : undefined

    let items = [...DEMO_PRODUCTS]

    if (categoryId) {
        items = items.filter((product) => product.category_id === categoryId)
    }

    if (search) {
        items = items.filter((product) => {
            const haystack = [
                product.name,
                product.description ?? '',
                product.category_name ?? '',
                ...product.tags,
            ]
                .join(' ')
                .toLowerCase()

            return haystack.includes(search)
        })
    }

    if (inStock) {
        items = items.filter((product) => product.stock_quantity > 0)
    }

    return {
        products: paginate(sortProducts(items, sort), page, limit).data,
        pagination: paginate(sortProducts(items, sort), page, limit).pagination,
    }
}

export function getDemoFeaturedProducts(limit = 12) {
    return sortProducts(
        DEMO_PRODUCTS.filter((product) => product.is_featured),
        'popular',
    ).slice(0, limit)
}

export function getDemoNewArrivals(limit = 12) {
    return sortProducts(DEMO_PRODUCTS, 'newest').slice(0, limit)
}

export function getDemoDealProducts(limit = 20) {
    return DEMO_PRODUCTS.filter((product) => product.sale_price !== null && product.sale_price < product.price)
        .sort((a, b) => {
            const aDiscount = a.price - (a.sale_price ?? a.price)
            const bDiscount = b.price - (b.sale_price ?? b.price)
            return bDiscount - aDiscount
        })
        .slice(0, limit)
}

export function searchDemoProducts(q: string, page = 1) {
    const results = getDemoAllProducts({ search: q, page, limit: 20 })
    return {
        ...results,
        suggestions: results.products.slice(0, 5),
    }
}

export function getDemoProduct(idOrSlug: string) {
    return DEMO_PRODUCTS.find((product) => product.id === idOrSlug || product.slug === idOrSlug) ?? null
}

export function getDemoRelatedProducts(idOrSlug: string, limit = 8) {
    const current = getDemoProduct(idOrSlug)
    if (!current) return getDemoFeaturedProducts(limit)

    const currentTags = new Set(current.tags)
    return sortProducts(
        DEMO_PRODUCTS.filter((product) => {
            if (product.id === current.id) return false
            return (
                product.category_id === current.category_id || product.tags.some((tag) => currentTags.has(tag))
            )
        }),
        'popular',
    ).slice(0, limit)
}

export function getDemoCategoryProducts(id: string, params: Record<string, unknown> = {}) {
    return getDemoAllProducts({ ...params, categoryId: id })
}

export function getDemoBanners() {
    return [...SHOPFRONT_DEMO_BANNERS].sort((a, b) => a.sort_order - b.sort_order)
}



