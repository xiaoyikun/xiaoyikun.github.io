import { motion } from 'framer-motion'
import SubNav from '../components/SubNav'

export default function About() {
  return (
    <main>
      <SubNav category="关于" cta={{ to: '/contact', label: '约稿' }} />

      {/* 个人介绍 Hero */}
      <section className="tile bg-canvas !py-[120px] items-start text-left">
        <div className="mx-auto max-w-[820px] w-full">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-eyebrow text-ink-muted-80 uppercase tracking-[0.08em]"
          >
            About / 关于我
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-display text-ink mt-apple-md"
          >
            肖奕堃
            <br />
            <span className="text-ink-muted-80">3D 场景美术 / 灯光方向</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lead-airy mt-apple-lg text-ink-muted-80"
          >
            在 Unreal Engine 5 里，用一束光去讲一段故事。
            <br />
            从 TOD 昼夜循环到电影感重打光，从 PBR 全流程到环境美术——
            <br />
            画面安静，但每一束光都有它的来意。
          </motion.p>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="tile bg-parchment items-start text-left">
        <div className="mx-auto max-w-[820px] w-full">
          <h2 className="display-md text-ink">教育背景</h2>
          <div className="mt-apple-lg flex flex-col gap-apple-sm text-body-base text-ink leading-[1.7]">
            <div className="flex items-baseline justify-between border-b border-ink/10 pb-apple-sm">
              <div>
                <p className="font-medium">广东工业大学</p>
                <p className="text-ink-muted-80">
                  数字媒体艺术（互动娱乐方向） · 本科在读
                </p>
              </div>
              <span className="text-caption text-ink-muted-80">
                2023 — 2027
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 实习经历 */}
      <section className="tile bg-canvas items-start text-left">
        <div className="mx-auto max-w-[820px] w-full">
          <h2 className="display-md text-ink">实习经历</h2>
          <div className="mt-apple-lg flex flex-col gap-apple-sm text-body-base text-ink leading-[1.7]">
            <div className="flex items-baseline justify-between border-b border-ink/10 pb-apple-sm">
              <div>
                <p className="font-medium">腾讯（深圳）科技有限公司</p>
                <p className="text-ink-muted-80">
                  IEG 互动娱乐事业群 · 光子工作室群 · 光子艺术部 · 技术美术实习生
                </p>
              </div>
              <span className="text-caption text-ink-muted-80">
                2025 — 至今
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 专业能力 */}
      <section className="tile bg-tile-1 text-white items-start text-left">
        <div className="mx-auto max-w-[820px] w-full">
          <h2 className="display-md">专业能力</h2>
          <div className="mt-apple-lg grid gap-apple-md md:grid-cols-2 text-body-base leading-[1.7]">
            <div>
              <p className="text-eyebrow text-white/60 uppercase tracking-[0.08em]">
                方向
              </p>
              <ul className="mt-apple-xs space-y-1 text-white/90">
                <li>· UE5 环境灯光与 Lumen 调试</li>
                <li>· TOD 昼夜系统与体积光</li>
                <li>· 同场景多版本重打光</li>
                <li>· PBR 全流程与材质把控</li>
                <li>· 角色三点布光与电影感光比</li>
              </ul>
            </div>
            <div>
              <p className="text-eyebrow text-white/60 uppercase tracking-[0.08em]">
                工具
              </p>
              <ul className="mt-apple-xs space-y-1 text-white/90">
                <li>· Unreal Engine 5 / Lumen / Niagara</li>
                <li>· Maya / Blender / ZBrush</li>
                <li>· Substance Painter / Designer</li>
                <li>· Photoshop / Marmoset Toolbag</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 创作信条 */}
      <section className="tile bg-canvas items-start text-left">
        <div className="mx-auto max-w-[820px] w-full">
          <h2 className="display-md text-ink">创作信条</h2>
          <ol className="mt-apple-lg space-y-apple-md text-body-base text-ink leading-[1.7] list-decimal pl-[20px]">
            <li>先想清楚"这束光是谁打的"，再调它的强度。</li>
            <li>大关系第一，细节最后。</li>
            <li>每一组色温都为情绪服务，而不是为了好看。</li>
            <li>最克制的一束 Rim，胜过满屏的体积光。</li>
          </ol>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="tile bg-parchment items-start text-left">
        <div className="mx-auto max-w-[820px] w-full">
          <h2 className="display-md text-ink">联系</h2>
          <ul className="mt-apple-lg space-y-apple-xs text-body-base text-ink leading-[1.7]">
            <li>
              <span className="text-ink-muted-80 mr-2">邮箱</span>
              <a
                href="mailto:xiaoyikun0725@gmail.com"
                className="text-link"
              >
                xiaoyikun0725@gmail.com
              </a>
            </li>
            <li>
              <span className="text-ink-muted-80 mr-2">ARTSTATION</span>
              <a
                href="https://user-9513842.artstation.com"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                user-9513842.artstation.com
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
