'use client'

import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearchStore } from '@/store/search.store'
import { productsService } from '@/services/products.service'
import { SEARCH_DEBOUNCE_MS } from '@/lib/constants'
import type { Product } from '@/types/product.types'

function highlightMatch(text: string, query: string): ReactNode {
  const trimmed = query.trim()
  if (!trimmed) return text

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <mark key={index} className="bg-transparent font-semibold text-[color:var(--shop-primary)]">
          {part}
        </mark>
      )
    }
    return <span key={index}>{part}</span>
  })
}

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { recentSearches, addSearch, removeSearch } = useSearchStore()

  const doSearch = useCallback(async (value: string) => {
    if (value.trim().length < 1) {
      setResults([])
      setSuggestions([])
      return
    }

    setIsSearching(true)

    try {
      const response = await productsService.search(value, 1)
      setResults(response.products.slice(0, 6))
      setSuggestions(response.suggestions?.slice(0, 4) ?? [])
    } catch {
      setResults([])
      setSuggestions([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (query.trim().length < 1) {
      setResults([])
      setSuggestions([])
      return
    }

    const delay = query.trim().length === 1 ? 500 : SEARCH_DEBOUNCE_MS
    timerRef.current = setTimeout(() => doSearch(query), delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query, doSearch])

  useEffect(() => {
    setActiveIndex(-1)
  }, [results.length, query])

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [])

  const handleSubmit = (value: string) => {
    const trimmed = value.trim()
    if (trimmed.length < 2) return
    addSearch(trimmed)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    setIsOpen(false)
    setQuery('')
  }

  const navigableItems = [
    ...results.map((product) => ({ type: 'product' as const, value: product })),
    ...(results.length > 0 ? [{ type: 'see-all' as const, value: null }] : []),
    ...(recentSearches.length > 0 && !query
      ? recentSearches.map((entry) => ({ type: 'recent' as const, value: entry }))
      : []),
  ]
  const seeAllIndex = results.length
  const recentStartIndex = results.length + (results.length > 0 ? 1 : 0)

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div
        className={cn(
          'flex h-12 items-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-canvas)] shadow-[var(--shop-shadow-level-1)] transition-[border-color,box-shadow,background-color] duration-200',
          isOpen
            ? 'border-[color:var(--shop-primary)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-level-2)] ring-2 ring-[color:var(--shop-primary)] ring-offset-0 ring-opacity-20'
            : 'hover:border-[color:var(--shop-border-strong)]',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 px-5">
          <Search className="h-4 w-4 text-[color:var(--shop-ink-faint)]" />
          <input
            type="text"
            aria-label="Search products"
            placeholder="Search premium organic produce..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                if (activeIndex >= 0 && activeIndex < navigableItems.length) {
                  const item = navigableItems[activeIndex]
                  if (!item) {
                    handleSubmit(query)
                    return
                  }
                  if (item.type === 'product') {
                    const product = item.value as Product
                    addSearch(product.name)
                    router.push(`/products/${product.slug}`)
                    setIsOpen(false)
                    setQuery('')
                  } else if (item.type === 'see-all') {
                    handleSubmit(query)
                  } else if (item.type === 'recent') {
                    handleSubmit(item.value as string)
                  }
                } else {
                  handleSubmit(query)
                }
              } else if (event.key === 'ArrowDown') {
                if (navigableItems.length === 0) return
                event.preventDefault()
                setActiveIndex((prev) => (prev < navigableItems.length - 1 ? prev + 1 : 0))
              } else if (event.key === 'ArrowUp') {
                if (navigableItems.length === 0) return
                event.preventDefault()
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : navigableItems.length - 1))
              }
            }}
            className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-[color:var(--shop-ink)] placeholder:text-[color:var(--shop-ink-faint)] outline-none"
          />

          {query && !isSearching && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setResults([])
              }}
              className="rounded-full p-1 text-[color:var(--shop-ink-faint)] transition-colors hover:bg-[color:var(--shop-primary-soft)] hover:text-[color:var(--shop-primary)]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleSubmit(query)}
          className="hidden h-full min-w-[80px] items-center justify-center gap-2 rounded-r-full border-l border-[color:var(--shop-border)] bg-[color:var(--shop-accent)] px-4 text-[13px] font-bold text-white transition-opacity hover:bg-[color:var(--shop-accent-hover)] md:inline-flex"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => handleSubmit(query)}
          className="inline-flex h-full w-[52px] items-center justify-center rounded-r-full border-l border-[color:var(--shop-border)] bg-[color:var(--shop-accent)] text-white transition-colors hover:bg-[color:var(--shop-accent-hover)] md:hidden"
          aria-label="Submit search"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-[220] mt-2 max-h-[440px] overflow-y-auto rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] p-2 shadow-[var(--shop-shadow-level-2)] backdrop-blur-[20px]">
          {results.length > 0 && (
            <div className="p-1">
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">
                Products
              </p>

              {results.map((product, idx) => (
                <button
                  key={product.id}
                  onClick={() => {
                    addSearch(product.name)
                    router.push(`/products/${product.slug}`)
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-colors',
                    idx === activeIndex ? 'bg-[color:var(--shop-primary-soft)]' : 'hover:bg-[color:var(--shop-primary-soft)]',
                  )}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                    <Search className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate text-[14px] font-medium text-[color:var(--shop-ink)]">
                    {highlightMatch(product.name, query)}
                  </span>
                </button>
              ))}

              <button
                onClick={() => handleSubmit(query)}
                className={cn(
                  'mt-1 flex w-full items-center justify-center gap-2 rounded-[12px] border-t border-[color:var(--shop-border)] px-2 py-3 text-[13px] font-semibold text-[color:var(--shop-primary)] transition-colors',
                  activeIndex === seeAllIndex ? 'bg-[color:var(--shop-primary-soft)]' : 'hover:bg-[color:var(--shop-primary-soft)]',
                )}
              >
                <Search className="h-4 w-4" />
                See all results for &quot;{query}&quot;
              </button>
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <div className="p-1">
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">
                Recent
              </p>

              {recentSearches.map((entry, idx) => (
                <div key={entry} className="flex items-center gap-1">
                  <button
                    onClick={() => handleSubmit(entry)}
                    className={cn(
                      'flex flex-1 items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-colors',
                      recentStartIndex + idx === activeIndex ? 'bg-[color:var(--shop-primary-soft)]' : 'hover:bg-[color:var(--shop-primary-soft)]',
                    )}
                  >
                    <Clock className="h-4 w-4 text-[color:var(--shop-primary)]" />
                    <span className="truncate text-[14px] font-medium text-[color:var(--shop-ink)]">{entry}</span>
                  </button>
                  <button
                    onClick={() => removeSearch(entry)}
                    className="rounded-full p-1.5 text-[color:var(--shop-ink-faint)] transition-colors hover:bg-[color:var(--shop-surface-subtle)] hover:text-[color:var(--shop-ink)]"
                    aria-label={`Remove recent search ${entry}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {query.trim().length >= 1 && !isSearching && results.length === 0 && (
            <div className="p-2">
              <div className="rounded-[14px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-4 py-3 text-center shadow-[var(--shop-shadow-level-1)]">
                <p className="text-sm font-semibold text-[color:var(--shop-ink)]">
                  No products found for &quot;{query.trim()}&quot;
                </p>
                <p className="mt-1 text-xs text-[color:var(--shop-ink-muted)]">
                  Try a different spelling or browse suggestions below.
                </p>
              </div>

              {suggestions.length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">
                    You might like
                  </p>
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        addSearch(product.name)
                        router.push(`/products/${product.slug}`)
                        setIsOpen(false)
                        setQuery('')
                      }}
                      className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-colors hover:bg-[color:var(--shop-primary-soft)]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--shop-action-soft)] text-[color:var(--shop-action)]">
                        <Search className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate text-[14px] font-medium text-[color:var(--shop-ink)]">
                        {highlightMatch(product.name, query)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
