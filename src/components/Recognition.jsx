import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, ACHIEVEMENTS, PARTNERSHIPS, PIPELINE } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// Reference's "testimonials / partners" section mapped to stats + hackathon wins.
// Uses the LIME bg (→ our gold) from the reference.
export default function Recognition() {
  const root     = useRef(null)
  const statsRef = useRef(null)

  // Count-up animation
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
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
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      gsap.fromTo('.stat',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo('.award, .venture',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.recog__lower', start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="recog section" id="recognition" ref={root}>

      {/* Top: lime/gold bg — the reference's testimonials-on-lime */}
      <div className="recog__top panel-lime">
        <div className="wrap">
          <span className="eyebrow">005 — Recognition</span>
          <h2 className="recog__title display">Proof,<br />not promises.</h2>
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

      {/* Lower: awards + ventures — dark bg (reference's dark contrast sections) */}
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
