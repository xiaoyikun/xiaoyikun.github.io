import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/', label: '首页' },
  { to: '/work', label: '作品' },
  { to: '/about', label: '关于' },
  { to: '/contact', label: '联系' }
]

export default function GlobalNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="global-nav sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-apple-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-apple-xs text-white">
          {/* 使用 Apple 风的圆角小方块占位 logo */}
          <span className="inline-block h-4 w-4 rounded-[4px] bg-white" />
          <span className="text-nav-link tracking-[-0.12px]">肖奕堃</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-[28px] md:flex">
          {links.map((l) => {
            const active =
              l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-nav-link transition-opacity ${
                  active ? 'text-white' : 'text-white/72 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-apple-sm md:flex">
          <button className="btn-dark-utility" aria-label="搜索">
            搜索
          </button>
          <Link to="/contact" className="btn-dark-utility">
            约稿
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-nav-link"
          onClick={() => setOpen((v) => !v)}
          aria-label="菜单"
        >
          {open ? '关闭' : '菜单'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-surface-black border-t border-white/10">
          <div className="flex flex-col px-apple-lg py-apple-md">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-apple-sm text-white text-body-base"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
