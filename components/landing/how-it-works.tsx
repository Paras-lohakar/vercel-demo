'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Box,
  Check,
  FileText,
  Layers,
  MapPin,
  PenLine,
  Search,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'
import { FileBadge, type ExportType } from './file-badge'
import { downloadReport, type Detection } from '@/lib/export-report'

function StepCard({
  n,
  title,
  description,
  children,
  className,
}: {
  n: number
  title: string
  description: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-3xl border border-border/60 bg-card p-5 shadow-[0_10px_30px_-18px_rgba(13,59,44,0.25)] md:p-6',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
          {n}
        </span>
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      </div>
      <div className="mt-5 flex-1">{children}</div>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>
    </article>
  )
}

function Pin({ tone = 'brand' }: { tone?: 'brand' | 'alert' }) {
  return (
    <span className="relative flex size-7 items-center justify-center">
      <span
        className={cn(
          'absolute inset-0 animate-scan-pulse rounded-full',
          tone === 'alert' ? 'bg-alert/40' : 'bg-white/50',
        )}
      />
      <span
        className={cn(
          'relative flex size-6 items-center justify-center rounded-full border-[3px] border-white',
          tone === 'alert' ? 'bg-alert' : 'bg-primary',
        )}
      >
        <span className="size-2 rounded-full bg-white" />
      </span>
    </span>
  )
}

const QUERY_CHIPS = ['New construction', 'Military activity', 'Change in land use']

function InputStep() {
  const [query, setQuery] = useState('Find new road near border')
  return (
    <StepCard n={1} title="Input & Query" description="Provide natural language query, image or select an area of interest.">
      <div className="grid grid-cols-[1fr_1.2fr] gap-3">
        <div className="relative aspect-[5/6] overflow-hidden rounded-xl">
          <Image src="/images/sat-river.png" alt="Selected area of interest" fill sizes="200px" className="object-cover" />
          <svg viewBox="0 0 100 120" className="absolute inset-0 size-full" aria-hidden="true">
            <polygon points="50,25 80,45 78,85 50,100 22,82 24,45" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1" />
          </svg>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Pin />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-start gap-2 rounded-xl bg-white p-3 shadow-sm">
            <Search className="mt-1 size-5 shrink-0" aria-hidden="true" />
            <span className="sr-only">Search query</span>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={2}
              className="w-full resize-none bg-transparent text-[15px] leading-snug outline-none"
            />
          </label>
          {QUERY_CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setQuery(`Find ${c.toLowerCase()} near border`)}
              className="w-fit rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-brand-soft"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </StepCard>
  )
}

const PROCESS_STEPS = [
  { icon: Settings, label: 'Preprocessing' },
  { icon: BarChart3, label: 'Multi-temporal Analysis' },
  { icon: Box, label: 'AI Models' },
]

function ProcessStep() {
  const [active, setActive] = useState(0)
  return (
    <StepCard
      n={2}
      title="Process & Analyze"
      description="Ingest, preprocess and analyze multi-temporal satellite data using advanced AI models."
    >
      <div className="grid grid-cols-[1.1fr_1fr] items-center gap-3">
        <div className="relative h-48 [perspective:700px]" aria-hidden="true">
          {['/images/sat-before.png', '/images/sat-farmland.png', '/images/sat-after.png', '/images/sat-river.png'].map((src, i) => (
            <div
              key={src}
              className={cn(
                'absolute left-1/2 h-28 w-28 overflow-hidden rounded-md shadow-xl ring-1 ring-black/20 transition-transform duration-500',
                i === 3 - active && 'ring-2 ring-brand',
              )}
              style={{
                top: `${60 - i * 22}px`,
                transform: `translateX(-50%) rotateX(58deg) rotateZ(45deg)`,
              }}
            >
              <Image src={src || '/placeholder.svg'} alt="" fill sizes="120px" className="object-cover" />
            </div>
          ))}
        </div>
        <ul className="flex flex-col gap-2">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left text-sm transition',
                  active === i ? 'bg-brand-soft ring-1 ring-brand/30' : 'bg-muted hover:bg-brand-soft/60',
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white">
                  <s.icon className="size-4 text-primary" aria-hidden="true" />
                </span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </StepCard>
  )
}

function DetectStep() {
  return (
    <StepCard n={3} title="Detect Changes" description="Identify and classify changes automatically.">
      <div className="grid grid-cols-2 gap-3">
        <figure>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src="/images/sat-before.png" alt="Area before" fill sizes="200px" className="object-cover" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Pin />
            </span>
          </div>
          <figcaption className="mt-2 text-center text-lg font-semibold">Before</figcaption>
        </figure>
        <figure>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src="/images/sat-after.png" alt="Area after with detected changes" fill sizes="200px" className="object-cover" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
              <path d="M50 50 L10 20 M50 50 L90 15 M50 50 L85 90 M50 50 L15 85 M50 50 L55 5" className="stroke-alert" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="50" r="16" className="fill-alert/35" />
            </svg>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Pin tone="alert" />
            </span>
          </div>
          <figcaption className="mt-2 text-center text-lg font-semibold">After</figcaption>
        </figure>
      </div>
    </StepCard>
  )
}

