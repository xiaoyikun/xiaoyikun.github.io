import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import SubNav from '../components/SubNav'
import { CATEGORIES, projects, type Category } from '../data/projects'

export default function Work() {
  const [params, setParams] = useSearchParams()
  const initialCat = (params.get('c') as Category | null) ?? 'all'
  const [cat, setCat] = useState<Category | 'all'>(initialCat)
  const [q, setQ] = useState('')

  // URL <-> state 同步
  useEffect(() => {
    if (cat === 'all') params.delete('c')
    else params.set('c', cat)
    setParams(params, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = cat === 'all' || p.category === cat
      const term = q.trim().toLowerCase()
      const matchQ =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.tagline.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
      return matchCat && matchQ
    })
  }, [cat, q])

  return (
    <main>
      <SubNav
        category="作品"
        links={[
          { to: '/about', label: '关于' },
          { to: '/contact', label: '联系' }
        ]}
        cta={{ to: '/contact', label: '合作' }}
      />

      {/* Hero */}
      <section className="bg-canvas px-apple-lg pt-[80px] pb-apple-xl">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="hero-display text-ink">精选作品。</h1>
          <p className="lead mt-apple-md text-ink-muted-80 max-w-[640px]">
            过去几年我做过的作品。点开任意一个查看完整案例。
          </p>

          {/* 搜索 + 分类 */}
          <div className="mt-apple-xl flex flex-col gap-apple-md md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-[420px] w-full">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索作品、标签…"
                className="search-input pl-[44px]"
              />
              <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-ink-muted-48 text-caption">
                ⌕
              </span>
            </div>

            <LayoutGroup>
              <div className="flex flex-wrap gap-apple-xs">
                {CATEGORIES.map((c) => {
                  const active = c.key === cat
                  return (
                    <button
                      key={c.key}
                      onClick={() => setCat(c.key)}
                      className={`relative rounded-pill px-[16px] py-[8px] text-caption transition-colors ${
                        active
                          ? 'text-white'
                          : 'text-ink-muted-80 hover:text-ink'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="cat-pill"
                          className="absolute inset-0 rounded-pill bg-ink"
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 40
                          }}
                        />
                      )}
                      <span className="relative z-10">{c.label}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
          </div>
        </div>
      </section>

      {/* 网格 */}
      <section className="bg-canvas px-apple-lg pb-section">
        <div className="mx-auto max-w-[1440px]">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-[80px] text-center"
              >
                <p className="display-md text-ink">未找到匹配项。</p>
                <p className="mt-apple-sm text-body-base text-ink-muted-80">
                  换个关键词，或选择其他分类。
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 gap-apple-lg md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={`/work/${p.id}`} className="util-card group block">
                      {/* 封面 */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-sm overflow-hidden aspect-[4/3] product-shadow"
                        style={{ background: p.cover }}
                      />
                      <div className="mt-apple-md flex items-start justify-between gap-apple-sm">
                        <div>
                          <h3 className="text-body-strong font-semibold text-ink">
                            {p.title}
                          </h3>
                          <p className="text-body-base text-ink-muted-80 mt-[2px]">
                            {p.tagline}
                          </p>
                        </div>
                        <span className="text-caption text-ink-muted-48 shrink-0">
                          {p.year}
                        </span>
                      </div>
                      <div className="mt-apple-sm flex items-center justify-between">
                        <div className="flex flex-wrap gap-[6px]">
                          {p.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-caption text-ink-muted-80 bg-parchment rounded-pill px-[10px] py-[4px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-link text-body-base group-hover:underline">
                          查看 →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
