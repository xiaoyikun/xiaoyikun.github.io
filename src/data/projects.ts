// 作品数据：肖奕堃 · 虚幻引擎 3D 场景美术（灯光方向）作品集
// 类型：环境灯光 / 重打光 / PBR 全流程 / 角色灯光 / 环境美术

// 通过 Vite 的 import.meta.glob 一次性导入所有作品图（eager + url 形式）
const imageModules = import.meta.glob('../assets/portfolio/*.png', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const img = (name: string): string => {
  const key = `../assets/portfolio/${name}`
  const url = imageModules[key]
  if (!url) {
    console.warn('[projects] missing image:', name)
    return ''
  }
  return url
}

export type Category = 'lighting' | 'relight' | 'pbr' | 'character' | 'env'

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  category: Category
  year: number
  cover: string
  surface: 'light' | 'parchment' | 'dark' | 'dark-2' | 'dark-3'
  gallery: string[]
  tags: string[]
}

export const CATEGORIES: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: '全部作品' },
  { key: 'lighting', label: '环境灯光' },
  { key: 'relight', label: '重打光练习' },
  { key: 'pbr', label: 'PBR 全流程' },
  { key: 'character', label: '角色灯光' },
  { key: 'env', label: '环境美术' }
]

// 把图片包装成 background CSS（与组件现有实现保持一致）
const bg = (name: string) => `url(${img(name)}) center/cover no-repeat`

