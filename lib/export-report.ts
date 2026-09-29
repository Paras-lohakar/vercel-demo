import type { ExportType } from '@/components/landing/file-badge'

export type Detection = {
  id: string
  label: string
  status: 'confirmed' | 'rejected' | 'pending'
  confidence: number
  coordinates: [number, number][]
}

function buildPdf(lines: string[]) {
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
  const text = lines
    .map((l, i) => `BT /F1 ${i === 0 ? 18 : 11} Tf 60 ${760 - i * 22} Td (${escape(l)}) Tj ET`)
    .join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]
  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []
  objects.forEach((obj, i) => {
    offsets.push(pdf.length)
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
  })
  const xref = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  offsets.forEach((o) => {
    pdf += `${String(o).padStart(10, '0')} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return pdf
}

export function downloadReport(type: ExportType, detections: Detection[]) {
  const generated = new Date().toISOString()
  let content: string
  let mime: string

  if (type === 'csv') {
    const rows = [
      ['id', 'label', 'status', 'confidence', 'centroid_lon', 'centroid_lat', 'generated_at'],
      ...detections.map((d) => {
        const lon = d.coordinates.reduce((s, c) => s + c[0], 0) / d.coordinates.length
        const lat = d.coordinates.reduce((s, c) => s + c[1], 0) / d.coordinates.length
        return [d.id, d.label, d.status, d.confidence.toFixed(2), lon.toFixed(5), lat.toFixed(5), generated]
      }),
    ]
    content = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    mime = 'text/csv'
  } else if (type === 'geojson') {
    content = JSON.stringify(
      {
        type: 'FeatureCollection',
        metadata: { source: 'Terrasphere', generated, provenance: 'Sentinel-2 L2A, bi-temporal change model v2' },
        features: detections.map((d) => ({
          type: 'Feature',
          properties: { id: d.id, label: d.label, status: d.status, confidence: d.confidence },
          geometry: { type: 'Polygon', coordinates: [[...d.coordinates, d.coordinates[0]]] },
        })),
      },
      null,
      2,
    )
    mime = 'application/geo+json'
  } else {
    content = buildPdf([
      'Terrasphere Change Detection Report',
      `Generated: ${generated}`,
      'Source: Sentinel-2 L2A  |  Model: bi-temporal change v2',
      '',
      ...detections.map((d) => `${d.id}  ${d.label}  -  ${d.status.toUpperCase()}  (confidence ${(d.confidence * 100).toFixed(0)}%)`),
      '',
      'Provenance: all evidence retrieved from local, offline knowledge base.',
    ])
    mime = 'application/pdf'
  }

  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `terrasphere-report.${type}`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
