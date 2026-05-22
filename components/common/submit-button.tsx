'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

type SubmitButtonProps = {
  children: React.ReactNode
  pendingLabel?: string
  className?: string
}

export function SubmitButton({
  children,
  pendingLabel = '처리 중...',
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </Button>
  )
}