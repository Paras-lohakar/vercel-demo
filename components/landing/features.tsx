import Image from 'next/image'
import { ArrowRight, BarChart3, Clock, FileText, ImageIcon, Map, Search } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { FileBadge } from './file-badge'

function FeatureCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <article className="flex flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-[0_10px_30px_-18px_rgba(13,59,44,0.25)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(13,59,44,0.35)] md:p-7">
      <div className="flex items-center gap-5">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="size-8" />
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{description}</p>
    </article>
  )
}

function Tile({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <Image src={src || '/placeholder.svg'} alt={alt} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
    </div>
  )
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="topo-bg px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        id="features-title"
        eyebrow="Key Features"
        title={
          <>
            Powerful Capabilities <br className="hidden md:block" />
            for
          </>
        }
        highlight="Real-World Intelligence"
        description="Terrasphere combines advanced AI with satellite imagery to deliver faster, accurate and evidence-based insights."
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard icon={Search} title="Natural Language Search" description="Search satellite imagery using simple natural language.">
          <div className="relative">
            <Tile src="/images/sat-river.png" alt="Satellite view of a river through a town" className="aspect-[12/5]" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="flex items-start gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg">
                <Search className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <p className="text-sm leading-snug text-foreground">{'"Find new construction near this river"'}</p>
              </div>
            </div>
          </div>
        </FeatureCard>

        <FeatureCard icon={ImageIcon} title="Image-Based Search" description="Upload an image to find similar locations.">
          <div className="grid grid-cols-3 gap-2">
            <Tile src="/images/sat-airport.png" alt="Airstrip with parked aircraft" className="aspect-[3/4]" />
            <Tile src="/images/sat-facility.png" alt="Circular facility in forest" className="aspect-[3/4]" />
            <Tile src="/images/sat-port.png" alt="Naval dock with ship" className="aspect-[3/4]" />
          </div>
        </FeatureCard>

        <FeatureCard icon={Clock} title="Multi-Temporal Analysis" description="Compare images across different dates.">
          <div className="grid grid-cols-3 gap-2">
            {[
              { y: '2023', src: '/images/sat-before.png' },
              { y: '2024', src: '/images/sat-farmland.png' },
              { y: '2025', src: '/images/sat-after.png' },
            ].map((t) => (
              <figure key={t.y}>
                <Tile src={t.src} alt={`Satellite capture from ${t.y}`} className="aspect-square" />
                <figcaption className="mt-2 text-center text-lg font-bold">{t.y}</figcaption>
              </figure>
            ))}
          </div>
        </FeatureCard>

        <FeatureCard icon={BarChart3} title="Change Detection" description="Detect and highlight changes automatically.">
          <div className="flex items-center gap-3">
            <figure className="flex-1">
              <Tile src="/images/sat-before.png" alt="Area before change" className="aspect-[4/3]" />
              <figcaption className="mt-2 text-center font-semibold">Before</figcaption>
            </figure>
            <ArrowRight className="size-7 shrink-0 text-brand" aria-hidden="true" />
            <figure className="flex-1">
              <div className="relative">
                <Tile src="/images/sat-after.png" alt="Area after change with highlighted mask" className="aspect-[4/3]" />
                <svg viewBox="0 0 100 75" className="absolute inset-0 size-full" aria-hidden="true">
                  <polygon
                    points="20,60 35,40 55,30 80,8 88,20 70,45 45,62"
                    className="fill-alert/45 stroke-white"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                </svg>
              </div>
              <figcaption className="mt-2 text-center font-semibold">After</figcaption>
            </figure>
          </div>
        </FeatureCard>

        <FeatureCard icon={Map} title="Area of Interest (AOI)" description="Draw a region and analyze with custom filters.">
          <div className="relative">
            <Tile src="/images/sat-river.png" alt="Satellite map with an area of interest polygon" className="aspect-[16/7]" />
            <svg viewBox="0 0 160 70" className="absolute inset-0 size-full" aria-hidden="true">
              <polygon points="58,40 100,8 128,30 122,65 80,68" className="fill-alert/40 stroke-alert" strokeWidth="1.2" />
              {[
                [58, 40],
                [100, 8],
                [128, 30],
                [122, 65],
                [80, 68],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" className="fill-white stroke-alert" strokeWidth="1" />
              ))}
            </svg>
          </div>
        </FeatureCard>

        <FeatureCard icon={FileText} title="Evidence & Reports" description="Export analysis with full metadata and provenance.">
          <div className="grid grid-cols-3 gap-3">
            <FileBadge type="pdf" />
            <FileBadge type="csv" />
            <FileBadge type="geojson" />
          </div>
        </FeatureCard>
      </div>
    </section>
  )
}
