import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ABOUT } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// Reference: off-white panel, giant centered statement ("We work at the point where…"),
// each word color-reveals from dim → black as it scrolls into view.
export default function About() {
  const root   = useRef(null)
  const stmt   = useRef(null)
  const pillarsRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      // Word-by-word color reveal (reference's signature)
      if (!reduce && stmt.current) {
        const split = new SplitType(stmt.current, { types: 'words', wordClass: 'about-word' })
        gsap.from(split.words, {
          color: 'rgba(11,11,11,0.18)',
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: stmt.current,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        })
      }

      // Pillar cards stagger in
      if (!reduce && pillarsRef.current) {
        gsap.fromTo(pillarsRef.current.querySelectorAll('.pillar'),
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: pillarsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
        )
      }

      // paragraphs
      if (!reduce) {
        gsap.fromTo('.about__para',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: '.about__body', start: 'top 85%', toggleActions: 'play none none reverse' } }
        )
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about section panel-paper section-reveal" id="about" ref={root}>

      {/* Big word-reveal statement — reference's "We work at the point where…" */}
      <div className="about__statement wrap">
        <p className="about__stmt display section-title-reveal" ref={stmt}>{ABOUT.lead}</p>
      </div>

      {/* Body + pillars grid */}
      <div className="about__content wrap">
        <div className="about__body">
          <span className="eyebrow about__eyebrow">002 — About Rohith</span>
          {ABOUT.paragraphs.map((p, i) => (
            <p className="about__para" key={i}>{p}</p>
          ))}
        </div>

        <div className="about__pillars" ref={pillarsRef}>
          {ABOUT.pillars.map((pl, i) => (
            <div className="pillar" key={pl.key}>
              <span className="pillar__n mono">0{i + 1}</span>
              <h3 className="pillar__key">{pl.key}</h3>
              <p className="pillar__desc">{pl.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
