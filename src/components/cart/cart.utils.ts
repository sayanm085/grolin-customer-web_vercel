import { discountPercent, formatINR } from '@/lib/utils'
import type { CartItem } from '@/types/cart.types'

export function cartItemOriginalPrice(item: CartItem) {
    return item.originalPrice ?? item.price
}

export function cartItemUnitSavings(item: CartItem) {
    return Math.max(0, cartItemOriginalPrice(item) - item.price)
}

export function cartItemTotalSavings(item: CartItem) {
    return cartItemUnitSavings(item) * item.quantity
}

export function cartItemDiscountPercent(item: CartItem) {
    const originalPrice = cartItemOriginalPrice(item)
    if (originalPrice <= item.price) return 0
    return discountPercent(originalPrice, item.price)
}

export function cartSavings(items: CartItem[]) {
    return items.reduce((sum, item) => sum + cartItemTotalSavings(item), 0)
}

export function cartItemIsLowStock(item: CartItem) {
    return item.inStock && item.stockQuantity != null && item.stockQuantity <= 3
}

export function cartItemStockLabel(item: CartItem) {
    if (!item.inStock) return 'Out of stock'
    if (cartItemIsLowStock(item)) return `Only ${item.stockQuantity} left!`
    return 'In stock'
}

export function cartItemUnitPriceLabel(item: CartItem) {
    const unit = item.unit?.trim().toLowerCase()
    if (!unit) return null

    const formatted = formatINR(item.price)

    switch (unit) {
        case 'kg':
            return `${formatted}/kg`
        case 'g':
            return `${formatted}/500g`
        case 'l':
            return `${formatted}/L`
        case 'ml':
            return `${formatted}/500ml`
        case 'piece':
        case 'pc':
        case 'pcs':
            return `${formatted}/piece`
        case 'pack':
            return `${formatted}/pack`
        default:
            return null
    }
}
