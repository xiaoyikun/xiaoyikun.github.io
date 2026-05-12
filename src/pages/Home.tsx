import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ProductTile from '../components/ProductTile'
import { projects } from '../data/projects'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  // 视差：随滚动 hero 副标题轻微上移、淡出
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <main>
      {/* Hero —— 白底大字 */}
      <section
        ref={heroRef}
        className="tile bg-canvas !py-[120px] md:!py-[160px]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hero-display text-ink"
        >
          一帧画面，
          <br />
          一个世界。
        </motion.h1>

        <motion.p
          style={{ opacity, y }}
          className="lead-airy mt-apple-lg max-w-[680px] text-ink-muted-80"
        >
          肖奕堃 · 游戏美术作品集。专注于角色、场景与世界观设定，
          让玩家在按下按键之前，就已经身临其境。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-apple-xl flex items-center gap-apple-sm"
        >
          <Link to="/work" className="btn-primary">
            查看作品
          </Link>
          <Link to="/contact" className="text-link text-body-base">
          联系我 →
          </Link>
        </motion.div>
      </section>

      {/* 交替明暗作品 Tile */}
      {projects.slice(0, 5).map((p, i) => (
        <ProductTile key={p.id} project={p} reverse={i % 2 === 1} />
      ))}

      {/* 视差引言 */}
      <section className="tile bg-tile-1 text-white !py-[140px]">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="display-lg max-w-[820px]"
        >
          “游戏美术的使命，是让不存在的世界，看起来比现实还要真实。”
        </motion.blockquote>
        <p className="mt-apple-lg text-caption text-body-muted">
          — 肖奕堃
        </p>
      </section>

      {/* 底部 CTA */}
      <section className="tile bg-parchment">
        <h3 className="display-lg">欢迎约稿与交流。</h3>
        <p className="lead mt-apple-sm text-ink-muted-80">
          如果你有游戏项目需要角色设计、场景原画或世界观设定，随时联系。
        </p>
        <Link to="/contact" className="btn-primary mt-apple-lg">
          与我合作
        </Link>
      </section>
    </main>
  )
}
