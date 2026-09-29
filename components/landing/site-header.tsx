'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './section-heading'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'impact', label: 'Impact' },
  { id: 'about', label: 'About' },
]

export function SiteHeader() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border/70 bg-card/90 px-4 py-3 shadow-[0_8px_30px_-12px_rgba(13,59,44,0.18)] backdrop-blur md:px-7">
        <a href="#home" aria-label="Terrasphere home">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cn(
                    'relative py-2 text-[17px] transition-colors hover:text-primary',
                    active === item.id ? 'font-semibold text-primary' : 'text-foreground/80',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-brand transition-all',
                      active === item.id ? 'w-3/4' : 'w-0',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
           href="http://localhost:3001/"
           className="hidden items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[17px] font-semibold text-primary-foreground transition hover:bg-brand sm:inline-flex"
          >
           Get Started <ArrowRight className="size-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-xl border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="mx-auto mt-2 max-w-7xl rounded-2xl border border-border bg-card p-3 shadow-lg lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base',
                    active === item.id ? 'bg-brand-soft font-semibold text-primary' : 'text-foreground',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#how-it-works"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
              >
                Get Started <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