export const projects: Project[] = [
  {
    id: "tod-s1",
    title: "TOD · 场景一",
    tagline: "一日之间，光与时间的叙事。",
    description:
      "基于 Unreal Engine 5 / Lumen 的昼夜循环灯光练习。通过定向光、体积雾、Sky Atmosphere 与 Exponential Height Fog 的组合，刻画同一空间在不同时段下的氛围语义。资产来自 FAB。",
    category: "lighting",
    year: 2025,
    cover: bg("tod-s1-01.png"),
    surface: "dark",
    gallery: [
      bg("tod-s1-01.png"),
      bg("tod-s1-02.png"),
      bg("tod-s1-03.png"),
      bg("tod-s1-04.png")
    ],
    tags: ["UE5", "Lumen", "TOD", "体积光"]
  },
  {
    id: "tod-s2",
    title: "TOD · 场景二",
    tagline: "另一空间的昼夜流转。",
    description:
      "第二组场景练习，重点研究同种建筑/植被构图下，光线随时间变化时的色温、阴影长度与剪影关系。资产来自 FAB。",
    category: "lighting",
    year: 2025,
    cover: bg("tod-s2-01.png"),
    surface: "dark-2",
    gallery: [
      bg("tod-s2-01.png"),
      bg("tod-s2-02.png"),
      bg("tod-s2-03.png"),
      bg("tod-s2-04.png")
    ],
    tags: ["UE5", "Lumen", "TOD", "色温"]
  },
  {
    id: "tod-s3",
    title: "TOD · 场景三",
    tagline: "光影的两种切片。",
    description:
      "聚焦同一空间在两个关键时段的对照：从清晨到傍晚，验证布光节奏与体积光在不同时段下的可读性。资产来自 FAB。",
    category: "lighting",
    year: 2025,
    cover: bg("tod-s3-01.png"),
    surface: "dark-3",
    gallery: [
      bg("tod-s3-01.png"),
      bg("tod-s3-02.png")
    ],
    tags: ["UE5", "Lumen", "TOD"]
  },
  {
    id: "tod-s4",
    title: "TOD · 场景四",
    tagline: "一帧时刻。",
    description:
      "单帧角色氛围练习",
    category: "lighting",
    year: 2025,
    cover: bg("tod-s4-01.png"),
    surface: "dark",
    gallery: [
      bg("tod-s4-01.png")
    ],
    tags: ["UE5", "Lumen", "TOD"]
  },
  {
    id: "relight",
    title: "同场景多版本点亮",
    tagline: "同一空间，不同情绪。",
    description:
      "在固定场景资产下，探索从冷色、暖色叙事到戏剧化夜景等多种灯光风格，研究色温、对比、Key/Fill/Rim 三段式布光在同一构图下的情绪差异。",
    category: "relight",
    year: 2025,
    cover: bg("relight-01.png"),
    surface: "dark-2",
    gallery: [
      bg("relight-01.png"),
      bg("relight-02.png"),
      bg("relight-03.png"),
      bg("relight-04.png"),
      bg("relight-05.png"),
      bg("relight-06.png"),
      bg("relight-07.png"),
      bg("relight-08.png"),
      bg("relight-09.png"),
      bg("relight-10.png")
    ],
    tags: ["UE5", "Lumen", "重打光", "布光语言"]
  },
  {
    id: "new-1778584781117",
    title: "同场景多版本点亮",
    tagline: "",
    description:
      "在固定场景资产下，探索从冷色、暖色叙事到戏剧化夜景等多种灯光风格，研究色温、对比、Key/Fill/Rim 三段式布光在同一构图下的情绪差异。",
    category: "lighting",
    year: 2025,
    cover: bg("relight-11.png"),
    surface: "dark",
    gallery: [
      bg("relight-11.png"),
      bg("relight-12.png"),
      bg("relight-13.png"),
      bg("relight-14.png"),
      bg("relight-15.png"),
      bg("relight-16.png")
    ],
    tags: ["UE5", "Lumen", "重打光", "布光语言"]
  },
  {
    id: "jp-garden",
    title: "日式庭院 · PBR 全流程",
    tagline: "从一棵树到一座院子。",
    description:
      "PBR 全流程练习：建模、UV、贴图、材质、布景到最终灯光合成。包含树木、建筑、石材等独立资产展示，以及无光照、粗糙度、细节光照通道的对比，验证材质在不同光照条件下的稳定性。",
    category: "pbr",
    year: 2025,
    cover: bg("jp-garden-01.png"),
    surface: "parchment",
    gallery: [
      bg("jp-garden-01.png"),
      bg("jp-garden-02.png"),
      bg("jp-garden-03.png"),
      bg("jp-garden-04.png"),
      bg("jp-garden-05.png"),
      bg("jp-garden-06.png"),
      bg("jp-garden-07.png"),
      bg("jp-garden-08.png"),
      bg("jp-garden-09.png")
    ],
    tags: ["PBR", "日式", "全流程", "资产展示"]
  },
  {
    id: "bamboo",
    title: "竹林禅院",
    tagline: "剑光劈开竹叶的刹那。",
    description:
      "环境美术作品。剑客静立当场，恶战扬起的烟尘尚未散尽，断竹横斜、血浸青石。研究残败叙事下的光影层次与气氛构建——风穿过残破的竹林，竹叶摩擦的声响在空荡的庭院里久久回荡。",
    category: "env",
    year: 2025,
    cover: bg("bamboo-01.png"),
    surface: "dark",
    gallery: [
      bg("bamboo-01.png"),
      bg("env-01.png"),
      bg("env-02.png")
    ],
    tags: ["环境美术", "武侠", "叙事场景"]
  },
  {
    id: "church",
    title: "废弃教堂",
    tagline: "神性退场之后的光。",
    description:
      "废弃教堂主题环境美术作品。在破败的彩窗、坍塌的拱顶与漂浮尘埃之间，研究神性空间在被时间遗弃后的光线表达——体积光、God Ray 与冷暖对比，让寂静成为画面的主角。",
    category: "env",
    year: 2025,
    cover: bg("church-01.png"),
    surface: "dark-3",
    gallery: [
      bg("church-01.png"),
      bg("church-02.png")
    ],
    tags: ["环境美术", "体积光", "废墟"]
  },
  {
    id: "char-light",
    title: "角色灯光光比练习",
    tagline: "一束光，一个角色。",
    description:
      "角色三点布光与电影感光比练习，研究 Key Light 强度、Fill Light 比例与 Rim Light 角度对人物气质的塑形作用。",
    category: "character",
    year: 2025,
    cover: bg("char-light-01.png"),
    surface: "dark",
    gallery: [
      bg("char-light-01.png")
    ],
    tags: ["角色灯光", "光比", "影视化"]
  }
]

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
