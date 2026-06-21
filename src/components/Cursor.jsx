import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Custom cursor: a small dot + a lagging ring that grows over interactive elements.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    document.body.classList.add('has-cursor')

    const xTo = gsap.quickTo(ring.current, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(ring.current, 'y', { duration: 0.4, ease: 'power3' })
    const dxTo = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power2' })
    const dyTo = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power2' })

    const move = (e) => { xTo(e.clientX); yTo(e.clientY); dxTo(e.clientX); dyTo(e.clientY) }

    const enter = () => gsap.to(ring.current, { scale: 2.1, backgroundColor: 'rgba(245,184,46,0.18)', borderColor: 'rgba(245,184,46,0.9)', duration: 0.3 })
    const leave = () => gsap.to(ring.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(247,244,236,0.5)', duration: 0.3 })

    window.addEventListener('mousemove', move)
    const targets = () => document.querySelectorAll('a, button, [data-cursor]')
    let bound = []
    const bind = () => {
      bound.forEach(([el]) => {})
      bound = []
      targets().forEach((el) => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        bound.push([el])
      })
    }
    bind()
    const reBind = setInterval(bind, 1500)

    return () => {
      clearInterval(reBind)
      window.removeEventListener('mousemove', move)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden />
      <div className="cursor-dot" ref={dot} aria-hidden />
    </>
  )
}
