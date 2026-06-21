import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORK_GROUPS, DOMAINS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

function WorkGroup({ group }) {
  const [hovered, setHovered] = useState(null)
  const previewRef = useRef(null)
  const containerRef = useRef(null)

  const onMouseMove = (e) => {
    if (!previewRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    gsap.to(previewRef.current, {
      x: e.clientX - rect.left + 20,
      y: e.clientY - rect.top - 80,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  return (
    <div className="wgroup" onMouseMove={onMouseMove} ref={containerRef}>
      <div className="wgroup__head">
        <h3 className="wgroup__label">{group.label}</h3>
        <span className="wgroup__note mono">{group.note}</span>
      </div>

      <ul className="wlist">
        {group.items.map((item, i) => {
          const Tag = item.url ? 'a' : 'div'
          const extra = item.url ? { href: item.url, target: '_blank', rel: 'noreferrer' } : {}
          return (
            <li key={item.id}>
              <Tag
                className={`wrow ${hovered === i ? 'wrow--on' : ''} ${hovered !== null && hovered !== i ? 'wrow--dim' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                data-cursor
                {...extra}
              >
                <span className="wrow__kicker mono">{item.kicker}</span>
                <span className="wrow__title">{item.title}</span>
                <span className="wrow__tag">{item.tag}</span>
                <span className="wrow__metric mono">{item.metric}</span>
                <span className={`wrow__status mono`} data-s={item.status.toLowerCase()}>{item.status}</span>
                <span className="wrow__arrow">↗</span>
              </Tag>
            </li>
          )
        })}
      </ul>

      {/* floating preview card (cursor-following) */}
      <div className="wpreview" ref={previewRef} aria-hidden>
        {group.items.map((item, i) => (
          <div
            className={`wcard ${hovered === i ? 'wcard--on' : ''}`}
            key={item.id}
            style={{ '--tone': item.tone }}
          >
            <span className="wcard__mark">{item.kicker}</span>
            <span className="wcard__name">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  const root       = useRef(null)
  const domainsRef = useRef(null)
  const [domHover, setDomHover] = useState(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {

      // Work group headers stagger in
      gsap.fromTo('.wgroup__head',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.work__groups', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      // Work rows slide up per group
      gsap.utils.toArray('.wlist').forEach((list) => {
        gsap.fromTo(list.querySelectorAll('.wrow'),
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.07,
            scrollTrigger: { trigger: list, start: 'top 86%', toggleActions: 'play none none none' },
          }
        )
      })

      // Domain items stagger
      gsap.fromTo('.domain-item',
        { x: 32, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06,
          scrollTrigger: { trigger: '.domains__list', start: 'top 88%', toggleActions: 'play none none none' },
        }
      )

    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="work section section-reveal" id="work" ref={root}>

      {/* Work groups — on paper (off-white) */}
      <div className="work__groups panel-paper">
        <div className="wrap">
          <div className="work__head">
            <span className="eyebrow">004 — Selected Work</span>
            <h2 className="work__title display section-title-reveal">Things I've architected,<br />engineered and shipped.</h2>
          </div>
          {WORK_GROUPS.map((g) => <WorkGroup key={g.id} group={g} />)}
        </div>
      </div>

      {/* Domains — dark bg, giant hover list */}
      <div className="domains panel-black" ref={domainsRef}>
        <div className="domains__inner wrap">
          <div className="domains__head">
            <h2 className="domains__h display">Domains<br />I build for</h2>
          </div>
          <ul className="domains__list">
            {DOMAINS.map((d, i) => (
              <li
                key={d}
                className={`domain-item ${domHover === i ? 'domain--on' : ''} ${domHover !== null && domHover !== i ? 'domain--dim' : ''}`}
                onMouseEnter={() => setDomHover(i)}
                onMouseLeave={() => setDomHover(null)}
              >
                <span className="domain-item__mark">■</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
