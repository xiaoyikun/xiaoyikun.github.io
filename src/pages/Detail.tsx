import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SubNav from '../components/SubNav'
import { getProject, projects } from '../data/projects'

export default function Detail() {
  const { id = '' } = useParams()
  const project = getProject(id)
  const navigate = useNavigate()
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
    window.scrollTo({ top: 0 })
  }, [id])

  if (!project) {
    return (
      <main className="bg-canvas px-apple-lg py-section text-center">
        <h1 className="display-lg">未找到该项目。</h1>
        <Link to="/work" className="btn-primary mt-apple-lg">
          返回作品集
        </Link>
      </main>
    )
  }

  const next =
    projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length]

  const dark =
    project.surface === 'dark' ||
    project.surface === 'dark-2' ||
    project.surface === 'dark-3'

  return (
    <main className="pb-[100px]">
      <SubNav
        category={project.title}
        links={[
          { to: '/work', label: '全部作品' },
          { to: '/contact', label: '合作' }
        ]}
        cta={{ to: '/contact', label: '启动一个项目' }}
      />

      {/* Hero —— 用项目自己的 surface */}
      <section
        className={`tile ${
          dark ? 'bg-tile-1 text-white' : 'bg-canvas text-ink'
        } !py-[120px]`}
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-caption uppercase tracking-[0.12em] opacity-70"
        >
          {project.category} · {project.year}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-display mt-apple-sm"
        >
          {project.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="lead mt-apple-md max-w-[720px] opacity-90"
        >
          {project.tagline}
        </motion.p>
      </section>

      {/* 轮播 */}
      <section className="bg-parchment px-apple-lg py-section">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ background: project.gallery[active] }}
              />
            </AnimatePresence>

            {/* 圆形控制按钮 */}
            <button
              className="btn-icon-circular absolute left-apple-md top-1/2 -translate-y-1/2"
              onClick={() =>
                setActive(
                  (i) => (i - 1 + project.gallery.length) % project.gallery.length
                )
              }
              aria-label="上一张"
            >
              ‹
            </button>
            <button
              className="btn-icon-circular absolute right-apple-md top-1/2 -translate-y-1/2"
              onClick={() => setActive((i) => (i + 1) % project.gallery.length)}
              aria-label="下一张"
            >
              ›
            </button>
          </div>

          {/* 缩略图 */}
          <div className="mt-apple-lg flex flex-wrap gap-apple-sm">
            {project.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-[60px] w-[100px] rounded-sm overflow-hidden transition-all ${
                  active === i
                    ? 'ring-2 ring-primary-focus'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{ background: g }}
                aria-label={`第 ${i + 1} 张`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 描述 + tags */}
      <section className="bg-canvas px-apple-lg py-section">
        <div className="mx-auto grid max-w-[1100px] gap-apple-xl md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="display-md text-ink">关于这个项目</h2>
            <p className="mt-apple-md text-body-base text-ink leading-[1.7]">
              {project.description} 我从问题出发，用数周时间打磨核心动线，
              然后把所有干扰从画面中拿掉。这个过程通常意味着删掉一半最初看似必要的元素。
            </p>
            <p className="mt-apple-md text-body-base text-ink leading-[1.7]">
              成品的亮点不是任何一个组件，而是它们之间的距离、留白与节奏。
            </p>
          </div>
          <aside className="md:border-l md:border-hairline md:pl-apple-xl">
            <div className="text-caption-strong text-ink mb-apple-xs">标签</div>
            <div className="flex flex-wrap gap-[6px] mb-apple-lg">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-caption text-ink-muted-80 bg-parchment rounded-pill px-[10px] py-[4px]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="text-caption-strong text-ink mb-apple-xs">年份</div>
            <div className="text-body-base text-ink-muted-80 mb-apple-lg">
              {project.year}
            </div>
            <div className="text-caption-strong text-ink mb-apple-xs">
              分类
            </div>
            <div className="text-body-base text-ink-muted-80 capitalize">
              {project.category}
            </div>
          </aside>
        </div>
      </section>

      {/* Next project */}
      <section className="bg-tile-1 text-white px-apple-lg py-section">
        <div className="mx-auto max-w-[1100px] flex flex-col items-start gap-apple-md md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-caption uppercase tracking-[0.12em] opacity-60">
              下一个项目
            </p>
            <h3 className="display-lg mt-apple-xs">{next.title}</h3>
            <p className="lead mt-apple-xs opacity-80">{next.tagline}</p>
          </div>
          <Link to={`/work/${next.id}`} className="btn-primary">
            继续查看 →
          </Link>
        </div>
      </section>

      {/* Floating sticky bar */}
      <div className="sticky-bar fixed bottom-0 left-0 right-0 z-40">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-apple-xl">
          <div className="text-body-base text-ink">
            <span className="text-ink-muted-48 text-caption mr-apple-sm">
              项目
            </span>
            <span className="font-semibold">{project.title}</span>
          </div>
          <div className="flex items-center gap-apple-sm">
            <button
              className="btn-pearl"
              onClick={() => navigate(-1)}
              aria-label="返回"
            >
              ← 返回
            </button>
            <Link to="/contact" className="btn-primary">
              启动类似项目
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
