import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onDone }) {
  const root    = useRef(null)
  const nameEl  = useRef(null)
  const roleEl  = useRef(null)
  const barFill = useRef(null)
  const pct     = useRef(null)
  const curtain = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { onDone?.(); return }

    const ctx = gsap.context(() => {
      const counter = { v: 0 }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => onDone?.(),
      })

      // 1. Name slides up from clip (line-mask reveal)
      tl.fromTo(nameEl.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.0, ease: 'power4.out' },
        0.1
      )

      // 2. Role line follows
      tl.fromTo(roleEl.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: 'power3.out' },
        0.3
      )

      // 3. Progress bar fills while counter ticks 000 → 100
      tl.to(barFill.current,
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
        0.4
      )

      tl.to(counter,
        {
          v: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (pct.current)
              pct.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        },
        0.4
      )

      // 4. Curtain sweeps UP — teal panel rises from bottom and covers everything
      tl.to(curtain.current,
        { translateY: '0%', duration: 0.7, ease: 'power4.inOut' },
        '+=0.15'
      )

      // 5. Whole preloader exits upward together with curtain
      tl.to(root.current,
        { yPercent: -100, duration: 0.65, ease: 'power4.inOut' },
        '<0.08'
      )

    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="preloader" ref={root}>

      <div className="preloader__name-wrap">
        <span className="preloader__name" ref={nameEl}>Rohith Babu ME</span>
      </div>

      <div className="preloader__role-wrap">
        <span className="preloader__role" ref={roleEl}>Co-founder & CTO — Welbuilt AI Solutions</span>
      </div>

      <div className="preloader__bar-track">
        <div className="preloader__bar-fill" ref={barFill} />
      </div>

      <div className="preloader__pct" ref={pct}>000</div>

      {/* Teal curtain that sweeps up to exit */}
      <div className="preloader__curtain" ref={curtain} />
    </div>
  )
}
