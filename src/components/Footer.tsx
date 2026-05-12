import { Link } from 'react-router-dom'

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: '作品',
    links: [
      { label: '全部项目', to: '/work' },
      { label: '设计', to: '/work?c=design' },
      { label: '网页', to: '/work?c=web' },
      { label: '移动', to: '/work?c=mobile' }
    ]
  },
  {
    title: '关于',
    links: [
      { label: '关于我', to: '/about' },
      { label: '工作流程', to: '/about#process' },
      { label: '获奖记录', to: '/about#awards' }
    ]
  },
  {
    title: '联系',
    links: [
      { label: '合作咨询', to: '/contact' },
      { label: '招聘信息', to: '/contact#careers' },
      { label: '媒体合作', to: '/contact#press' }
    ]
  },
  {
    title: '更多',
    links: [
      { label: '日志', to: '/' },
      { label: '订阅源', to: '/' },
      { label: '邮件订阅', to: '/' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-parchment text-ink-muted-80">
      <div className="mx-auto max-w-[1440px] px-apple-lg py-[64px]">
        <div className="grid grid-cols-2 gap-apple-xl md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-caption-strong font-semibold text-ink mb-apple-xs">
                {col.title}
              </div>
              <ul className="text-dense-link">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[48px] border-t border-hairline pt-apple-lg flex flex-col gap-apple-xs md:flex-row md:items-center md:justify-between">
          <p className="text-fine-print text-ink-muted-48">
          © {new Date().getFullYear()} 肖奕堃 · 保留所有权利
          </p>
          <p className="text-micro-legal text-ink-muted-48">
            以排版、留白与一抹蓝色为信仰而设计。
          </p>
        </div>
      </div>
    </footer>
  )
}
