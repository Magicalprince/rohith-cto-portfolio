import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

// Reveals child lines / [data-reveal] elements as the container scrolls in.
// Splits any [data-split] into masked lines that rise on enter.
export function useReveal(opts = {}) {
  const ref = useRef(null)
  const { start = 'top 82%', y = 28, stagger = 0.08 } = opts

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Split lines
      const splits = []
      root.querySelectorAll('[data-split]').forEach((el) => {
        const split = new SplitType(el, { types: 'lines', lineClass: 'line-inner' })
        split.lines.forEach((ln) => {
          const wrap = document.createElement('span')
          wrap.className = 'line-mask'
          ln.parentNode.insertBefore(wrap, ln)
          wrap.appendChild(ln)
        })
        splits.push(split)

        if (reduce) return
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 0.95,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start },
        })
      })

      // Generic reveal elements
      if (!reduce) {
        const items = root.querySelectorAll('[data-reveal]')
        if (items.length) {
          gsap.from(items, {
            y,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger,
            scrollTrigger: { trigger: root, start },
          })
        }
      }

      return () => splits.forEach((s) => s.revert())
    }, root)

    return () => ctx.revert()
  }, [start, y, stagger])

  return ref
}
