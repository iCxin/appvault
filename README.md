<div align="center">
  <img src="assets/favicon.svg" width="76" height="76" alt="AppVault" />
  <h1>AppVault · 应用仓</h1>
  <p><strong>软件，从官网开始。</strong></p>
  <p>一个由社区维护的软件官方下载索引。</p>
  <p>
    <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-9BCB3B?style=flat-square" />
    <img alt="10,000 Apps" src="https://img.shields.io/badge/apps-10%2C000-CCF25F?style=flat-square" />
    <img alt="Pure Static" src="https://img.shields.io/badge/build-none-15170F?style=flat-square" />
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-CCF25F?style=flat-square" />
  </p>
</div>

---

## 为什么做这个项目

盗版软件、捆绑安装包和“高速下载器”是恶意程序最常见的传播渠道。AppVault 的目标很简单：**把软件的官方下载入口，放在一个干净、快速、可信的页面里。**

- 精选条目只收录软件官网或官方发布渠道，不收录第三方下载站。
- 不托管安装包，不分发文件，不做下载加速与推广插入。
- Windows、macOS、Linux、Android、iOS 分平台标注，直达对应版本。
- 纯静态、零构建、零运行时依赖，打开即用。
- 开源共建：精选数据人工维护，扩展目录由公开数据自动生成。

当前收录 **10,000 款软件**：96 款人工精选 + 9,904 条 Homebrew 扩展目录，覆盖 12 个分类与 5 大平台，共 10,000+ 个下载入口。

## 功能

- 搜索与结果紧邻：搜索框位于软件目录顶部，输入后结果就在下方。
- 图标优先使用官方图标；没有可用的官方图标时，使用品牌色首字母。
- 实时搜索：支持中英文名称、别名、分类与用途关键词，覆盖精选与扩展目录。
- 分类与平台筛选：浏览器、办公、开发、AI、设计、影音等，扩展库单独成类。
- 详情抽屉：分平台展示官方下载入口，一键复制官网链接，并标注数据来源。
- 分页加载：一次渲染 36 条，万级目录也能保持响应速度。
- 深色 / 浅色主题，跟随系统并记忆偏好。
- 键盘操作：`/` 或 `Ctrl/Cmd + K` 聚焦搜索，`Esc` 关闭详情。
- 响应式布局：桌面网格、移动端底部抽屉。
- 可分享的应用深链：`/#/app/chrome`。

## 数据来源与质量分层

| 层级 | 数量 | 来源 | 说明 |
| --- | --- | --- | --- |
| 人工精选 | 96 | 逐条核验 | 中文描述、多平台官方下载入口、官方图标优先 |
| 扩展目录 | 9,904 | [Homebrew](https://formulae.brew.sh/) 公开 API | macOS 条目，官方主页/下载链接来自元数据，未逐条复核；使用首字母图标 |

扩展目录由 [tools/build-extended.mjs](tools/build-extended.mjs) 从 Homebrew Cask / Formula API 生成，去重后写入 [data/extended.js](data/extended.js)。站点会在详情中标注 `Homebrew Cask` / `Homebrew Formula` 来源。

## 在线预览

[https://icxin.github.io/appvault/](https://icxin.github.io/appvault/)

## 本地运行

项目没有构建步骤，克隆后直接用任意静态服务器打开即可：

```bash
git clone https://github.com/<your-name>/appvault.git
cd appvault

# 任选一种
python -m http.server 8000
# 或
npx serve .
```

访问 `http://localhost:8000`。由于数据使用本地 JS 文件而非远程请求，直接双击 `index.html` 也可以正常浏览。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库，把本项目推送到 `main` 分支。
2. 打开仓库 **Settings → Pages**，将 **Source** 设置为 **GitHub Actions**。
3. 仓库内的 [.github/workflows/pages.yml](.github/workflows/pages.yml) 会自动构建并发布静态站点。
4. 打开 `assets/js/config.js`，把 `repoUrl` 改为你的仓库地址，站点中的 GitHub、贡献与报错链接就会生效：

```js
window.SITE_CONFIG = {
  repoUrl: 'https://github.com/your-name/appvault'
};
```

## 添加或修正精选软件

人工精选数据在 [data/apps.js](data/apps.js)。新增一款软件只需在 `APPS` 数组中追加一个对象：

```js
{
  id: 'my-app',                 // 唯一标识，小写字母与连字符
  name: 'My App',              // 英文名或通用名
  nameZh: '我的应用',           // 中文名
  aliases: ['myapp', '别名'],   // 搜索别名，便于中文与简称命中
  category: 'system',          // 必须是 CATEGORIES 中已有的 id
  tagline: '一句话介绍。',
  official: 'https://example.com/',   // 官网
  license: '免费 · 开源',
  color: '#1B5EAA',            // 图标底色
  icon: 'myapp',               // Simple Icons slug，可留空使用首字母
  iconFile: 'myapp-official.png', // 可选：官方图标文件名（assets/icons/）
  featured: false,             // 是否在推荐排序中优先
  downloads: [
    dl('windows', 'https://example.com/download/windows'),
    dl('macos', 'https://example.com/download/mac'),
    dl('linux', 'https://example.com/download/linux')
  ]
}
```

详细字段说明与收录标准见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 扩展目录

[data/extended.js](data/extended.js) 为自动生成文件，请勿手工编辑。需要更新时运行：

```bash
node tools/build-extended.mjs
```

脚本会从 Homebrew Cask / Formula API 拉取数据、按名称与官网去重，并生成扩展目录。该目录仅包含 macOS 条目，链接来自公开元数据，未逐条人工复核；如需高质量多平台条目，请提交到精选数据。

## 项目结构

```
appvault/
├── index.html                  # 页面结构
├── assets/
│   ├── css/style.css           # 设计系统与响应式样式
│   ├── js/app.js               # 搜索、筛选、分页、抽屉、主题等交互
│   ├── js/config.js            # 仓库地址等站点配置
│   ├── icons/                  # 官方图标与本地品牌图标
│   └── favicon.svg
├── data/
│   ├── apps.js                 # 96 款人工精选（维护入口）
│   └── extended.js             # 9,904 条扩展目录（自动生成）
├── tools/build-extended.mjs    # 扩展目录生成脚本
├── .github/workflows/pages.yml # GitHub Pages 自动部署
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## 设计说明

站点采用暖调纸感底色和酸橙绿强调色，桌面端为目录式卡片网格，移动端为底部抽屉。所有样式与交互均为原生 HTML / CSS / JavaScript，没有框架、字体 CDN 或远程脚本，图标已本地化。扩展目录按每页 36 条增量渲染，搜索与筛选仍在浏览器内即时完成。

## 免责声明

本项目仅提供指向第三方官方网站或公开软件目录的链接索引，不托管、不分发任何软件安装包，与所列软件公司无隶属关系。人工精选条目经过链接核对；扩展目录来自 Homebrew 公开元数据，未逐条人工复核，可能存在失效链接或描述偏差。软件名称、商标与图标归各自权利人所有。下载与安装软件前，请自行确认来源与授权条款。

## License

[MIT](LICENSE) © 2026 AppVault Contributors
