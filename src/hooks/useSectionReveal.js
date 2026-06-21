import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

// Reference mechanic (verified frame-by-frame):
// - NO whole-section clip-path transitions
// - Headings: lines slide UP from below a clip mask (overflow:hidden parent)
// - Body text / list rows: stagger up from y:40 with opacity
// - The "enthusiastic" feel is Lenis lerp + the large y distance (80-120px)
export function useSectionReveal(ready) {
  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {

      // ── 1. Display headings — split into lines, each line slides up ──────
      // Exclude hero section (has its own entrance animation)
      gsap.utils.toArray('.section-reveal:not(#hero) .display').forEach((el) => {
        // Wrap in overflow:hidden per-line (SplitType lines)
        const split = new SplitType(el, { types: 'lines', lineClass: 'st-line' })

        // Wrap each line's content in an inner span for masking
        split.lines.forEach((line) => {
          const inner = document.createElement('span')
          inner.className = 'st-line-inner'
          inner.innerHTML = line.innerHTML
          line.innerHTML = ''
          line.appendChild(inner)
        })

        gsap.fromTo(
          el.querySelectorAll('.st-line-inner'),
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 1.0,
            ease: 'power4.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // ── 2. Eyebrow labels — slide up small (not hero) ────────────────────
      gsap.utils.toArray('.section-reveal:not(#hero) .eyebrow').forEach((el) => {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })

      // ── 3. Body paragraphs — stagger up (not hero, not about__stmt which has color scrub) ──
      gsap.utils.toArray('.section-reveal:not(#hero) p:not(.about__stmt)').forEach((el) => {
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })

      // ── 4. Accordion rows (brands) — stagger up from bottom ──────────────
      const browGroups = gsap.utils.toArray('.brands__rows')
      browGroups.forEach((group) => {
        gsap.fromTo(group.querySelectorAll('.brow'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.07,
            scrollTrigger: { trigger: group, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })

      // ── 5. Work rows — stagger up ─────────────────────────────────────────
      gsap.utils.toArray('.wgroup').forEach((group) => {
        gsap.fromTo(group.querySelectorAll('.wlist li'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.06,
            scrollTrigger: { trigger: group, start: 'top 87%', toggleActions: 'play none none none' },
          }
        )
      })

      // ── 6. Stat cards — pop up with scale ────────────────────────────────
      gsap.fromTo('.stat',
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.stats__grid', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      // ── 7. Domain items — large slide in from bottom ──────────────────────
      gsap.fromTo('.domain-item',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.05,
          scrollTrigger: { trigger: '.domains__list', start: 'top 87%', toggleActions: 'play none none none' },
        }
      )

      // ── 8. Pillar cards ───────────────────────────────────────────────────
      gsap.fromTo('.pillar',
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.about__pillars', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      // ── 9. Award / venture items ──────────────────────────────────────────
      gsap.fromTo('.award, .venture',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.recog__lower', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

    })

    return () => ctx.revert()
  }, [ready])
}
