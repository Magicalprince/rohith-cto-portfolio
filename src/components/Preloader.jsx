import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Matches valmax.dev reference exactly:
// lime bg → dark logo scales up → bg flips to vivid teal → wipes up
export default function Preloader({ onDone }) {
  const root  = useRef(null)
  const logo  = useRef(null)
  const pct   = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { onDone?.(); return }

    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({ onComplete: () => onDone?.() })

      // count 0 → 100
      tl.to(counter, {
        v: 100, duration: 1.8, ease: 'power2.inOut',
        onUpdate: () => {
          if (pct.current) pct.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      }, 0)

      // logo scales up from small
      tl.fromTo(logo.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.1)

      // bg flips: lime → vivid teal (the reference's lime → violet flip)
      tl.to(root.current, { backgroundColor: '#0E5F6A', duration: 0.55, ease: 'power2.inOut' }, 1.3)
      // logo filter: dark → white (since it's now on teal bg)
      tl.to(logo.current.querySelector('img'), { filter: 'brightness(0) invert(1)', duration: 0.4 }, 1.3)
      // counter also flips
      tl.to(pct.current, { color: '#F5B82E', duration: 0.3 }, 1.3)

      // slight scale on vivid
      tl.to(logo.current, { scale: 1.04, duration: 0.35, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 1.4)

      // wipe UP — whole panel exits upward
      tl.to(root.current, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, '+=0.1')
      tl.to([logo.current, pct.current], { opacity: 0, duration: 0.2 }, '<0.1')
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="preloader" ref={root}>
      <div className="preloader__logo" ref={logo}>
        <img src="/logo.png" alt="WelBuilt AI" />
      </div>
      <div className="preloader__pct" ref={pct}>000</div>
    </div>
  )
}
