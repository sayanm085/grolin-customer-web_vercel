'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Loader2, Plus, Truck } from 'lucide-react'
import { QUERY_KEYS } from '@/lib/constants'
import { addressesService } from '@/services/addresses.service'
import { AddressForm } from '@/components/profile/AddressForm'
import type { Address, CreateAddressPayload } from '@/types/address.types'
import { AddressCard } from './AddressCard'

interface AddressStepProps {
    selectedId: string | null
    onSelect: (addr: Address) => void
}

export function AddressStep({ selectedId, onSelect }: AddressStepProps) {
    const qc = useQueryClient()
    const [showForm, setShowForm] = useState(false)

    const { data: addresses = [], isLoading } = useQuery({
        queryKey: QUERY_KEYS.addresses,
        queryFn: () => addressesService.getAll(),
    })

    const createAddress = useMutation({
        mutationFn: (payload: CreateAddressPayload) => addressesService.create(payload),
        onSuccess: (address) => {
            void qc.invalidateQueries({ queryKey: QUERY_KEYS.addresses })
            onSelect(address)
            setShowForm(false)
        },
    })

    useEffect(() => {
        if (selectedId || addresses.length === 0) return
        onSelect(addresses[0]!)
    }, [addresses, onSelect, selectedId])

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2].map((item) => (
                    <div
                        key={item}
                        className="rounded-[22px] bg-[color:var(--shop-surface-elevated)] p-5 shadow-[var(--shop-shadow-level-2)]"
                    >
                        <div className="skeleton-shimmer h-4 w-24 rounded-full" />
                        <div className="mt-4 skeleton-shimmer h-4 w-3/4 rounded-full" />
                        <div className="mt-2 skeleton-shimmer h-3 w-1/2 rounded-full" />
                    </div>
                ))}
            </div>
        )
    }

    if (addresses.length === 0 || showForm) {
        return (
            <div className="rounded-[22px] bg-[color:var(--shop-surface-subtle)] p-4 shadow-[var(--shop-shadow-level-1)] sm:p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Add delivery address</p>
                        <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">
                            Save an address once and use it for future orders.
                        </p>
                    </div>

                    {addresses.length > 0 && (
                        <button
                            onClick={() => setShowForm(false)}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-white px-4 text-sm font-medium text-[color:var(--shop-ink-muted)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                            type="button"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </button>
                    )}
                </div>

                <AddressForm
                    onSubmit={async (payload) => {
                        await createAddress.mutateAsync(payload)
                    }}
                    isSubmitting={createAddress.isPending}
                    submitLabel="Save Address"
                />

                {createAddress.isPending && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-[color:var(--shop-ink-muted)]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving your address...
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Select delivery address</p>
                    <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">
                        Choose where you want this order delivered.
                    </p>
                </div>
                <span className="rounded-full bg-[color:var(--shop-primary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--shop-primary)]">
                    {addresses.length} saved
                </span>
            </div>

            {addresses.map((address) => {
                const isSelected = address.id === selectedId

                return (
                    <div key={address.id} className="space-y-2">
                        <AddressCard
                            address={address}
                            selected={isSelected}
                            onSelect={() => onSelect(address)}
                        />
                        {isSelected && (
                            <div className="flex items-center gap-2 pl-3 text-[13px] font-medium text-[color:var(--shop-trust)]">
                                <Truck className="h-4 w-4" strokeWidth={1.8} />
                                Delivers in ~30 min
                            </div>
                        )}
                    </div>
                )
            })}

            <button
                onClick={() => setShowForm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-[22px] border-2 border-dashed border-[color:var(--shop-primary)] bg-white py-5 text-sm font-semibold text-[color:var(--shop-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--shop-primary-soft)] hover:shadow-[var(--shop-shadow-level-1)]"
                type="button"
            >
                <Plus className="h-4 w-4" /> Add New Delivery Address
            </button>
        </div>
    )
}