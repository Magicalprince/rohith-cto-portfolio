import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ABOUT } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef(null)
  const stmt = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      // Word-by-word color scrub reveal — the reference's signature mechanic
      if (!reduce && stmt.current) {
        const split = new SplitType(stmt.current, { types: 'words', wordClass: 'about-word' })
        gsap.from(split.words, {
          color: 'rgba(11,11,11,0.15)',
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: stmt.current,
            start: 'top 72%',
            end: 'bottom 48%',
            scrub: 0.8,
          },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about section panel-paper section-reveal" id="about" ref={root}>

      <div className="about__statement wrap">
        <p className="about__stmt display" ref={stmt}>{ABOUT.lead}</p>
      </div>

      <div className="about__content wrap">
        <div className="about__body">
          <span className="eyebrow about__eyebrow">002 — About Rohith</span>
          {ABOUT.paragraphs.map((p, i) => (
            <p className="about__para" key={i}>{p}</p>
          ))}
        </div>

        <div className="about__pillars">
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
