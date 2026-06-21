import { useEffect, useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { useSectionReveal } from './hooks/useSectionReveal'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Brands from './components/Brands'
import Work from './components/Work'
import Recognition from './components/Recognition'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis(loaded)
  useSectionReveal(loaded)

  // Lock scroll during preloader
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden'
    if (loaded) window.scrollTo(0, 0)
  }, [loaded])

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={loaded} />
        <About loaded={loaded} />
        <Brands loaded={loaded} />
        <Work loaded={loaded} />
        <Recognition loaded={loaded} />
        <Contact />
      </main>
    </>
  )
}
