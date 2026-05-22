type EmptyStateProps = {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-lg border p-12 text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  )
}
