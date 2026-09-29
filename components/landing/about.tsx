import Image from 'next/image'
import { Target, UsersRound, Zap } from 'lucide-react'

const PILLARS = [
  { icon: Target, label: 'Accurate Intelligence' },
  { icon: Zap, label: 'Faster Decision-Making' },
  { icon: UsersRound, label: 'Built for Bharat' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden bg-[#0a1f1a] text-white">
      <Image
        src="/images/about-bg.png"
        alt="Satellite scanning a holographic map of India above a Himalayan forward base"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a1f1a] via-[#0a1f1a]/80 to-transparent" />
      <svg className="absolute bottom-0 left-0 -z-10 h-40 w-72 text-emerald-300/40" viewBox="0 0 400 260" fill="none" aria-hidden="true">
        <path d="M0 60 C120 60 160 110 200 170 S300 260 360 260" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="160" cy="100" r="6" fill="#6ee7b7" />
        <circle cx="250" cy="220" r="3" fill="#6ee7b7" />
      </svg>

      <div className="mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-5 py-24 md:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-emerald-300/40 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
            About Terrasphere
          </span>
          <h2 id="about-title" className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Developed for <br />A Safer and <span className="text-emerald-300">Smarter India</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/85 md:text-xl">
            Terrasphere is an AI-powered satellite intelligence system designed for defense analysts, government
            agencies and strategic decision-makers.
          </p>
          <ul className="mt-10 flex flex-wrap gap-y-6">
            {PILLARS.map((p, i) => (
              <li key={p.label} className={`flex flex-col gap-3 pr-8 ${i > 0 ? 'border-l border-white/20 pl-8' : ''}`}>
                <span className="flex size-14 items-center justify-center rounded-xl bg-[#1c5a44] ring-1 ring-emerald-300/30">
                  <p.icon className="size-7" aria-hidden="true" />
                </span>
                <span className="max-w-[9rem] text-lg font-semibold leading-snug">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
