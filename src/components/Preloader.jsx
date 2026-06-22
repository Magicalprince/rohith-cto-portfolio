import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onDone }) {
  const root    = useRef(null)
  const logoEl  = useRef(null)
  const nameEl  = useRef(null)
  const roleEl  = useRef(null)
  const barFill = useRef(null)
  const pct     = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { onDone?.(); return }

    const ctx = gsap.context(() => {
      const counter = { v: 0 }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => onDone?.(),
      })

      // 1. Logo fades + scales in from center
      tl.fromTo(logoEl.current,
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0.1
      )

      // 2. Name slides up from clip
      tl.fromTo(nameEl.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: 'power4.out' },
        0.55
      )

      // 3. Role line follows
      tl.fromTo(roleEl.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.75, ease: 'power3.out' },
        0.72
      )

      // 4. Progress bar fills + counter ticks
      tl.to(barFill.current,
        { scaleX: 1, duration: 1.4, ease: 'power2.inOut' },
        0.85
      )
      tl.to(counter,
        {
          v: 100,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (pct.current)
              pct.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        },
        0.85
      )

      // 5. Slow fade out — entire preloader dissolves gracefully
      tl.to(root.current,
        { opacity: 0, duration: 1.4, ease: 'power2.inOut', pointerEvents: 'none' },
        '+=0.3'
      )

    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="preloader" ref={root}>

      {/* Center cluster: logo + name + role */}
      <div className="preloader__center">

        <div className="preloader__logo" ref={logoEl}>
          <img src="/logo.png" alt="WelBuilt AI" />
        </div>

        <div className="preloader__name-wrap">
          <span className="preloader__name" ref={nameEl}>Rohith Babu ME</span>
        </div>

        <div className="preloader__role-wrap">
          <span className="preloader__role" ref={roleEl}>Co-founder & CTO — Welbuilt AI Solutions</span>
        </div>

      </div>

      {/* Progress bar — full width at bottom */}
      <div className="preloader__bar-track">
        <div className="preloader__bar-fill" ref={barFill} />
      </div>

      {/* Counter */}
      <div className="preloader__pct" ref={pct}>000</div>

    </div>
  )
}
