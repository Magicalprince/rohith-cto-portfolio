import { CONTACT, FOUNDER } from '../data/content'
import { useClock } from '../hooks/useClock'
import PillButton from './PillButton'

// Reference closing section: off-white bg, big centered heading "Digital Culture at a glance",
// single CTA pill button. Then a minimal footer bar.
export default function Contact() {
  const time = useClock(CONTACT.timezone)

  return (
    <section className="contact section" id="contact">

      {/* Reference's "at a glance / let's create" CTA — paper bg, centered */}
      <div className="cta panel-paper">
        <div className="wrap cta__inner">
          <span className="eyebrow cta__eyebrow">006 — Contact</span>
          <h2 className="cta__title display">
            Let's build something<br />worth shipping.
          </h2>
          <div className="cta__action">
            <PillButton
              as="a"
              href={`mailto:${CONTACT.personal.email}`}
              label="Start a conversation"
              variant="dark"
            />
          </div>
        </div>
      </div>

      {/* Footer — vivid teal bg matching reference's closing header */}
      <footer className="foot panel-vivid">
        <div className="wrap foot__grid">
          <div className="foot__brand">
            <img src="/logo.png" alt="WelBuilt AI" className="foot__logo" />
            <p className="foot__name">{FOUNDER.name}</p>
            <p className="foot__pos mono">{FOUNDER.positionLine}</p>
          </div>

          <div className="foot__col">
            <span className="foot__h mono">Direct</span>
            <a href={`mailto:${CONTACT.personal.email}`}>{CONTACT.personal.email}</a>
            <a href={`tel:${CONTACT.personal.phone.replace(/\s/g,'')}`}>{CONTACT.personal.phone}</a>
          </div>

          <div className="foot__col">
            <span className="foot__h mono">Company</span>
            <a href={`mailto:${CONTACT.business.email}`}>{CONTACT.business.email}</a>
            <span>{CONTACT.location}</span>
          </div>

          <div className="foot__col">
            <span className="foot__h mono">Social</span>
            {CONTACT.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>
            ))}
          </div>
        </div>

        <div className="wrap foot__bar">
          <span className="mono">© {new Date().getFullYear()} Welbuilt AI Solutions Pvt Ltd</span>
          <span className="mono foot__clock">{time} {CONTACT.tzLabel}</span>
          <span className="mono">Built by Rohith</span>
        </div>
      </footer>
    </section>
  )
}
