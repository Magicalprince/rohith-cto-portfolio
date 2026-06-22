import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, ACHIEVEMENTS, PARTNERSHIPS, PIPELINE } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Recognition({ loaded }) {
  const root     = useRef(null)
  const statsRef = useRef(null)
  const triggered = useRef(false)

  useEffect(() => {
    if (!loaded) return

    const timer = setTimeout(() => {
      if (triggered.current) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // ── Count-up via IntersectionObserver ─────────────────────────────
      // Completely avoids GSAP context scoping issues with plain objects.
      // Each stat counts its own number when the stats grid enters the viewport.
      const grid = statsRef.current
      if (!grid) return

      const runCountUp = () => {
        if (triggered.current) return
        triggered.current = true

        grid.querySelectorAll('.stat').forEach((statEl, idx) => {
          const numEl   = statEl.querySelector('.stat__num')
          if (!numEl) return
          const target   = parseFloat(numEl.dataset.n)
          const useComma = numEl.dataset.comma === '1'
          if (!target || isNaN(target)) return

          // Entrance animation
          if (!reduce) {
            gsap.fromTo(statEl,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: idx * 0.09 }
            )
          }

          // Count-up using plain RAF loop — no GSAP object tweening
          const duration = 1800 // ms
          const startDelay = idx * 90
          const startTime = performance.now() + startDelay

          const tick = (now) => {
            const elapsed = Math.max(0, now - startTime)
            const progress = Math.min(elapsed / duration, 1)
            // ease-out-quart
            const eased = 1 - Math.pow(1 - progress, 4)
            const current = Math.round(eased * target)
            numEl.textContent = useComma
              ? current.toLocaleString('en-IN')
              : String(current)
            if (progress < 1) requestAnimationFrame(tick)
          }

          if (startDelay > 0) {
            setTimeout(() => requestAnimationFrame(tick), startDelay)
          } else {
            requestAnimationFrame(tick)
          }
        })
      }

      // Use IntersectionObserver — fires reliably regardless of scroll position
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect()
            runCountUp()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(grid)

      // ── Other animations ───────────────────────────────────────────────
      if (!reduce) {
        // Awards
        gsap.utils.toArray('.award').forEach((el, i) => {
          gsap.set(el, { x: -28, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.awards__list', start: 'top 84%', once: true,
            onEnter: () => gsap.to(el, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out', delay: i * 0.09 }),
          })
        })

        // Ventures
        gsap.utils.toArray('.venture').forEach((el, i) => {
          gsap.set(el, { y: 28, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.ventures', start: 'top 84%', once: true,
            onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: i * 0.14 }),
          })
        })
      }

      ScrollTrigger.refresh()

      return () => observer.disconnect()
    }, 300)

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
