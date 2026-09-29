import { Braces, FileSpreadsheet, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ExportType = 'pdf' | 'csv' | 'geojson'

const CONFIG: Record<ExportType, { label: string; bg: string; icon: React.ReactNode }> = {
  pdf: {
    label: 'PDF',
    bg: 'bg-[#fbe3de]',
    icon: <FileText className="size-12 fill-alert text-white" strokeWidth={1.5} />,
  },
  csv: {
    label: 'CSV',
    bg: 'bg-[#e4efe3]',
    icon: <FileSpreadsheet className="size-12 fill-[#1f9d55] text-white" strokeWidth={1.5} />,
  },
  geojson: {
    label: 'GeoJSON',
    bg: 'bg-[#efe8da]',
    icon: <Braces className="size-11 text-foreground" strokeWidth={2} />,
  },
}

export function FileBadge({ type, className }: { type: ExportType; className?: string }) {
  const c = CONFIG[type]
  return (
    <span className={cn('flex flex-col items-center justify-center gap-3 rounded-2xl px-2 py-6', c.bg, className)}>
      {c.icon}
      <span className="text-lg font-semibold text-foreground">{c.label}</span>
    </span>
  )
}
