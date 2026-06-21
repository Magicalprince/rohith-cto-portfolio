import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FOUNDER, STACK } from '../data/content'
import { scrollToId } from '../hooks/useLenis'
import PillButton from './PillButton'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ ready }) {
  const root = useRef(null)

  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduce) {
        const tl = gsap.timeline({ delay: 0.05 })
        // heading lines rise from clip
        tl.from('.hero__line-inner', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.1 })
        // sub + cta
        tl.from('.hero__sub',     { y: 22, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        tl.from('.hero__actions', { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
        tl.from('.hero__meta',    { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        // portrait reveals
        tl.from('.hero__portrait-img', { scale: 1.06, opacity: 0, duration: 1.3, ease: 'power3.out' }, 0.15)
        // floating bubbles pop in
        tl.from('.hero__bubble', {
          scale: 0, opacity: 0, duration: 0.55, ease: 'back.out(1.8)', stagger: 0.06,
        }, 0.5)
        // bottom bar
        tl.from('.hero__bar', { opacity: 0, y: 12, duration: 0.6 }, 0.8)

        // idle float
        gsap.utils.toArray('.hero__bubble').forEach((b, i) => {
          gsap.to(b, {
            y: gsap.utils.random(-14, 14),
            x: gsap.utils.random(-8, 8),
            duration: gsap.utils.random(2.4, 4.0),
            ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.15,
          })
        })

        // subtle parallax on portrait as user scrolls
        gsap.to('.hero__portrait', {
          yPercent: 10, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero section panel-vivid" id="hero" ref={root}>

      {/* Top eyebrow bar */}
      <div className="hero__topbar wrap">
        <span className="hero__tag eyebrow">{FOUNDER.positionLine}</span>
        <span className="hero__tag mono hero__loc">Coimbatore · IST</span>
      </div>

      {/* Two-column body: LEFT = text  |  RIGHT = portrait */}
      <div className="hero__body wrap">

        {/* LEFT — text column */}
        <div className="hero__text">
          <h1 className="hero__title display">
            <span className="hero__line"><span className="hero__line-inner">Architect.</span></span>
            <span className="hero__line"><span className="hero__line-inner">Engineer.</span></span>
            <span className="hero__line hero__line--accent">
              <span className="hero__line-inner">Ship <em>with AI.</em></span>
            </span>
          </h1>

          <p className="hero__sub">{FOUNDER.intro}</p>

          <div className="hero__actions">
            <PillButton label="Explore the work" variant="dark"  onClick={() => scrollToId('work')} />
            <PillButton label="Start a build"    variant="vivid" onClick={() => scrollToId('contact')} />
          </div>

          <div className="hero__meta mono">
            <span>Est. 2023</span>
            <span className="hero__scroll">
              <span className="hero__scroll-line" />
              Scroll
            </span>
          </div>
        </div>

        {/* RIGHT — portrait column (bubbles orbit this column) */}
        <div className="hero__portrait-col">
          {/* Faint ring glow behind portrait */}
          <span className="hero__ring" aria-hidden />

          <div className="hero__portrait">
            <img
              className="hero__portrait-img"
              src="/portrait.png"
              alt="Rohith Babu ME — Co-founder & CTO"
            />
          </div>

          {/* Floating tech chips — only in the right column zone */}
          <div className="hero__bubbles" aria-hidden>
            {STACK.map((s, i) => (
              <span className="hero__bubble" key={s} style={{ '--n': i }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="hero__bar wrap" aria-hidden>
        <span className="mono">Co-founder &amp; CTO · Welbuilt AI Solutions Pvt Ltd</span>
        <span className="hero__scroll-bar mono">
          <span className="hero__scroll-line" />
          Scroll
        </span>
        <span className="mono">Est. 2023</span>
      </div>
    </section>
  )
}
