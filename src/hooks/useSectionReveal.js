import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

// Handles ONLY the large heading line-wipe reveals for each section.
// Per-element animations (rows, cards, stats) live in their own components.
export function useSectionReveal(ready) {
  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // Every .display heading outside the hero gets a line-mask wipe.
        // Trigger fires EARLY (top 95%) so heading is already revealed by
        // the time row/card animations below it start — matches the
        // reference where headings appear crisp as the section enters view.
        const headings = gsap.utils.toArray(
          '#about .display, #brands .display, #work .display, #recognition .display, #contact .display'
        )

        headings.forEach((el) => {
          // Guard: skip if already split (component re-renders)
          if (el.querySelector('.st-line')) return

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
            { yPercent: 106 },
            {
              yPercent: 0,
              duration: 0.95,
              ease: 'power4.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                // Fire early so heading lands before row animations start
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

      })

      return () => ctx.revert()
    }, 500)

    return () => clearTimeout(timer)
  }, [ready])
}
