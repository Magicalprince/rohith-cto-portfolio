import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FOUNDER, STACK } from '../data/content'
import { scrollToId } from '../hooks/useLenis'
import PillButton from './PillButton'

gsap.registerPlugin(ScrollTrigger)

// Reference: valmax hero — full vivid-bg section, big centered heading,
// giant logomark/person silhouette center, white circular bubbles orbiting it.
export default function Hero({ ready }) {
  const root = useRef(null)

  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduce) {
        const tl = gsap.timeline({ delay: 0.05 })
        // heading lines rise
        tl.from('.hero__line-inner', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.1 })
        // sub + cta
        tl.from('.hero__sub', { y: 22, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        tl.from('.hero__actions', { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
        // portrait center
        tl.from('.hero__portrait-img', { scale: 1.08, opacity: 0, duration: 1.3, ease: 'power3.out' }, 0.15)
        // floating circles
        tl.from('.hero__bubble', {
          scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.07,
        }, 0.5)
        // bottom bar
        tl.from('.hero__bar', { opacity: 0, y: 12, duration: 0.6 }, 0.8)

        // idle float on bubbles
        gsap.utils.toArray('.hero__bubble').forEach((b, i) => {
          gsap.to(b, {
            y: gsap.utils.random(-16, 16),
            x: gsap.utils.random(-10, 10),
            duration: gsap.utils.random(2.4, 4.0),
            ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.15,
          })
        })

        // parallax on scroll: portrait rises, title sticks
        gsap.to('.hero__portrait', {
          yPercent: 14, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero section panel-vivid" id="hero" ref={root}>

      {/* Top bar */}
      <div className="hero__topbar wrap">
        <span className="hero__tag eyebrow">{FOUNDER.positionLine}</span>
        <span className="hero__tag mono hero__loc">Coimbatore · IST</span>
      </div>

      {/* Giant centered heading */}
      <div className="hero__heading wrap">
        <h1 className="hero__title display">
          <span className="hero__line"><span className="hero__line-inner">Architect.</span></span>
          <span className="hero__line"><span className="hero__line-inner">Engineer.</span></span>
          <span className="hero__line hero__line--accent">
            <span className="hero__line-inner">Ship<em> with AI.</em></span>
          </span>
        </h1>
      </div>

      {/* Central portrait + floating stack chips (the reference's "person + orbiting logos") */}
      <div className="hero__stage">
        <div className="hero__portrait">
          <img className="hero__portrait-img" src="/portrait.png" alt="Rohith Babu ME — CTO" />
          {/* Faint ring behind portrait */}
          <span className="hero__ring" aria-hidden />
        </div>

        {/* Floating white pill bubbles — reference's white circular brand logos */}
        <div className="hero__bubbles" aria-hidden>
          {STACK.map((s, i) => (
            <span className="hero__bubble" key={s} style={{ '--n': i }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Sub-copy + CTA row */}
      <div className="hero__lower wrap">
        <p className="hero__sub">{FOUNDER.intro}</p>
        <div className="hero__actions">
          <PillButton label="Explore the work" variant="dark" onClick={() => scrollToId('work')} />
          <PillButton label="Start a build" variant="vivid" as="button" onClick={() => scrollToId('contact')} />
        </div>
      </div>

      {/* Bottom status bar — reference has a thin bar with small labels */}
      <div className="hero__bar wrap" aria-hidden>
        <span className="mono">Co-founder &amp; CTO · Welbuilt AI Solutions Pvt Ltd</span>
        <span className="hero__scroll mono">
          <span className="hero__scroll-line" />
          Scroll
        </span>
        <span className="mono">Est. 2023</span>
      </div>
    </section>
  )
}
