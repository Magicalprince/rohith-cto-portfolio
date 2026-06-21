import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

// Line-mask reveal on section headings only.
// Everything else stays in individual components where it's safe.
export function useSectionReveal(ready) {
  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Small delay so all components mount and ScrollTrigger.refresh() has run
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // Line-by-line reveal on every display heading OUTSIDE the hero
        // (hero has its own line animation via hero__line-inner)
        gsap.utils.toArray('#about .display, #brands .display, #work .display, #recognition .display, #contact .display').forEach((el) => {
          const split = new SplitType(el, { types: 'lines', lineClass: 'st-line' })

          split.lines.forEach((line) => {
            const inner = document.createElement('span')
            inner.className = 'st-line-inner'
            inner.innerHTML = line.innerHTML
            line.innerHTML = ''
            line.appendChild(inner)
          })

          gsap.fromTo(
            el.querySelectorAll('.st-line-inner'),
            { yPercent: 108 },
            {
              yPercent: 0,
              duration: 1.05,
              ease: 'power4.out',
              stagger: 0.09,
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // Eyebrows — simple fade+slide, safe
        gsap.utils.toArray('#about .eyebrow, #brands .eyebrow, #work .eyebrow, #recognition .eyebrow, #contact .eyebrow').forEach((el) => {
          gsap.fromTo(el,
            { y: 18, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
            }
          )
        })

      })

      return () => ctx.revert()
    }, 800)

    return () => clearTimeout(timer)
  }, [ready])
}