const LAYERS = ['Change Mask', 'Buildings', 'Roads', 'Water Bodies', 'AOI'] as const
type LayerName = (typeof LAYERS)[number]
const YEARS = [2022, 2023, 2024, 2025, 2026]

function ResultsStep() {
  const [layers, setLayers] = useState<Record<LayerName, boolean>>({
    'Change Mask': true,
    Buildings: false,
    Roads: false,
    'Water Bodies': false,
    AOI: true,
  })
  const [yearIndex, setYearIndex] = useState(2)
  const [search, setSearch] = useState('')
  const maskOpacity = yearIndex === 0 ? 0 : yearIndex / (YEARS.length - 1)

  return (
    <StepCard n={4} title="View Results" description="Visualize results on an interactive map with timeline and filters.">
      <div className="relative aspect-[16/8] overflow-hidden rounded-xl ring-2 ring-foreground/80">
        <Image src="/images/sat-river.png" alt="Interactive results map" fill sizes="(min-width:1024px) 35vw, 90vw" className="object-cover" />

        <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
          {layers['Water Bodies'] && <path d="M0 70 C40 55 70 85 110 70 S170 30 200 40 L200 55 C170 45 140 85 110 85 S40 70 0 85Z" className="fill-sky-400/50" />}
          {layers.Roads && (
            <path d="M0 30 L200 60 M60 0 L90 100 M140 0 L120 100" className="stroke-amber-300" strokeWidth="1.5" fill="none" />
          )}
          {layers.Buildings &&
            [
              [70, 35],
              [85, 45],
              [100, 30],
              [115, 55],
              [60, 55],
              [130, 40],
            ].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="6" height="5" className="fill-yellow-200/80 stroke-yellow-600" strokeWidth="0.5" />)}
          {layers['Change Mask'] && (
            <polygon
              points="55,40 90,22 120,48 90,72"
              className="fill-alert transition-opacity"
              style={{ opacity: 0.5 * maskOpacity }}
            />
          )}
          {layers.AOI && (
            <>
              <polygon points="55,40 90,22 120,48 90,72" fill="none" className="stroke-alert" strokeWidth="1" />
              {[
                [55, 40],
                [90, 22],
                [120, 48],
                [90, 72],
              ].map(([x, y]) => (
                <circle key={`${x}${y}`} cx={x} cy={y} r="2" className="fill-white stroke-alert" strokeWidth="0.8" />
              ))}
            </>
          )}
        </svg>

        <div className="absolute left-2 top-2 flex flex-col gap-1 rounded-lg bg-white/95 p-1 shadow">
          {[Layers, FileText, MapPin, PenLine].map((Icon, i) => (
            <span key={i} className="flex size-6 items-center justify-center" aria-hidden="true">
              <Icon className="size-3.5" />
            </span>
          ))}
        </div>
        <label className="absolute left-11 top-2 flex w-[38%] items-center gap-1 rounded-md bg-white/95 px-2 py-1 shadow">
          <span className="sr-only">Search location</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search location..."
            className="w-full bg-transparent text-[10px] outline-none placeholder:text-muted-foreground"
          />
          <Search className="size-3 shrink-0" aria-hidden="true" />
        </label>

        <fieldset className="absolute right-2 top-2 w-[30%] rounded-lg bg-white/95 p-2 shadow">
          <legend className="sr-only">Map layers</legend>
          <p className="mb-1 text-[10px] font-semibold" aria-hidden="true">
            Layers
          </p>
          {LAYERS.map((l) => (
            <label key={l} className="flex cursor-pointer items-center gap-1.5 py-0.5 text-[9px] sm:text-[10px]">
              <input
                type="checkbox"
                checked={layers[l]}
                onChange={() => setLayers((prev) => ({ ...prev, [l]: !prev[l] }))}
                className={cn('size-3', l === 'AOI' ? 'accent-alert' : 'accent-brand')}
              />
              {l === 'Change Mask' && <span className="size-1.5 bg-alert" aria-hidden="true" />}
              {l}
            </label>
          ))}
        </fieldset>

        <div className="absolute inset-x-3 bottom-1.5 w-[70%]">
          <label className="sr-only" htmlFor="timeline">
            Timeline year
          </label>
          <input
            id="timeline"
            type="range"
            min={0}
            max={YEARS.length - 1}
            value={yearIndex}
            onChange={(e) => setYearIndex(Number(e.target.value))}
            aria-valuetext={String(YEARS[yearIndex])}
            className="h-1 w-full cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[9px] font-semibold text-white drop-shadow sm:text-[10px]">
            {YEARS.map((y, i) => (
              <span key={y} className={i === yearIndex ? 'text-emerald-300' : ''}>
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>
    </StepCard>
  )
}

const INITIAL_DETECTIONS: Detection[] = [
  {
    id: 'CHG-001',
    label: 'New Construction',
    status: 'pending',
    confidence: 0.92,
    coordinates: [
      [77.2012, 28.6121],
      [77.2051, 28.6139],
      [77.2066, 28.6102],
      [77.2021, 28.6089],
    ],
  },
  {
    id: 'CHG-002',
    label: 'False Alarm (Seasonal Change)',
    status: 'pending',
    confidence: 0.41,
    coordinates: [
      [77.2102, 28.6201],
      [77.2131, 28.6219],
      [77.2144, 28.6192],
      [77.2111, 28.6181],
    ],
  },
]

function VerifyStep({
  detections,
  setStatus,
}: {
  detections: Detection[]
  setStatus: (id: string, status: Detection['status']) => void
}) {
  const images = ['/images/sat-after.png', '/images/sat-before.png']
  return (
    <StepCard n={5} title="Verify & Refine" description="Analyst verification and feedback for improved results.">
      <ul className="flex flex-col gap-3">
        {detections.map((d, i) => {
          const isFirst = i === 0
          return (
            <li key={d.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-border/60">
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-md text-white transition',
                  d.status === 'confirmed' && 'bg-[#1f9d55]',
                  d.status === 'rejected' && 'bg-alert',
                  d.status === 'pending' && 'bg-muted text-muted-foreground',
                )}
                aria-label={`Status: ${d.status}`}
              >
                {d.status === 'rejected' ? <X className="size-4" /> : <Check className="size-4" />}
              </span>
              <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
                <Image src={images[i] || '/placeholder.svg'} alt="" fill sizes="64px" className="object-cover" />
                <span className="absolute inset-3 rounded-sm bg-alert/45 ring-1 ring-alert" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">{d.label}</p>
                <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-muted" aria-hidden="true" />
                <span className="mt-1.5 block h-1.5 w-full rounded-full bg-muted" aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={() => setStatus(d.id, isFirst ? 'confirmed' : 'rejected')}
                className={cn(
                  'shrink-0 self-start rounded-full px-3 py-1 text-xs font-medium transition',
                  isFirst ? 'bg-[#d6f0dd] text-[#14532d] hover:bg-[#bfe6c9]' : 'bg-[#fbe0dc] text-[#7f1d1d] hover:bg-[#f7cbc4]',
                )}
              >
                {isFirst ? (d.status === 'confirmed' ? 'Confirmed' : 'Confirm') : d.status === 'rejected' ? 'Rejected' : 'Reject'}
              </button>
            </li>
          )
        })}
      </ul>
    </StepCard>
  )
}

function ExportStep({ detections }: { detections: Detection[] }) {
  const [last, setLast] = useState<ExportType | null>(null)
  const types: ExportType[] = ['pdf', 'csv', 'geojson']
  return (
    <StepCard n={6} title="Export & Report" description="Generate reports with evidence, metadata and provenance.">
      <div className="grid grid-cols-3 gap-3">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              downloadReport(t, detections)
              setLast(t)
            }}
            className="rounded-2xl transition hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Download ${t.toUpperCase()} report`}
          >
            <FileBadge type={t} className="py-8" />
          </button>
        ))}
      </div>
      <p className="mt-3 h-5 text-sm text-brand" role="status">
        {last ? `Downloaded terrasphere-report.${last}` : ''}
      </p>
    </StepCard>
  )
}

