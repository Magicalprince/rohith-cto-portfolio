import { useEffect, useState } from 'react'
import { NAV, CONTACT } from '../data/content'
import { scrollToId } from '../hooks/useLenis'

export default function Nav() {
  const [open, setOpen]   = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => { setOpen(false); scrollToId(id) }

  return (
    <>
      <header className={`nav ${solid ? 'nav--solid' : ''}`}>
        <button className="nav__logo" onClick={() => go('hero')} data-cursor>
          <img src="/logo.png" alt="WelBuilt AI" />
        </button>

        {/* Right side: nav links + menu toggle */}
        <div className="nav__right">
          <nav className="nav__links" aria-label="Primary">
            {NAV.slice(1).map((n) => (
              <button key={n.id} className="nav__link" onClick={() => go(n.id)} data-cursor>
                {n.label}
              </button>
            ))}
          </nav>
          <button
            className="nav__toggle"
            onClick={() => setOpen((o) => !o)}
            data-cursor
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open}>
        <ul className="menu__list">
          {NAV.map((n, i) => (
            <li key={n.id}>
              <button
                className="menu__item"
                onClick={() => go(n.id)}
                style={{ '--i': i }}
                data-cursor
              >
                {n.label}
                <span className="menu__num">{n.index}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <a href={`mailto:${CONTACT.personal.email}`} className="menu__email">
            {CONTACT.personal.email}
          </a>
          <div className="menu__socials">
            {CONTACT.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
