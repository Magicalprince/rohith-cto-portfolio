import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Reference mechanic: each section panel enters from below with a large Y slide
// + clip-path reveal (inset bottom → 0%). Creates the "card stacking up" feel.
export function useSectionReveal(ready) {
  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Sections that use the panel reveal (not hero which has its own animation)
    const panels = gsap.utils.toArray('.section-reveal')

    panels.forEach((panel) => {
      gsap.fromTo(panel,
        {
          clipPath: 'inset(6% 0 0 0 round 20px)',
          y: 60,
        },
        {
          clipPath: 'inset(0% 0 0 0 round 0px)',
          y: 0,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Section headings: dramatic large y-slide
    gsap.utils.toArray('.section-title-reveal').forEach((el) => {
      gsap.fromTo(el,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [ready])
}
