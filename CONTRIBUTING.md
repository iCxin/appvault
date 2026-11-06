# 贡献指南

感谢你愿意帮助 AppVault 保持新鲜。无论是补充一款软件、修正链接，还是改进界面，都欢迎提交 Pull Request。

## 可以贡献什么

- 新增常用软件的官方下载入口。
- 修正已经失效或指向错误的链接。
- 补充遗漏的平台版本（如 Windows ARM64、Linux ARM）。
- 改进搜索、无障碍、响应式或性能。
- 修正文案与错别字。

## 收录标准

1. **只收录官方渠道**：软件官网、官方发布页、官方 GitHub Releases、官方应用商店。
2. **不收录**第三方下载站、绿色版、破解版、修改版、捆绑安装器。
3. **链接可验证**：提交前请在浏览器中实际打开，确认指向正确的官方页面。
4. **一个软件一条数据**：不要把同一软件的不同版本拆成多条；版本差异放进 `downloads`。
5. **分类准确**：`category` 必须是 `data/apps.js` 中 `CATEGORIES` 已存在的 id。

## 添加一款软件

打开 [data/apps.js](../data/apps.js)，在 `APPS` 数组中找到合适的位置追加对象：

```js
{
  id: 'my-app',
  name: 'My App',
  nameZh: '我的应用',
  aliases: ['myapp', '别名'],
  category: 'system',
  tagline: '一句话说明它是什么、适合谁。',
  official: 'https://example.com/',
  license: '免费 · 开源',
  color: '#1B5EAA',
  icon: 'myapp',
  featured: false,
  downloads: [
    dl('windows', 'https://example.com/download/windows'),
    dl('macos', 'https://example.com/download/mac'),
    dl('linux', 'https://example.com/download/linux'),
    dl('android', 'https://example.com/download/android'),
    dl('ios', 'https://example.com/download/ios')
  ]
}
```

### 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 唯一标识，小写字母、数字与连字符，用于深链 `#/app/{id}` |
| `name` | 是 | 英文名或软件的通用名称 |
| `nameZh` | 是 | 中文名；没有官方中文名时填写常用译名或与 `name` 一致 |
| `aliases` | 否 | 搜索别名数组，建议包含简称、拼音与常见叫法 |
| `category` | 是 | 分类 id，必须存在于 `CATEGORIES` |
| `tagline` | 是 | 一句话介绍，控制在 60 字以内 |
| `official` | 是 | 官方网站地址 |
| `license` | 是 | 如 `免费`、`免费 · 开源`、`免费增值`、`付费订阅`、`试用付费` |
| `color` | 是 | 图标底色，十六进制颜色；建议使用品牌主色 |
| `icon` | 否 | [Simple Icons](https://simpleicons.org/) 的 slug；留空则显示首字母 |
| `featured` | 否 | 布尔值，推荐排序时优先展示 |
| `downloads` | 是 | 下载入口数组，至少一项 |

### 下载入口

使用文件顶部的 `dl()` 辅助函数：

```js
dl('windows', 'https://example.com/download')
dl('android', 'https://example.com/download', 'Android 版 · 某个发行版')
```

支持的平台 id：`windows`、`macos`、`linux`、`android`、`ios`。

## 图标

图标文件统一保存在 `assets/icons/` 中，运行时不请求外部 CDN。

- 若软件在 Simple Icons 有收录，填写对应 slug。
- 图标颜色由站点根据 `color` 的亮度自动选择：浅色底使用 `{slug}-ink.svg`（深色图标），深色底使用 `{slug}.svg`（白色图标）。
- 找不到合适的 slug 时，把 `icon` 留空（或删除该字段），站点会显示中文名首字母。

新增图标可手动准备 SVG 文件放入 `assets/icons/`：白色版本命名为 `{slug}.svg`，深色版本命名为 `{slug}-ink.svg`。图标来源建议使用 [Simple Icons](https://simpleicons.org/)（CC0）或 [Iconify](https://iconify.design/) 中的单色图标集。

## 本地检查

1. 启动静态服务器：`python -m http.server 8000`。
2. 打开 `http://localhost:8000`。
3. 确认：
   - 搜索中英文名与别名均能命中；
   - 分类、平台筛选正常；
   - 卡片可打开详情抽屉，所有下载链接可访问；
   - 深色与浅色主题显示正常；
   - 移动端宽度（约 390px）下布局无横向滚动。

## 提交 Pull Request

1. Fork 仓库并创建分支：`git checkout -b feat/add-my-app`。
2. 只修改必要文件，保持数据格式与现有风格一致。
3. 提交信息建议使用：`feat: add My App` / `fix: update Foo download link`。
4. 在 PR 描述中说明：
   - 新增或修改了哪款软件；
   - 官方来源链接；
   - 你已实际验证过链接可用。

## 行为准则

请保持友善、就事论事。维护者可能会要求补充来源或调整分类，这是为了保证索引的可信度，而不是针对个人。

再次感谢你的贡献。
