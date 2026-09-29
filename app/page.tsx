import { SiteHeader } from '@/components/landing/site-header'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Architecture } from '@/components/landing/architecture'
import { Impact } from '@/components/landing/impact'
import { About } from '@/components/landing/about'
import { SiteFooter } from '@/components/landing/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Architecture />
        <Impact />
        <About />
      </main>
      <SiteFooter />
    </>
  )
}
