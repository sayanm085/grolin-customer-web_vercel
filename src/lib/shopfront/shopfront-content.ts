export type CategoryIconKey =
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'bakery'
  | 'breakfast'
  | 'beverages'
  | 'snacks'
  | 'meat'
  | 'frozen'
  | 'household'
  | 'baby'
  | 'care'
  | 'pantry'

export interface ShopfrontCategoryPreference {
  label: string
  keywords: string[]
  icon: CategoryIconKey
}

export interface ShopfrontFooterGroup {
  title: string
  links: Array<{
    label: string
    href: string
    external?: boolean
  }>
}

export interface ShopfrontSocialLink {
  label: string
  href: string
}

export interface ShopfrontAppDownload {
  label: string
  href: string
  caption: string
}

export const SHOPFRONT_VALUE_BAR = {
  message: 'FREE delivery & 40% discount for your next 3 orders. Place your 1st order today.',
  locale: 'INR \u00B7 English',
  helpLabel: 'Help Center',
  helpHref: '/profile',
}

export const SHOPFRONT_HEADER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Browse Categories', href: '/categories' },
  { label: 'Deals & Offers', href: '/products' },
  { label: 'Our Promise', href: '/profile' },
  { label: 'Help Center', href: '/profile' },
]

export const SHOPFRONT_HEADER_HOTLINE = {
  label: 'Weekly Discount!',
  phoneLabel: 'Hotline Number',
  phone: '+91 98765 43210',
}

export const SHOPFRONT_CATEGORY_PREFERENCES: ShopfrontCategoryPreference[] = [
  { label: 'Vegetables', keywords: ['vegetable', 'veggie', 'greens'], icon: 'vegetables' },
  { label: 'Fruits', keywords: ['fruit', 'fruits'], icon: 'fruits' },
  { label: 'Dairy', keywords: ['dairy', 'milk', 'egg', 'eggs'], icon: 'dairy' },
  { label: 'Bakery', keywords: ['bakery', 'bread', 'croissant'], icon: 'bakery' },
  { label: 'Breakfast', keywords: ['breakfast', 'cereal', 'oats'], icon: 'breakfast' },
  { label: 'Drinks', keywords: ['beverage', 'drinks', 'coffee', 'tea', 'juice'], icon: 'beverages' },
  { label: 'Snacks', keywords: ['snack', 'chips', 'biscuits'], icon: 'snacks' },
  { label: 'Pantry', keywords: ['pantry', 'rice', 'dal', 'oil', 'staples', 'masala'], icon: 'pantry' },
  { label: 'Meat & Fish', keywords: ['meat', 'fish', 'seafood', 'chicken'], icon: 'meat' },
  { label: 'Frozen', keywords: ['frozen', 'ice cream'], icon: 'frozen' },
  { label: 'Home', keywords: ['home', 'cleaning', 'household'], icon: 'household' },
  { label: 'Baby Food', keywords: ['baby', 'kids', 'infant'], icon: 'baby' },
  { label: 'Personal Care', keywords: ['care', 'beauty', 'personal', 'hygiene'], icon: 'care' },
]

export const SHOPFRONT_CAMPAIGN_COPY = {
  heroEyebrow: 'Premium grocery commerce',
  heroFallbackTitle: 'Taste the Grolin difference.',
  heroFallbackSubtitle: 'Curated essentials, premium produce, and everyday delivery with cleaner UX.',
  heroCtaLabel: 'Shop Now',
  promoPrimaryLabel: 'Shop Collection',
  promoSecondaryLabel: 'Explore Deal',
  stripLabel: 'Browse Campaign',
}

export const SHOPFRONT_PROMISE_BANNER = {
  eyebrow: 'Our quality promise',
  title: 'Uncompromising quality, handled with care.',
  subtitle:
    "If it doesn't feel fresh, it doesn't belong in your basket. Grolin curates produce, pantry, and family essentials with stricter standards from source to doorstep.",
  ctaLabel: 'Learn More About Quality',
  ctaHref: '/categories',
  points: ['Certified sourcing', 'Freshness-backed deliveries', 'Clear pricing with no surprises'],
}

export const SHOPFRONT_NEWSLETTER = {
  eyebrow: 'Stay in the loop',
  title: 'Recipes, premium offers, and seasonal grocery edits.',
  subtitle: 'Newsletter delivery is being prepared. The signup experience will go live in a later release.',
  placeholder: 'Enter your email address',
  ctaLabel: 'Join the Waitlist',
  statusLabel: 'Launching Soon',
}

export const SHOPFRONT_FOOTER_GROUPS: ShopfrontFooterGroup[] = [
  {
    title: 'About Us',
    links: [
      { label: 'Our Story', href: '/' },
      { label: 'New Arrivals', href: '/products' },
      { label: 'Organic Picks', href: '/search?q=organic' },
      { label: 'Accessibility', href: '/profile' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Contact Support', href: '/profile' },
      { label: 'Shipping Information', href: '/orders' },
      { label: 'Return & Refund Policy', href: '/orders' },
      { label: 'Payment Methods', href: '/checkout' },
    ],
  },
  {
    title: 'Shop by Category',
    links: [
      { label: 'Organic Produce', href: '/search?q=organic' },
      { label: 'Baby Care', href: '/search?q=baby' },
      { label: 'Gourmet Goods', href: '/search?q=gourmet' },
      { label: 'Bulk Orders', href: '/categories' },
    ],
  },
  {
    title: 'Support & Legal',
    links: [
      { label: 'FAQs', href: '/profile' },
      { label: 'Privacy Policy', href: '/profile' },
      { label: 'Terms of Service', href: '/profile' },
      { label: 'Cookie Policy', href: '/profile' },
    ],
  },
  {
    title: 'Get the App',
    links: [
      { label: 'Download on the App Store', href: '#', external: true },
      { label: 'Get it on Google Play', href: '#', external: true },
    ],
  },
]

export const SHOPFRONT_FOOTER_CONTACT = {
  brand: 'Grolin Grocery',
  tagline: 'Premium grocery commerce for households that care about quality, speed, and trust.',
  address: 'Kolkata, India',
  phone: '+91 98765 43210',
  email: 'support@grolin.com',
}

export const SHOPFRONT_PAYMENT_BADGES = [
  'Visa',
  'Mastercard',
  'UPI',
  'Google Pay',
  'Apple Pay',
  'Razorpay',
]

export const SHOPFRONT_TRUST_BADGES = [
  'Verified Secure',
  'Freshness Guaranteed',
  'Top-rated support',
]

export const SHOPFRONT_SOCIAL_LINKS: ShopfrontSocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/grolin' },
  { label: 'Facebook', href: 'https://facebook.com/grolin' },
  { label: 'Twitter', href: 'https://twitter.com/grolin' },
  { label: 'YouTube', href: 'https://youtube.com/@grolin' },
]

export const SHOPFRONT_APP_DOWNLOADS: ShopfrontAppDownload[] = [
  {
    label: 'App Store',
    caption: 'Download on the',
    href: '#',
  },
  {
    label: 'Google Play',
    caption: 'Get it on',
    href: '#',
  },
]