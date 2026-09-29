import Image from 'next/image'
import {
  Archive,
  ArrowRight,
  BarChart3,
  Box,
  Brain,
  Crosshair,
  Database,
  FileText,
  FolderOpen,
  ImageIcon,
  Images,
  Layers,
  MessageSquareText,
  Monitor,
  Network,
  Satellite,
  Server,
  Settings,
  ShieldCheck,
  UserCog,
  Workflow,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const SOURCES = [
  { name: 'Sentinel-1', type: '(SAR)', src: '/images/sat-coast.png' },
  { name: 'Sentinel-2', type: '(Optical)', src: '/images/sat-river.png' },
  { name: 'Landsat', type: '(Optical)', src: '/images/sat-farmland.png' },
  { name: 'Bhuvan / ISRO', type: '(Multi-sensor)', src: '/images/sat-after.png' },
]

const ON_PREM = [
  { icon: Server, name: 'Local Server', sub: 'CPU / GPU', color: 'text-[#4f46e5]' },
  { icon: Network, name: 'Local Models', sub: '(Pretrained)', color: 'text-[#7c3aed]' },
  { icon: Database, name: 'PostgreSQL', sub: '+ PostGIS', color: 'text-[#2563eb]' },
  { icon: Workflow, name: 'FAISS', sub: '(Vector DB)', color: 'text-[#2563eb]' },
  { icon: FolderOpen, name: 'Local Storage', sub: '(GeoTIFF / COG)', color: 'text-[#4338ca]' },
]

type Tone = 'green' | 'orange' | 'blue' | 'teal' | 'purple' | 'red' | 'amber'

const TONES: Record<Tone, { card: string; icon: string; title: string }> = {
  green: { card: 'bg-[#e6f2e6] border-[#c7e2c9]', icon: 'bg-[#1f7a4a]', title: 'text-foreground' },
  orange: { card: 'bg-[#fbeedd] border-[#f3d6b0]', icon: 'bg-[#e0782a]', title: 'text-[#8a3b0c]' },
  blue: { card: 'bg-[#e3eefb] border-[#c6dbf3]', icon: 'bg-[#2563eb]', title: 'text-[#1e3a8a]' },
  teal: { card: 'bg-[#e6f2ea] border-[#c7e2cf]', icon: 'bg-[#166a48]', title: 'text-foreground' },
  purple: { card: 'bg-[#efe6fb] border-[#dccaf3]', icon: 'bg-[#7c3aed]', title: 'text-[#4c1d95]' },
  red: { card: 'bg-[#fbe4e2] border-[#f3c6c2]', icon: 'bg-[#e0413a]', title: 'text-[#8a1c16]' },
  amber: { card: 'bg-[#fbf1dc] border-[#f1ddb0]', icon: 'bg-[#e6a420]', title: 'text-[#7a4a06]' },
}

const PIPELINE: { icon: React.ComponentType<{ className?: string }>; title: string; tone: Tone; items: string[] }[] = [
  { icon: Database, title: 'Ingestion & Cataloging', tone: 'green', items: ['Load satellite imagery', 'Metadata extraction', 'STAC catalog (optional)'] },
  {
    icon: Settings,
    title: 'Preprocessing & Quality Control',
    tone: 'orange',
    items: ['Cloud / haze masking', 'Co-registration', 'Radiometric normalization', 'Tiling and quality filtering'],
  },
  { icon: Brain, title: 'Semantic Discovery', tone: 'blue', items: ['Image / text embeddings', 'Vision-Language models', 'Similarity search'] },
  { icon: BarChart3, title: 'Multi-Temporal Analysis', tone: 'teal', items: ['Time-series comparison', 'Change trend analysis', 'Temporal consistency'] },
  { icon: ImageIcon, title: 'Change Detection', tone: 'purple', items: ['Bi-temporal models', 'Change mask generation', 'Change classification'] },
  {
    icon: Crosshair,
    title: 'Change Detection (Chase)',
    tone: 'red',
    items: ['Refine change results', 'Remove noise (cloud, shadow, seasonality)', 'Reduce false alarms'],
  },
  { icon: ShieldCheck, title: 'False-Alarm Suppression', tone: 'amber', items: ['Quality checks', 'Scene validation', 'Confidence scoring'] },
]

const OUTPUTS: typeof PIPELINE = [
  {
    icon: FileText,
    title: 'Evidence & Knowledge (OKF)',
    tone: 'purple',
    items: ['Before / After images', 'Change maps', 'Metadata & provenance', 'Knowledge base'],
  },
  {
    icon: MessageSquareText,
    title: 'Local RAG + Explanation',
    tone: 'blue',
    items: ['Retrieve relevant evidence', 'Local LLM (offline)', 'Explain changes with supported sources'],
  },
  { icon: Monitor, title: 'Analyst Dashboard', tone: 'teal', items: ['Interactive map', 'Results, timeline & filters', 'Before / after view', 'AOI analysis'] },
  { icon: UserCog, title: 'Verification & Feedback', tone: 'red', items: ['Confirm / reject changes', 'Add feedback', 'Improve model results'] },
  { icon: FileText, title: 'Export & Reporting', tone: 'green', items: ['PDF report', 'CSV data', 'GeoJSON', 'Full metadata & provenance'] },
]

const INCREMENTAL = [
  { icon: Images, label: 'New Images (New Scene)' },
  { icon: Settings, label: 'Preprocess' },
  { icon: Box, label: 'Generate Embeddings' },
  { icon: Database, label: 'Update Index' },
  { icon: Archive, label: 'Archive + New Data' },
]

function StageCard({ stage }: { stage: (typeof PIPELINE)[number] }) {
  const t = TONES[stage.tone]
  return (
    <article className={cn('flex h-full flex-col rounded-2xl border', t.card)}>
      <div className="flex items-center gap-3 p-3">
        <span className={cn('flex size-11 shrink-0 items-center justify-center rounded-full text-white', t.icon)}>
          <stage.icon className="size-5" />
        </span>
        <h3 className={cn('text-[15px] font-semibold leading-tight', t.title)}>{stage.title}</h3>
      </div>
      <ul className="flex-1 space-y-0.5 rounded-b-2xl bg-white/50 px-4 py-3 text-[13px] text-foreground/85">
        {stage.items.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden="true">•</span>
            {i}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Architecture() {
  return (
    <section id="architecture" aria-labelledby="arch-title" className="topo-bg px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        id="arch-title"
        eyebrow="System Architecture"
        title="Complete End-to-End"
        highlight="Architecture"
        description="Offline, on-premises system designed for secure and reliable deployment."
      />

      <div className="mx-auto mt-14 max-w-7xl space-y-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#b9d0f3] bg-[#e5eefc] shadow-sm">
            <h3 className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-[#1e3a8a]">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#2046b8] text-white">
                <Satellite className="size-5" aria-hidden="true" />
              </span>
              Satellite Data Sources
            </h3>
            <ul className="grid grid-cols-2 gap-3 rounded-b-2xl bg-white/50 p-3 sm:grid-cols-4">
              {SOURCES.map((s) => (
                <li key={s.name} className="text-center">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image src={s.src || '/placeholder.svg'} alt={`${s.name} imagery sample`} fill sizes="160px" className="object-cover" />
                  </div>
                  <p className="mt-2 text-sm font-semibold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.type}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#f3bfc0] bg-[#fbe2e3] shadow-sm">
            <h3 className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-[#9b1c1c]">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#d93b3b] text-white">
                <Layers className="size-5" aria-hidden="true" />
              </span>
              Offline / On-Premises Environment
            </h3>
            <ul className="grid grid-cols-2 gap-2 rounded-b-2xl bg-white/50 p-3 sm:grid-cols-5">
              {ON_PREM.map((o) => (
                <li key={o.name} className="flex flex-col items-center rounded-lg bg-white/60 px-2 py-4 text-center">
                  <o.icon className={cn('size-12', o.color)} aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold">{o.name}</p>
                  <p className="text-sm text-muted-foreground">{o.sub}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {PIPELINE.map((stage) => (
            <li key={stage.title}>
              <StageCard stage={stage} />
            </li>
          ))}
        </ol>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {OUTPUTS.map((stage) => (
            <li key={stage.title}>
              <StageCard stage={stage} />
            </li>
          ))}
        </ol>

        <div className="overflow-hidden rounded-2xl border-2 border-primary bg-[#e3f0e5]">
          <h3 className="flex items-center justify-center gap-3 bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
            <Database className="size-5" aria-hidden="true" />
            Incremental Ingestion (Scalable)
          </h3>
          <ol className="flex flex-col items-stretch gap-2 p-4 md:flex-row md:items-center">
            {INCREMENTAL.map((s, i) => (
              <li key={s.label} className="flex flex-1 items-center gap-2">
                <span className="flex flex-1 items-center gap-4 rounded-xl bg-white/70 px-4 py-3">
                  <s.icon className="size-8 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[15px] font-medium">{s.label}</span>
                </span>
                {i < INCREMENTAL.length - 1 && <ArrowRight className="hidden size-5 shrink-0 text-primary md:block" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
