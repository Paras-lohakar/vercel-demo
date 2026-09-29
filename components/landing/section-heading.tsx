import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-brand/25 bg-brand-soft/50 px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  id,
}: {
  eyebrow: string
  title: React.ReactNode
  highlight: string
  description: string
  id: string
}) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        {title} <span className="text-primary">{highlight}</span>
      </h2>
      <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        {description}
      </p>
    </div>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={cn(
          'flex size-11 items-center justify-center rounded-full',
          light ? 'bg-white text-primary' : 'bg-primary text-primary-foreground',
        )}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3.5 9h17M3.5 15h17" />
        </svg>
      </span>
      <span className={cn('text-xl font-bold tracking-tight md:text-2xl', light ? 'text-white' : 'text-primary')}>
        TERRASPHERE
      </span>
    </span>
  )
}
