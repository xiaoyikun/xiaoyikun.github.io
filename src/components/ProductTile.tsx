import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

const surfaceMap: Record<Project['surface'], { bg: string; text: string; linkOnDark: boolean }> = {
  light: { bg: 'bg-canvas', text: 'text-ink', linkOnDark: false },
  parchment: { bg: 'bg-parchment', text: 'text-ink', linkOnDark: false },
  dark: { bg: 'bg-tile-1', text: 'text-white', linkOnDark: true },
  'dark-2': { bg: 'bg-tile-2', text: 'text-white', linkOnDark: true },
  'dark-3': { bg: 'bg-tile-3', text: 'text-white', linkOnDark: true }
}

interface Props {
  project: Project
  /** 倒置布局（图在上 / 文字在上） */
  reverse?: boolean
}

export default function ProductTile({ project, reverse = false }: Props) {
  const s = surfaceMap[project.surface]

  return (
    <section className={`tile ${s.bg} ${s.text}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-apple-md"
      >
        {!reverse && (
          <>
            <h2 className="display-lg">{project.title}</h2>
            <p className="lead opacity-90">{project.tagline}</p>
            <div className="flex items-center gap-apple-sm mt-apple-xs">
              <Link to={`/work/${project.id}`} className="btn-primary">
                了解更多
              </Link>
              <Link
                to={`/work/${project.id}`}
                className={
                  s.linkOnDark
                    ? 'text-link-on-dark text-body-base'
                    : 'text-link text-body-base'
                }
              >
                查看案例 →
              </Link>
            </div>
          </>
        )}

        {/* 产品占位封面 */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="product-shadow mt-apple-xl rounded-md overflow-hidden"
          style={{
            width: 'min(880px, 92vw)',
            height: 'min(440px, 50vw)',
            background: project.cover
          }}
          aria-label={project.title}
        />

        {reverse && (
          <>
            <h2 className="display-lg mt-apple-xl">{project.title}</h2>
            <p className="lead opacity-90">{project.tagline}</p>
            <div className="flex items-center gap-apple-sm mt-apple-xs">
              <Link to={`/work/${project.id}`} className="btn-primary">
                了解更多
              </Link>
              <Link
                to={`/work/${project.id}`}
                className={
                  s.linkOnDark
                    ? 'text-link-on-dark text-body-base'
                    : 'text-link text-body-base'
                }
              >
                查看案例 →
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </section>
  )
}