function FlowArrow({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center justify-center text-primary', className)} aria-hidden="true">
      <ArrowRight className="hidden size-7 lg:block" strokeWidth={2.5} />
      <ArrowDown className="size-7 lg:hidden" strokeWidth={2.5} />
    </span>
  )
}

export function HowItWorks() {
  const [detections, setDetections] = useState(INITIAL_DETECTIONS)
  const setStatus = (id: string, status: Detection['status']) =>
    setDetections((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)))

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="topo-bg px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        id="how-title"
        eyebrow="How It Works"
        title="From Satellite Data to"
        highlight="Actionable Insights"
        description="A simple and powerful workflow designed for defense analysts."
      />

      <div className="mx-auto mt-14 max-w-7xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <InputStep />
          <FlowArrow />
          <ProcessStep />
          <FlowArrow />
          <DetectStep />
        </div>

        <div className="relative hidden h-16 lg:block" aria-hidden="true">
          <div className="absolute left-[15%] right-[2%] top-1/2 h-0.5 bg-primary" />
          <div className="absolute right-[2%] top-0 h-1/2 w-0.5 bg-primary" />
          <ArrowDown className="absolute left-[15%] top-1/2 size-7 -translate-x-1/2 text-primary" strokeWidth={2.5} />
          <ArrowDown className="absolute left-[85%] top-1/2 size-7 -translate-x-1/2 text-primary" strokeWidth={2.5} />
        </div>
        <FlowArrow className="my-3 lg:hidden" />

        <div className="grid gap-3 lg:grid-cols-[1.25fr_auto_1fr_auto_0.95fr]">
          <ResultsStep />
          <FlowArrow />
          <VerifyStep detections={detections} setStatus={setStatus} />
          <FlowArrow />
          <ExportStep detections={detections} />
        </div>
      </div>
    </section>
  )
}
