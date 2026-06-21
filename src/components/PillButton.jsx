import Magnetic from './Magnetic'

// The reference's signature pill: label segment + arrow-box segment.
// Variants: dark | vivid | paper
export default function PillButton({ label = 'Go', as = 'button', href, onClick, variant = 'dark', className = '' }) {
  const Tag = as
  const extra = as === 'a'
    ? { href, target: href?.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' }
    : { onClick, type: 'button' }

  return (
    <Magnetic strength={0.3}>
      <Tag className={`pill pill--${variant} ${className}`} {...extra} data-cursor>
        <span className="pill__label">{label}</span>
        <span className="pill__arrow" aria-hidden>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </Tag>
    </Magnetic>
  )
}
