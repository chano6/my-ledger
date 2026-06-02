'use client'

import { useTheme } from 'next-themes'
import { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      duration={3500}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-fg group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-fg-muted',
          actionButton:
            'group-[.toast]:bg-peach-deep group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-bg-sunken group-[.toast]:text-fg-muted',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
