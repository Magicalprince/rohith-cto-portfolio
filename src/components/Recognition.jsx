import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, ACHIEVEMENTS, PARTNERSHIPS, PIPELINE } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Recognition() {
  const root     = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {

      // Stats: slide up + fade in, THEN kick off count-up so numbers
      // aren't invisible while animating
      const statEls = statsRef.current?.querySelectorAll('.stat')
      if (statEls?.length) {
        gsap.fromTo(statEls,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.75, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: 'top 82%', toggleActions: 'play none none none' },
            onStart: () => {
              // Count-up fires as stats become visible
              statsRef.current?.querySelectorAll('.stat__val[data-n]').forEach((el) => {
                const n = parseFloat(el.dataset.n)
                if (isNaN(n)) return
                const useComma = el.dataset.comma === '1'
                const obj = { v: 0 }
                gsap.to(obj, {
                  v: n, duration: 1.8, ease: 'power2.out',
                  onUpdate: () => {
                    el.textContent = useComma
                      ? Math.round(obj.v).toLocaleString('en-IN')
                      : String(Math.round(obj.v))
                  },
                })
              })
            },
          }
        )
      }

      // Award rows stagger in
      gsap.fromTo('.award',
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.awards__list', start: 'top 84%', toggleActions: 'play none none none' },
        }
      )

      // Venture cards
      gsap.fromTo('.venture',
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.ventures', start: 'top 84%', toggleActions: 'play none none none' },
        }
      )

    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="recog section section-reveal" id="recognition" ref={root}>

      {/* Top: lime/gold bg */}
      <div className="recog__top panel-lime">
        <div className="wrap">
          <span className="eyebrow">005 — Recognition</span>
          <h2 className="recog__title display section-title-reveal">Proof,<br />not promises.</h2>
        </div>
      </div>

      {/* Stats grid — on off-white */}
      <div className="recog__stats panel-paper" ref={statsRef}>
        <div className="wrap stats__grid">
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat__val-row display">
                <span
                  className="stat__val"
                  data-n={parseFloat(s.value.replace(/[^0-9.]/g, ''))}
                  data-comma={s.value.includes(',') ? '1' : '0'}
                >{s.value}</span>
                <em className="stat__sfx">{s.suffix}</em>
              </div>
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lower: awards + ventures — dark bg */}
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
