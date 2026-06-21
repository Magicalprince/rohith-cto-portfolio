import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BRANDS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Brands() {
  const [active, setActive] = useState(0)
  const root     = useRef(null)
  const visual   = useRef(null)

  // Visual panel swaps colour per active brand
  useEffect(() => {
    if (!visual.current) return
    gsap.to(visual.current, {
      backgroundColor: BRANDS[active].accent + '22',
      duration: 0.5, ease: 'power2.out',
    })
  }, [active])

  // Scroll animations
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {

      // Intro paragraph
      gsap.fromTo('.brands__intro',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.brands__intro', start: 'top 86%', toggleActions: 'play none none none' },
        }
      )

      // Brand rows stagger in from right
      gsap.fromTo('.brow',
        { x: 32, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.brands__rows', start: 'top 84%', toggleActions: 'play none none none' },
        }
      )

    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="brands section section-reveal" id="brands" ref={root}>

      {/* Full-height sticky visual */}
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

        {/* Text + accordion panel */}
        <div className="brands__panel">
          <div className="brands__head-content">
            <h2 className="brands__title display section-title-reveal">
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
