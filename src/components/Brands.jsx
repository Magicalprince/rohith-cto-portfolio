import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BRANDS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Brands({ loaded }) {
  const [active, setActive] = useState(0)
  const root   = useRef(null)
  const visual = useRef(null)

  // Visual panel swaps colour per active brand — no layout dependency
  useEffect(() => {
    if (!visual.current) return
    gsap.to(visual.current, { backgroundColor: BRANDS[active].accent + '22', duration: 0.5, ease: 'power2.out' })
  }, [active])

  useEffect(() => {
    if (!loaded) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        const intro = root.current?.querySelector('.brands__intro')
        if (intro) {
          gsap.set(intro, { y: 22, opacity: 0 })
          ScrollTrigger.create({
            trigger: intro, start: 'top 86%', once: true,
            onEnter: () => gsap.to(intro, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }),
          })
        }

        const rows = root.current?.querySelectorAll('.brow') ?? []
        if (rows.length) {
          gsap.set(rows, { y: 36, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.brands__rows', start: 'top 82%', once: true,
            onEnter: () => gsap.to(rows, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 }),
          })
        }

        ScrollTrigger.refresh()

      }, root)
      return () => ctx.revert()
    }, 200)

    return () => clearTimeout(timer)
  }, [loaded])

  return (
    <section className="brands section section-reveal" id="brands" ref={root}>
      <div className="brands__layout">

        <div className="brands__visual" ref={visual}>
          <div className="brands__visual-inner">
            <img src="/portrait.png" alt="Rohith Babu ME" className="brands__portrait" />
            <div className="brands__visual-label">
              <span className="eyebrow">003 — Ecosystem</span>
              <span className="brands__visual-num mono">
                {String(active + 1).padStart(2, '0')} / {String(BRANDS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="brands__panel">
          <div className="brands__head-content">
            <h2 className="brands__title display">
              One company.<br />Five engineering<br />divisions.
            </h2>
            <p className="brands__intro">
              The technology stack I lead across Welbuilt AI Solutions —
              each division its own discipline, all built on the same engineering standard.
            </p>
          </div>

          <div className="brands__rows">
            {BRANDS.map((b, i) => {
              const isOpen = active === i
              return (
                <div
                  key={b.id}
                  className={`brow ${isOpen ? 'brow--open' : ''}`}
                  onMouseEnter={() => setActive(i)}
                >
                  <button className="brow__bar" onClick={() => setActive(i)} data-cursor>
                    <span className="brow__index mono">{b.index}</span>
                    <span className="brow__name">{b.name}</span>
                    <span className="brow__div">{b.division}</span>
                    <span className="brow__arrow">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  <div className="brow__body" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="brow__body-inner">
                      <p className="brow__blurb">{b.blurb}</p>
                      <div className="brow__tags">
                        {b.services.map((s) => <span key={s}>{s}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
