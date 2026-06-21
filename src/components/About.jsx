import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { ABOUT } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About({ loaded }) {
  const root = useRef(null)
  const stmt = useRef(null)

  useEffect(() => {
    if (!loaded) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // Word-by-word color scrub — fires on scroll, no hiding needed
        if (!reduce && stmt.current) {
          const split = new SplitType(stmt.current, { types: 'words', wordClass: 'about-word' })
          gsap.from(split.words, {
            color: 'rgba(11,11,11,0.12)',
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: stmt.current,
              start: 'top 70%',
              end: 'bottom 42%',
              scrub: 0.6,
            },
          })
        }

        if (reduce) return

        // Eyebrow + paragraphs stagger up
        const bodyEls = root.current?.querySelectorAll('.about__eyebrow, .about__para') ?? []
        if (bodyEls.length) {
          gsap.set(bodyEls, { y: 32, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.about__body', start: 'top 82%', once: true,
            onEnter: () => gsap.to(bodyEls, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.1 }),
          })
        }

        // Pillar cards pop up in sequence
        const pillars = root.current?.querySelectorAll('.pillar') ?? []
        if (pillars.length) {
          gsap.set(pillars, { y: 48, opacity: 0 })
          ScrollTrigger.create({
            trigger: '.about__pillars', start: 'top 84%', once: true,
            onEnter: () => gsap.to(pillars, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.09 }),
          })
        }

        ScrollTrigger.refresh()

      }, root)
      return () => ctx.revert()
    }, 200)

    return () => clearTimeout(timer)
  }, [loaded])

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
