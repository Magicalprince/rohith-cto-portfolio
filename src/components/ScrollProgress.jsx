import { useEffect, useRef } from 'react'

// Thin gold progress bar at the top of the viewport.
export default function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = h > 0 ? window.scrollY / h : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scrollprogress" ref={bar} aria-hidden />
}
