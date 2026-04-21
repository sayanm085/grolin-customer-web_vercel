'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void | Promise<void>
  variant?: 'default' | 'danger'
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'default',
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(250,248,245,0.99)_100%)] p-0 shadow-[var(--shop-shadow-level-3)] sm:max-w-[400px] sm:rounded-[32px]">
        <div className="p-7">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="pr-8 text-[18px] font-bold text-[color:var(--shop-ink)]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-[14px] leading-relaxed text-[color:var(--shop-ink-muted)]">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="border-t border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-7 py-4">
          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              type="button"
              className="h-11 rounded-[12px] border border-[color:var(--shop-border)] bg-white px-5 text-[color:var(--shop-ink)] hover:bg-[color:var(--shop-surface-subtle)]"
            >
              {cancelLabel}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              type="button"
              className={cn(
                'h-11 rounded-[12px] px-5 text-white',
                variant === 'danger'
                  ? 'bg-[color:var(--shop-danger)] hover:bg-[color:var(--shop-danger)]/90'
                  : 'bg-[color:var(--shop-action)] hover:bg-[color:var(--shop-action-hover)]',
              )}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : confirmLabel}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
