# Apple Inspired Portfolio

按 [`DESIGN.md`](./DESIGN.md) 规范构建的交互作品集网站。

## 技术栈

- Vite 5 + React 18 + TypeScript
- Tailwind CSS（设计令牌按 DESIGN.md 配置）
- Framer Motion（页面过渡 / 视差 / Layout 动画）
- React Router v6

## 启动

```bash
npm install
npm run dev
```

默认在 `http://localhost:5173` 打开。

## 目录结构

```
src/
  App.tsx              路由 + 页面过渡
  main.tsx             入口
  index.css            Tailwind + 组件层（btn/tile/sticky-bar 等）
  components/
    GlobalNav.tsx      顶部黑色细 nav（响应式 hamburger）
    SubNav.tsx         Frosted glass 子导航
    ProductTile.tsx    交替明暗作品 tile（带产品阴影）
    Footer.tsx         Parchment 底部
  pages/
    Home.tsx           Hero + 视差 + 交替 tile + 引言区
    Work.tsx           搜索 + 分类筛选 + 卡片网格
    Detail.tsx         作品详情 + 轮播 + Sticky Bar
    About.tsx
    Contact.tsx
  data/
    projects.ts        作品数据（替换为真实内容即可）
```

## 设计令牌

`tailwind.config.js` 把 DESIGN.md 里的 colors / typography / spacing / radius 映射成 Tailwind 工具类。例如：

- 颜色：`bg-canvas / bg-parchment / bg-tile-1 / text-primary`
- 字号：`text-hero-display / text-display-lg / text-body-base / text-tagline`
- 圆角：`rounded-pill / rounded-lg / rounded-md / rounded-sm`
- 间距：`p-section / py-apple-xxl / gap-apple-lg`
- 阴影：`shadow-product`（系统中唯一的产品阴影）
- 组件层：`.btn-primary / .btn-pearl / .tile / .sub-nav-frosted / .sticky-bar`

## 关键交互

- 路由切换淡入淡出
- 卡片 hover 微缩放、按钮 active scale(0.95)
- Hero 副标题随滚动视差淡出
- 作品集分类切换：`layoutId` 共享胶囊滑动
- 网格筛选：进出场动画 + layout 重排
- 详情页轮播：`AnimatePresence` 切换 + 缩略图选中
- 详情页底部 Frosted Sticky Bar

## 替换为真实内容

1. 编辑 `src/data/projects.ts`，把 `cover` / `gallery`（目前是 CSS 渐变占位）改成真实图片 URL：

```ts
cover: '/images/aurora-cover.jpg',
gallery: ['/images/aurora-1.jpg', '/images/aurora-2.jpg']
```

并把 `ProductTile.tsx` / `Detail.tsx` 中 `style={{ background: ... }}` 改成 `<img src={...} />`。

2. 替换 `GlobalNav.tsx` 顶部的占位 logo。

## 浏览器支持

`backdrop-filter` 在 Safari/Chromium/Firefox 现代版本均已支持，IE 不支持。
