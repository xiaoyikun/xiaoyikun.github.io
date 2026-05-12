import { Link } from 'react-router-dom'

interface SubNavProps {
  category: string
  links?: { to: string; label: string }[]
  cta?: { to: string; label: string }
}

export default function SubNav({
  category,
  links = [],
  cta
}: SubNavProps) {
  return (
    <div className="sub-nav-frosted sticky top-[44px] z-40 w-full">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-apple-lg">
        <div className="tagline text-ink">{category}</div>

        <div className="hidden items-center gap-apple-lg md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-button-utility text-ink-muted-80 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          {cta && (
            <Link to={cta.to} className="btn-primary">
              {cta.label}
            </Link>
          )}
        </div>

        {cta && (
          <Link to={cta.to} className="md:hidden btn-primary">
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  )
}
