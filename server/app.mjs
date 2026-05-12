// 本地作品集后台管理服务
// 启动：node server/app.mjs   然后浏览器访问 http://localhost:3001
import express from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import crypto from 'node:crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const PROJECTS_FILE = path.join(ROOT, 'src', 'data', 'projects.ts')

const PASSWORD = '995949'
const PORT = 3001

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.static(__dirname)) // 提供 admin.html
// 让后台预览到作品图
app.use('/src/assets/portfolio', express.static(path.join(ROOT, 'src', 'assets', 'portfolio')))
app.use('/portfolio-img', express.static(path.join(ROOT, 'src', 'assets', 'portfolio')))

// ===== 简易 token 鉴权 =====
const tokens = new Set()
const requireAuth = (req, res, next) => {
  const token = req.headers['x-token']
  if (!token || !tokens.has(token)) {
    return res.status(401).json({ error: '未登录或登录已过期' })
  }
  next()
}

app.post('/api/login', (req, res) => {
  if (req.body?.password === PASSWORD) {
    const token = crypto.randomBytes(16).toString('hex')
    tokens.add(token)
    return res.json({ token })
  }
  res.status(401).json({ error: '密码错误' })
})

// ===== 解析 projects.ts =====
// 我们只解析 projects 数组的字面量部分，保留头部 import 和尾部函数
function splitFile(raw) {
  const startMarker = 'export const projects: Project[] = ['
  const endMarker = '\nexport function getProject'
  const startIdx = raw.indexOf(startMarker)
  const endIdx = raw.indexOf(endMarker)
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('projects.ts 结构异常，无法定位 projects 数组')
  }
  // 找到数组结束的 ']'
  let depth = 0
  let arrayEnd = -1
  for (let i = startIdx + startMarker.length - 1; i < raw.length; i++) {
    const c = raw[i]
    if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) { arrayEnd = i; break }
    }
  }
  if (arrayEnd === -1) throw new Error('找不到 projects 数组结束位置')
  return {
    head: raw.slice(0, startIdx + startMarker.length),
    body: raw.slice(startIdx + startMarker.length, arrayEnd),
    tail: raw.slice(arrayEnd) // 从 ']' 到末尾
  }
}

// 把 body 内容解析成 JSON 对象数组（不严谨，但够用）
// 把 bg('xxx.png') 转成 { __bg: 'xxx.png' }，把 url 字符串还原
function bodyToJson(body) {
  // 替换 bg('xxx') / bg("xxx") 为占位字符串
  let s = body.replace(/bg\(\s*['"]([^'"]+)['"]\s*\)/g, (_m, name) => `"__BG__${name}"`)
  // 用 Function 解析（信任本地数据）
  // eslint-disable-next-line no-new-func
  const arr = new Function(`return [${s}]`)()
  return arr
}

function jsonToBody(arr) {
  // 把每个对象序列化成 TS 字面量（保留 bg() 调用）
  const lines = arr.map((p) => {
    const gallery = (p.gallery || [])
      .map((g) => `      bg(${JSON.stringify(stripBg(g))})`)
      .join(',\n')
    const tags = (p.tags || []).map((t) => JSON.stringify(t)).join(', ')
    return `  {
    id: ${JSON.stringify(p.id)},
    title: ${JSON.stringify(p.title)},
    tagline: ${JSON.stringify(p.tagline)},
    description:
      ${JSON.stringify(p.description)},
    category: ${JSON.stringify(p.category)},
    year: ${Number(p.year) || new Date().getFullYear()},
    cover: bg(${JSON.stringify(stripBg(p.cover))}),
    surface: ${JSON.stringify(p.surface)},
    gallery: [
${gallery}
    ],
    tags: [${tags}]
  }`
  })
  return '\n' + lines.join(',\n') + '\n'
}

function stripBg(v) {
  if (!v) return ''
  if (v.startsWith('__BG__')) return v.slice(6)
  return v
}

// ===== API：读取项目 =====
app.get('/api/projects', requireAuth, async (_req, res) => {
  try {
    const raw = await readFile(PROJECTS_FILE, 'utf-8')
    const { body } = splitFile(raw)
    const arr = bodyToJson(body)
    // 把 cover/gallery 中的 __BG__ 还原成纯文件名展示
    const cleaned = arr.map((p) => ({
      ...p,
      cover: stripBg(p.cover),
      gallery: (p.gallery || []).map(stripBg)
    }))
    res.json(cleaned)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ===== API：保存项目 =====
app.post('/api/projects', requireAuth, async (req, res) => {
  try {
    const arr = req.body
    if (!Array.isArray(arr)) return res.status(400).json({ error: '数据必须是数组' })
    const raw = await readFile(PROJECTS_FILE, 'utf-8')
    const { head, tail } = splitFile(raw)
    // 把前端传来的 cover/gallery 字符串包装成 __BG__ 标记，再生成 ts
    const wrapped = arr.map((p) => ({
      ...p,
      cover: '__BG__' + stripBg(p.cover),
      gallery: (p.gallery || []).map((g) => '__BG__' + stripBg(g))
    }))
    const newBody = jsonToBody(wrapped)
    await writeFile(PROJECTS_FILE, head + newBody + tail, 'utf-8')
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ===== API：列出图片 =====
app.get('/api/images', requireAuth, async (_req, res) => {
  try {
    const dir = path.join(ROOT, 'src', 'assets', 'portfolio')
    const fs = await import('node:fs/promises')
    const files = await fs.readdir(dir)
    res.json(files.filter((f) => /\.(png|jpe?g|webp)$/i.test(f)))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ===== API：构建并推送到 GitHub =====
app.post('/api/publish', requireAuth, async (req, res) => {
  const message = (req.body?.message || '更新作品集').replace(/"/g, "'")
  const run = (cmd) => new Promise((resolve, reject) => {
    exec(cmd, { cwd: ROOT, maxBuffer: 1024 * 1024 * 20 }, (err, stdout, stderr) => {
      if (err) reject(new Error(stderr || err.message))
      else resolve(stdout + stderr)
    })
  })
  try {
    const out = []
    out.push('--- npm run build ---')
    out.push(await run('npm run build'))
    out.push('--- git add ---')
    out.push(await run('git add -A'))
    out.push('--- git commit ---')
    try {
      out.push(await run(`git commit -m "${message}"`))
    } catch (e) {
      out.push('（无新变更或提交失败）' + e.message)
    }
    out.push('--- git push ---')
    out.push(await run('git push'))
    res.json({ ok: true, log: out.join('\n\n') })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
})

app.get('/', (_req, res) => res.redirect('/admin.html'))

app.listen(PORT, () => {
  console.log(`\n✅ 后台已启动：http://localhost:${PORT}/admin.html`)
  console.log(`   密码：${PASSWORD}\n`)
})
