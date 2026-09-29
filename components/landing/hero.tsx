'use client'

import { useRef, useState } from 'react'
import { ArrowRight, Maximize2, Pause, Play } from 'lucide-react'

const AVATARS = [
  { initials: 'AM', className: 'bg-[#f3b3a6] text-[#7a2c1e]' },
  { initials: 'RH', className: 'bg-[#bfe3cf] text-primary' },
  { initials: 'VK', className: 'bg-[#cfc3ea] text-[#3b2a70]' },
]

function formatTime(s: number) {
  if (!Number.isFinite(s)) return '00:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState({ current: 0, duration: 0 })

  const safePlay = (v: HTMLVideoElement) => {
    v.play().catch((err: DOMException) => {
      // Rapid play/pause toggles abort the pending play() promise; that's expected.
      if (err.name === 'AbortError') return
      if (err.name === 'NotAllowedError' && !v.muted) {
        v.muted = true
        v.play().catch(() => {})
      }
    })
  }

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) safePlay(v)
    else v.pause()
  }

  const watchDemo = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.muted = false
    safePlay(v)
    v.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    v.currentTime = (Number(e.target.value) / 100) * v.duration
  }

  return (
    <section id="home" aria-labelledby="hero-title" className="topo-bg relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:pb-28 lg:pt-20">
        <div>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="size-2 rounded-full bg-alert/80" aria-hidden="true" />A platform for earth intelligence
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-6xl font-normal leading-[0.98] tracking-tight text-foreground sm:text-7xl xl:text-8xl"
          >
            Earth intelligence for a{' '}
            <em className="font-serif font-normal italic text-primary">safer nation.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            AI-powered satellite image search, multi-temporal analysis and change detection for defense
            decision-making.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-md transition hover:bg-brand"
            >
              Start analysis <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={watchDemo}
              className="inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3.5 font-medium text-foreground shadow-sm ring-1 ring-border transition hover:bg-white"
            >
              <Play className="size-4 fill-current" aria-hidden="true" /> Watch demo
            </button>
          </div>
          <div className="mt-9 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2" aria-hidden="true">
              {AVATARS.map((a) => (
                <span
                  key={a.initials}
                  className={`flex size-7 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-background ${a.className}`}
                >
                  {a.initials}
                </span>
              ))}
              <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs ring-2 ring-background">
                +
              </span>
            </div>
            <p>
              <strong className="font-semibold text-foreground">1,284 analysts</strong> are making clearer decisions.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border-4 border-[#0b1512] bg-[#0b1512] shadow-[0_30px_60px_-20px_rgba(13,59,44,0.45)]">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                className="size-full object-cover"
                src="/videos/hero-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/sat-river.png"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget
                  setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
                  setTime({ current: v.currentTime, duration: v.duration })
                }}
                aria-label="Terrasphere product demo video"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
                <button
                  type="button"
                  onClick={toggle}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                  aria-label={playing ? 'Pause video' : 'Play video'}
                >
                  {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
                </button>
                <label className="sr-only" htmlFor="hero-seek">
                  Video progress
                </label>
                <input
                  id="hero-seek"
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={seek}
                  className="h-1 flex-1 cursor-pointer accent-white"
                />
                <span className="font-mono text-xs tabular-nums text-white/90">
                  {formatTime(time.current)} / {formatTime(time.duration)}
                </span>
                <button
                  type="button"
                  onClick={() => videoRef.current?.requestFullscreen?.()}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white transition hover:bg-black/60"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
