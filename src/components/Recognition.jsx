import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, ACHIEVEMENTS, PARTNERSHIPS, PIPELINE } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Recognition({ loaded }) {
  const root     = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    // Wait until preloader is done and page is at scroll:0 with final layout.
    // Without this, ScrollTrigger calculates positions before layout settles
    // and onEnter never fires for elements that are "already past" the trigger.
    if (!loaded) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Small delay after loaded so ScrollTrigger.refresh() in useSectionReveal
    // has run and all layout is final
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // Stats: hide all cards, then reveal + count-up when grid enters view
        const stats = statsRef.current?.querySelectorAll('.stat') ?? []
        stats.forEach((statEl, idx) => {
          const numEl = statEl.querySelector('.stat__num')
          if (!numEl) return
          const target   = parseFloat(numEl.dataset.n)
          const useComma = numEl.dataset.comma === '1'
          if (isNaN(target)) return

          gsap.set(statEl, { y: 40, opacity: 0 })

          const obj = { v: 0 }
          ScrollTrigger.create({
            trigger: statsRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.to(statEl, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: idx * 0.09 })
              gsap.to(obj, {
                v: target,
                duration: 1.8,
                ease: 'power2.out',
                delay: idx * 0.09,
                onUpdate: () => {
                  numEl.textContent = useComma
                    ? Math.round(obj.v).toLocaleString('en-IN')
                    : String(Math.round(obj.v))
                },
              })
            },
          })
        })

        // Award rows stagger in
        gsap.utils.toArray('.award').forEach((el, i) => {
          gsap.set(el, { x: -28, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.awards__list', start: 'top 84%', once: true,
            onEnter: () => gsap.to(el, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out', delay: i * 0.09 }),
          })
        })

        // Venture cards
        gsap.utils.toArray('.venture').forEach((el, i) => {
          gsap.set(el, { y: 28, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.ventures', start: 'top 84%', once: true,
            onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: i * 0.14 }),
          })
        })

        ScrollTrigger.refresh()

      }, root)
      return () => ctx.revert()
    }, 200)

    return () => clearTimeout(timer)
  }, [loaded])

  return (
    <section className="recog section section-reveal" id="recognition" ref={root}>

      <div className="recog__top panel-lime">
        <div className="wrap">
          <span className="eyebrow">005 — Recognition</span>
          <h2 className="recog__title display">Proof,<br />not promises.</h2>
        </div>
      </div>

      <div className="recog__stats panel-paper" ref={statsRef}>
        <div className="wrap stats__grid">
          {STATS.map((s, i) => {
            const raw      = parseFloat(s.value.replace(/[^0-9.]/g, ''))
            const hasComma = s.value.includes(',')
            return (
              <div className="stat" key={i}>
                <div className="stat__val-row display">
                  <span
                    className="stat__num"
                    data-n={raw}
                    data-comma={hasComma ? '1' : '0'}
                  >0</span>
                  {s.suffix && <em className="stat__sfx">{s.suffix}</em>}
                </div>
                <p className="stat__label">{s.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="recog__lower panel-black">
        <div className="wrap recog__grid">
          <div className="awards">
            <h3 className="recog__sub">Hackathon wins</h3>
            <ul className="awards__list">
              {ACHIEVEMENTS.map((a) => (
                <li className="award" key={a.event}>
                  <span className="award__event">{a.event}</span>
                  <span className="award__result mono">{a.result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ventures">
            {[PARTNERSHIPS, PIPELINE].map((v, i) => (
              <div className="venture" key={i}>
                <span className="mono venture__tag">{i === 0 ? 'Partnership' : 'In the pipeline'}</span>
                <h4 className="venture__name">{v.name}</h4>
                <p className="venture__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
