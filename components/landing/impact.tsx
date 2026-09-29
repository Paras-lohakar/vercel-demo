import { Leaf, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const ITEMS = [
  {
    icon: ShieldCheck,
    title: 'National Security',
    text: 'Faster and more accurate situational awareness.',
    ring: 'bg-[#e1efe5]',
    circle: 'bg-primary text-white',
    bar: 'bg-primary',
  },
  {
    icon: TrendingUp,
    title: 'Economic Benefit',
    text: 'Efficient resource planning and infrastructure monitoring.',
    ring: 'bg-[#fbe7d6]',
    circle: 'bg-[#f6c79c] text-[#b4480f]',
    bar: 'bg-warm',
  },
  {
    icon: Leaf,
    title: 'Environmental Monitoring',
    text: 'Support for disaster management and natural resource protection.',
    ring: 'bg-[#e1efe5]',
    circle: 'bg-[#8fd6a4] text-primary',
    bar: 'bg-brand',
  },
  {
    icon: Users,
    title: 'Governance Support',
    text: 'Evidence-based decision making for multiple government agencies.',
    ring: 'bg-[#fbe7d6]',
    circle: 'bg-[#f6c79c] text-[#a3400c]',
    bar: 'bg-[#b4480f]',
  },
]

export function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="topo-bg px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        id="impact-title"
        eyebrow="Impact & Benefits"
        title="Stronger Security,"
        highlight="Better Decision-Making"
        description="Terrasphere enables government and defense agencies to act faster with accurate, evidence-based geospatial intelligence."
      />
      <ul className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <li
            key={item.title}
            className="flex flex-col items-center rounded-3xl border border-border/60 bg-card px-6 pb-8 pt-6 text-center shadow-[0_10px_30px_-18px_rgba(13,59,44,0.25)] transition hover:-translate-y-1"
          >
            <span className={cn('flex size-36 items-center justify-center rounded-full', item.ring)}>
              <span className={cn('flex size-26 items-center justify-center rounded-full', item.circle)}>
                <item.icon className="size-12" strokeWidth={2} aria-hidden="true" />
              </span>
            </span>
            <h3 className="mt-6 text-balance text-2xl font-bold tracking-tight">{item.title}</h3>
            <p className="mt-3 flex-1 text-pretty text-lg leading-relaxed text-muted-foreground">{item.text}</p>
            <span className={cn('mt-8 h-1 w-10 rounded-full', item.bar)} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  )
}
