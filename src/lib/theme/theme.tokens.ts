import type { ShopThemeConfig } from './theme.types'

export const DEFAULT_PREMIUM_THEME: ShopThemeConfig = {
  key: 'default-premium',
  label: 'Default Premium',
  mode: 'light',
  colors: {
    canvas: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    ink: '#1A232B',
    inkMuted: '#56606B',
    border: '#DEDDE6',
    primary: '#6E49D8',
    primaryHover: '#5E3DC8',
    accent: '#E3B93C',
    success: '#16945E',
    warning: '#D9911D',
    danger: '#DC2626',
  },
  gradients: {
    pageBackground: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
    heroSurface: 'linear-gradient(135deg, #6E49D8 0%, #7C3AED 45%, #16945E 100%)',
    promoSurface: 'linear-gradient(135deg, #F8F6FF 0%, #F0FDF4 100%)',
    footerSurface: 'linear-gradient(135deg, #1A0E3D 0%, #950EDB 55%, #1A232B 100%)',
  },
  chrome: {
    headerSurface: '#FFFFFF',
    sidebarSurface: 'linear-gradient(180deg, rgba(255, 252, 250, 0.96) 0%, rgba(243, 240, 255, 0.88) 100%)',
    cardRadius: '22px',
    shadowSoft: '0 4px 16px rgba(26, 35, 43, 0.08), 0 2px 6px rgba(26, 35, 43, 0.05)',
    shadowStrong: '0 8px 32px rgba(110, 73, 216, 0.12), 0 2px 8px rgba(110, 73, 216, 0.06)',
  },
  seasonal: {
    badgeText: 'Curated premium',
    heroSparkles: false,
    promoRibbon: false,
    accentWash: 'rgba(110, 73, 216, 0.08)',
  },
  commerce: {
    discount: '#C2410C',
    deal: '#D9911D',
    freeDelivery: '#16945E',
    trust: '#1D6FB8',
  },
  imagery: {
    heroOverlayOpacity: '0.24',
    fallbackTint: '#F4EEF9',
    promoBannerTreatment: 'soft',
  },
}

export const WINTER_THEME: ShopThemeConfig = {
  ...DEFAULT_PREMIUM_THEME,
  key: 'winter',
  label: 'Winter',
  colors: {
    ...DEFAULT_PREMIUM_THEME.colors,
    canvas: '#E7EDF3',
    surface: 'rgba(252, 254, 255, 0.90)',
    ink: '#15202B',
    inkMuted: '#5E6C79',
    primary: '#0F766E',
    primaryHover: '#115E59',
    accent: '#2563EB',
  },
  gradients: {
    pageBackground:
      'radial-gradient(circle at top left, rgba(255,255,255,0.92), transparent 30%), linear-gradient(180deg, rgba(240,245,250,0.96) 0%, rgba(228,236,244,0.94) 100%)',
    heroSurface: 'linear-gradient(135deg, rgba(20,83,105,0.94) 0%, rgba(15,118,110,0.88) 100%)',
    promoSurface: 'linear-gradient(135deg, rgba(240,249,255,0.96) 0%, rgba(224,242,254,0.92) 100%)',
    footerSurface: 'linear-gradient(135deg, rgba(16,37,49,0.99) 0%, rgba(11,27,38,0.99) 100%)',
  },
  seasonal: {
    badgeText: 'Winter edit',
    heroSparkles: true,
    promoRibbon: true,
    accentWash: 'rgba(14, 116, 144, 0.06)',
  },
  commerce: {
    ...DEFAULT_PREMIUM_THEME.commerce,
    trust: '#1D6FB8',
  },
  imagery: {
    heroOverlayOpacity: '0.26',
    fallbackTint: '#E4EEF6',
    promoBannerTreatment: 'crisp',
  },
}

export const FESTIVAL_THEME: ShopThemeConfig = {
  ...DEFAULT_PREMIUM_THEME,
  key: 'festival',
  label: 'Festival',
  colors: {
    ...DEFAULT_PREMIUM_THEME.colors,
    canvas: '#F2E7DC',
    surface: 'rgba(255, 249, 243, 0.92)',
    ink: '#1F1B18',
    inkMuted: '#6B625C',
    primary: '#9A3412',
    primaryHover: '#7C2D12',
    accent: '#B45309',
  },
  gradients: {
    pageBackground:
      'radial-gradient(circle at top left, rgba(255,247,239,0.92), transparent 28%), linear-gradient(180deg, rgba(249,241,232,0.98) 0%, rgba(239,226,212,0.94) 100%)',
    heroSurface: 'linear-gradient(135deg, rgba(154,52,18,0.92) 0%, rgba(180,83,9,0.88) 100%)',
    promoSurface: 'linear-gradient(135deg, rgba(255,251,235,0.98) 0%, rgba(254,243,199,0.92) 100%)',
    footerSurface: 'linear-gradient(135deg, rgba(54,23,14,0.98) 0%, rgba(29,17,12,0.99) 100%)',
  },
  seasonal: {
    badgeText: 'Festival picks',
    heroSparkles: true,
    promoRibbon: true,
    accentWash: 'rgba(180, 83, 9, 0.08)',
  },
  commerce: {
    ...DEFAULT_PREMIUM_THEME.commerce,
    discount: '#C2410C',
    deal: '#EA580C',
    freeDelivery: '#15803D',
    trust: '#1D6FB8',
  },
  imagery: {
    heroOverlayOpacity: '0.18',
    fallbackTint: '#F5E4D1',
    promoBannerTreatment: 'warm',
  },
}
