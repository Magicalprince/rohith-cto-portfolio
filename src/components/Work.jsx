import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORK_GROUPS, DOMAINS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// Reference: the "Industries we empower" section has:
// - dark bg (not the vivid, more a near-black)
// - left sticky block "Industries\nwe empower" in large white text
// - right column: a giant list of domain names, each very large, with ■ accent on hover
// The work cards section above it is on the white panel.
function WorkGroup({ group }) {
  const [hovered, setHovered] = useState(null)
  const previewRef = useRef(null)

  const onMouseMove = (e) => {
    if (!previewRef.current) return
    gsap.to(previewRef.current, {
      x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out',
    })
  }

  return (
    <div className="wgroup" onMouseMove={onMouseMove}>
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
  const domainsRef = useRef(null)
  const [domHover, setDomHover] = useState(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.from('.wgroup', {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.work__groups', start: 'top 82%' },
      })
      // Domain items: use autoAlpha so GSAP sets visibility not just opacity
      gsap.fromTo('.domain-item',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: domainsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="work section" id="work">

      {/* Work groups — on paper (off-white) */}
      <div className="work__groups panel-paper">
        <div className="wrap">
          <div className="work__head">
            <span className="eyebrow">004 — Selected Work</span>
            <h2 className="work__title display">Things I've architected,<br />engineered and shipped.</h2>
          </div>
          {WORK_GROUPS.map((g) => <WorkGroup key={g.id} group={g} />)}
        </div>
      </div>

      {/* Domains — the reference's "Industries we empower" — dark bg, giant hover list */}
      <div className="domains panel-black" ref={domainsRef}>
        <div className="domains__inner wrap">
          {/* Left pinned heading */}
          <div className="domains__head">
            <h2 className="domains__h display">Domains<br />I build for</h2>
          </div>
          {/* Right giant list */}
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
