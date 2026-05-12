import { useState } from 'react'
import { motion } from 'framer-motion'
import SubNav from '../components/SubNav'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <main>
      <SubNav category="联系" cta={{ to: '/work', label: '查看作品' }} />

      <section className="tile bg-canvas !py-[120px] items-start text-left">
        <div className="mx-auto grid max-w-[1100px] w-full gap-apple-xl md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="hero-display text-ink"
            >
              聊聊你的
              <br />
              项目。
            </motion.h1>
            <p className="lead-airy mt-apple-lg text-ink-muted-80">
              游戏场景灯光、TOD 环境、重打光与环境美术。
              <br />
              欢迎约稿、互调与交流。
            </p>
            <div className="mt-apple-xl text-body-base text-ink-muted-80 space-y-apple-xs">
              <p>
                <a href="mailto:xiaoyikun0725@gmail.com" className="text-link">
                  xiaoyikun0725@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="https://user-9513842.artstation.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  ArtStation 作品集
                </a>
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="flex flex-col gap-apple-md"
          >
            <input
              required
              placeholder="你的姓名"
              className="search-input !rounded-md"
            />
            <input
              required
              type="email"
              placeholder="邮箱"
              className="search-input !rounded-md"
            />
            <textarea
              required
              rows={5}
              placeholder="说说你在做什么项目？"
              className="bg-canvas text-ink text-body-base rounded-md px-[20px] py-[12px] outline-none border border-black/10 resize-none"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary self-start"
            >
              {sent ? '已发送 ✓' : '发送消息'}
            </motion.button>
            {sent && (
              <p className="text-caption text-ink-muted-80">
                谢谢，我会在 2 个工作日内回复。
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
