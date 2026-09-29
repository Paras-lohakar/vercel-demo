import { Logo } from './section-heading'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#impact', label: 'Impact' },
  { href: '#about', label: 'About' },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <Logo light />
          <p className="mt-3 max-w-sm text-sm text-white/70">
            AI-powered satellite intelligence for a safer and smarter India.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-white/80 transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-white/60 md:px-8">
          {`© ${new Date().getFullYear()} Terrasphere. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
