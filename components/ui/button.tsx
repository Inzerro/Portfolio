import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent px-5 text-[11px] font-semibold tracking-[0.16em] uppercase font-sans leading-none outline-none transition-none touch-manipulation disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 data-[loading=true]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:bg-blue',
        secondary:
          'border-border bg-secondary text-foreground shadow-[var(--shadow-xs)] hover:border-primary/40 hover:bg-surface-2 hover:text-primary',
        ghost:
          'bg-transparent text-foreground shadow-none hover:bg-accent/80 hover:text-accent-foreground',
        danger:
          'bg-destructive text-destructive-foreground shadow-[var(--shadow-sm)] hover:bg-destructive/90 focus-visible:ring-destructive/30',

        // Legacy aliases kept to avoid breaking existing utility components.
        default:
          'bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:bg-blue',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[var(--shadow-sm)] hover:bg-destructive/90 focus-visible:ring-destructive/30',
        outline:
          'border-border bg-secondary text-foreground shadow-[var(--shadow-xs)] hover:border-primary/40 hover:bg-surface-2 hover:text-primary',
        link:
          'h-auto min-h-0 border-0 bg-transparent px-0 text-primary shadow-none hover:text-primary/80',
      },
      size: {
        default: 'h-12 min-h-12 px-6',
        sm: 'h-10 min-h-10 px-4 text-[10px]',
        lg: 'h-14 min-h-14 px-8 text-xs',
        icon: 'size-12 px-0',
        'icon-sm': 'size-10 px-0',
        'icon-lg': 'size-14 px-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    loadingText?: React.ReactNode
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-loading={loading ? 'true' : undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        aria-busy={loading || undefined}
        {...(!asChild ? { disabled: isDisabled } : {})}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="size-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-80"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4z"
              />
            </svg>
            {loadingText ?? children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
