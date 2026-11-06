/* =========================================================
   AppVault 软件数据
   ---------------------------------------------------------
   添加一款软件：在 APPS 数组中追加一个对象即可，字段说明
   见仓库根目录 CONTRIBUTING.md。
   所有下载链接请务必指向软件官方渠道。
   ========================================================= */

(function () {
  'use strict';

  const OS_LABELS = {
    windows: 'Windows 版',
    macos: 'macOS 版',
    linux: 'Linux 版',
    android: 'Android 版',
    ios: 'iOS 版'
  };

  function dl(os, url, label) {
    return {
      os: os,
      url: url,
      label: label || OS_LABELS[os]
    };
  }

  const CATEGORIES = [
    { id: 'browser', name: '浏览器' },
    { id: 'office', name: '办公效率' },
    { id: 'dev', name: '开发工具' },
    { id: 'ai', name: 'AI 工具' },
    { id: 'design', name: '设计创意' },
    { id: 'media', name: '影音媒体' },
    { id: 'social', name: '通讯社交' },
    { id: 'cloud', name: '云存储' },
    { id: 'system', name: '系统工具' },
    { id: 'security', name: '安全隐私' },
    { id: 'remote', name: '远程控制' },
    { id: 'game', name: '游戏娱乐' }
  ];

  const APPS = [
    /* ---------- 浏览器 ---------- */
    {
      id: 'chrome',
      name: 'Google Chrome',
      nameZh: '谷歌浏览器',
      aliases: ['chrome', 'google chrome', '谷歌', '谷歌浏览器', '浏览器'],
      category: 'browser',
      tagline: '全球使用最广泛的现代浏览器，扩展生态完善，同步体验成熟。',
      official: 'https://www.google.com/chrome/',
      license: '免费',
      color: '#4285F4',
      icon: 'googlechrome',
      featured: true,
      downloads: [
        dl('windows', 'https://www.google.com/chrome/'),
        dl('macos', 'https://www.google.com/chrome/'),
        dl('linux', 'https://www.google.com/chrome/?platform=linux'),
        dl('android', 'https://play.google.com/store/apps/details?id=com.android.chrome'),
        dl('ios', 'https://apps.apple.com/app/google-chrome/id535886823')
      ]
    },
    {
      id: 'edge',
      name: 'Microsoft Edge',
      nameZh: '微软 Edge',
      aliases: ['edge', 'microsoft edge', '微软浏览器', 'ie'],
      category: 'browser',
      tagline: 'Windows 内置的 Chromium 浏览器，兼顾性能、兼容性与生产力工具。',
      official: 'https://www.microsoft.com/edge',
      license: '免费',
      color: '#0F7BC4',
      icon: 'microsoftedge',
      featured: true,
      downloads: [
        dl('windows', 'https://www.microsoft.com/edge/download'),
        dl('macos', 'https://www.microsoft.com/edge/download'),
        dl('linux', 'https://www.microsoft.com/edge/download'),
        dl('android', 'https://www.microsoft.com/edge/download'),
        dl('ios', 'https://www.microsoft.com/edge/download')
      ]
    },
    {
      id: 'firefox',
      name: 'Mozilla Firefox',
      nameZh: '火狐浏览器',
      aliases: ['firefox', 'mozilla', '火狐', '火狐浏览器'],
      category: 'browser',
      tagline: '由 Mozilla 维护的开源浏览器，以隐私保护和开放标准著称。',
      official: 'https://www.mozilla.org/firefox/',
      license: '免费 · 开源',
      color: '#E66000',
      icon: 'firefox',
      featured: true,
      downloads: [
        dl('windows', 'https://www.mozilla.org/firefox/new/'),
        dl('macos', 'https://www.mozilla.org/firefox/new/'),
        dl('linux', 'https://www.mozilla.org/firefox/new/'),
        dl('android', 'https://www.mozilla.org/firefox/browsers/mobile/android/'),
        dl('ios', 'https://www.mozilla.org/firefox/browsers/mobile/ios/')
      ]
    },
    {
      id: 'brave',
      name: 'Brave',
      nameZh: 'Brave 浏览器',
      aliases: ['brave', 'brave browser'],
      category: 'browser',
      tagline: '默认拦截广告与追踪器的开源浏览器，内置隐私搜索与奖励计划。',
      official: 'https://brave.com/download/',
      license: '免费 · 开源',
      color: '#FB542B',
      icon: 'brave',
      downloads: [
        dl('windows', 'https://brave.com/download/'),
        dl('macos', 'https://brave.com/download/'),
        dl('linux', 'https://brave.com/download/'),
        dl('android', 'https://brave.com/download/'),
        dl('ios', 'https://brave.com/download/')
      ]
    },
    {
      id: 'opera',
      name: 'Opera',
      nameZh: 'Opera 浏览器',
      aliases: ['opera', '欧朋'],
      category: 'browser',
      tagline: '自带免费 VPN、工作区与侧边栏的浏览器，适合多任务浏览。',
      official: 'https://www.opera.com/download',
      license: '免费',
      color: '#D62D20',
      icon: 'opera',
      downloads: [
        dl('windows', 'https://www.opera.com/download'),
        dl('macos', 'https://www.opera.com/download'),
        dl('linux', 'https://www.opera.com/download'),
        dl('android', 'https://www.opera.com/download'),
        dl('ios', 'https://www.opera.com/download')
      ]
    },
    {
      id: 'vivaldi',
      name: 'Vivaldi',
      nameZh: 'Vivaldi 浏览器',
      aliases: ['vivaldi', '维瓦尔第'],
      category: 'browser',
      tagline: '高度可定制的桌面浏览器，内置标签管理、笔记与邮件客户端。',
      official: 'https://vivaldi.com/download/',
      license: '免费',
      color: '#C7362E',
      icon: 'vivaldi',
      downloads: [
        dl('windows', 'https://vivaldi.com/download/'),
        dl('macos', 'https://vivaldi.com/download/'),
        dl('linux', 'https://vivaldi.com/download/'),
        dl('android', 'https://vivaldi.com/download/'),
        dl('ios', 'https://vivaldi.com/download/')
      ]
    },

    /* ---------- 办公效率 ---------- */
    {
      id: 'microsoft365',
      name: 'Microsoft 365',
      nameZh: '微软 365',
      aliases: ['office', 'microsoft office', 'microsoft365', '微软办公', 'word', 'excel', 'ppt'],
      category: 'office',
      tagline: 'Word、Excel、PowerPoint 与 Outlook 组成的办公套件，支持云端协作。',
      official: 'https://www.microsoft.com/microsoft-365',
      license: '付费订阅',
      color: '#D83B01',
      icon: 'microsoft365',
      featured: true,
      downloads: [
        dl('windows', 'https://www.microsoft.com/microsoft-365/download-office'),
        dl('macos', 'https://www.microsoft.com/microsoft-365/download-office'),
        dl('android', 'https://www.microsoft.com/microsoft-365/mobile'),
        dl('ios', 'https://www.microsoft.com/microsoft-365/mobile')
      ]
    },
    {
      id: 'wps',
      name: 'WPS Office',
      nameZh: 'WPS Office',
      aliases: ['wps', '金山', '金山办公', 'word', 'excel'],
      category: 'office',
      tagline: '金山办公出品的国产办公套件，兼容主流 Office 文档格式。',
      official: 'https://www.wps.cn/',
      license: '免费增值',
      color: '#D9382B',      downloads: [
        dl('windows', 'https://www.wps.cn/'),
        dl('macos', 'https://www.wps.cn/'),
        dl('linux', 'https://www.wps.cn/'),
        dl('android', 'https://www.wps.cn/'),
        dl('ios', 'https://www.wps.cn/')
      ]
    },
    {
      id: 'libreoffice',
      name: 'LibreOffice',
      nameZh: 'LibreOffice',
      aliases: ['libreoffice', 'libre office', '开源办公'],
      category: 'office',
      tagline: '文档基金会维护的自由办公套件，完全免费且可离线使用。',
      official: 'https://www.libreoffice.org/download/',
      license: '免费 · 开源',
      color: '#18A303',
      icon: 'libreoffice',
      downloads: [
        dl('windows', 'https://www.libreoffice.org/download/'),
        dl('macos', 'https://www.libreoffice.org/download/'),
        dl('linux', 'https://www.libreoffice.org/download/')
      ]
    },
    {
      id: 'onlyoffice',
      name: 'ONLYOFFICE',
      nameZh: 'ONLYOFFICE 文档',
      aliases: ['onlyoffice', 'only office'],
      category: 'office',
      tagline: '兼容微软格式的开源办公与协作套件，适合团队文档管理。',
      official: 'https://www.onlyoffice.com/download-desktop.aspx',
      license: '免费 · 开源',
      color: '#FF6F3D',
      icon: 'onlyoffice',
      downloads: [
        dl('windows', 'https://www.onlyoffice.com/download-desktop.aspx'),
        dl('macos', 'https://www.onlyoffice.com/download-desktop.aspx'),
        dl('linux', 'https://www.onlyoffice.com/download-desktop.aspx'),
        dl('android', 'https://www.onlyoffice.com/download.aspx'),
        dl('ios', 'https://www.onlyoffice.com/download.aspx')
      ]
    },
    {
      id: 'acrobat',
      name: 'Adobe Acrobat Reader',
      nameZh: 'Acrobat 阅读器',
      aliases: ['acrobat', 'adobe reader', 'pdf', 'pdf阅读器'],
      category: 'office',
      tagline: 'Adobe 官方的免费 PDF 阅读器，支持查看、批注、填写与签署。',
      official: 'https://get.adobe.com/reader/',
      license: '免费',
      color: '#EC1C24',
      icon: 'adobeacrobatreader',
      downloads: [
        dl('windows', 'https://get.adobe.com/reader/'),
        dl('macos', 'https://get.adobe.com/reader/'),
        dl('android', 'https://get.adobe.com/reader/'),
        dl('ios', 'https://get.adobe.com/reader/')
      ]
    },
    {
      id: 'notion',
      name: 'Notion',
      nameZh: 'Notion',
      aliases: ['notion', '笔记', '知识库'],
      category: 'office',
      tagline: '把笔记、文档、数据库与项目管理整合在一起的工作空间。',
      official: 'https://www.notion.so/desktop',
      license: '免费增值',
      color: '#191919',
      icon: 'notion',
      featured: true,
      downloads: [
        dl('windows', 'https://www.notion.so/desktop'),
        dl('macos', 'https://www.notion.so/desktop'),
        dl('android', 'https://play.google.com/store/apps/details?id=notion.id'),
        dl('ios', 'https://apps.apple.com/app/notion-notes-docs-tasks/id1232780281')
      ]
    },
    {
      id: 'obsidian',
      name: 'Obsidian',
      nameZh: '黑曜石笔记',
      aliases: ['obsidian', '黑曜石', 'markdown'],
      category: 'office',
      tagline: '基于本地 Markdown 文件的知识库工具，数据完全掌握在自己手中。',
      official: 'https://obsidian.md/download',
      license: '免费增值',
      color: '#6C4BD8',
      icon: 'obsidian',
      featured: true,
      downloads: [
        dl('windows', 'https://obsidian.md/download'),
        dl('macos', 'https://obsidian.md/download'),
        dl('linux', 'https://obsidian.md/download'),
        dl('android', 'https://obsidian.md/download'),
        dl('ios', 'https://obsidian.md/download')
      ]
    },
    {
      id: 'typora',
      name: 'Typora',
      nameZh: 'Typora 编辑器',
      aliases: ['typora', 'markdown', '写作'],
      category: 'office',
      tagline: '所见即所得的极简 Markdown 编辑器，专注于写作本身。',
      official: 'https://typora.io/',
      license: '付费',
      color: '#3B3B3B',
      downloads: [
        dl('windows', 'https://typora.io/#download'),
        dl('macos', 'https://typora.io/#download'),
        dl('linux', 'https://typora.io/#download')
      ]
    },
    {
      id: 'xmind',
      name: 'XMind',
      nameZh: 'XMind 思维导图',
      aliases: ['xmind', '思维导图', 'mindmap'],
      category: 'office',
      tagline: '专业思维导图与头脑风暴工具，帮助梳理复杂想法。',
      official: 'https://xmind.app/download/',
      license: '免费增值',
      color: '#E85A0C',
      iconFile: 'xmind-official.png',
      icon: 'xmind',
      downloads: [
        dl('windows', 'https://xmind.app/download/'),
        dl('macos', 'https://xmind.app/download/'),
        dl('linux', 'https://xmind.app/download/'),
        dl('android', 'https://xmind.app/download/'),
        dl('ios', 'https://xmind.app/download/')
      ]
    },
    {
      id: 'zotero',
      name: 'Zotero',
      nameZh: 'Zotero 文献管理',
      aliases: ['zotero', '文献管理', '引用'],
      category: 'office',
      tagline: '开源文献管理与引用工具，自动抓取网页信息并生成参考文献。',
      official: 'https://www.zotero.org/download/',
      license: '免费 · 开源',
      color: '#A61B29',
      icon: 'zotero',
      downloads: [
        dl('windows', 'https://www.zotero.org/download/'),
        dl('macos', 'https://www.zotero.org/download/'),
        dl('linux', 'https://www.zotero.org/download/')
      ]
    },
    {
      id: 'anki',
      name: 'Anki',
      nameZh: 'Anki 记忆卡片',
      aliases: ['anki', '记忆', '背单词', 'flashcard'],
      category: 'office',
      tagline: '基于间隔重复算法的记忆工具，适合语言学习与长期知识记忆。',
      official: 'https://apps.ankiweb.net/',
      license: '免费 · 开源',
      color: '#2A6EBB',
      icon: 'anki',
      downloads: [
        dl('windows', 'https://apps.ankiweb.net/'),
        dl('macos', 'https://apps.ankiweb.net/'),
        dl('linux', 'https://apps.ankiweb.net/'),
        dl('android', 'https://play.google.com/store/apps/details?id=com.ichi2.anki', 'Android 版 · AnkiDroid'),
        dl('ios', 'https://apps.apple.com/app/ankimobile-flashcards/id373493387', 'iOS 版 · AnkiMobile')
      ]
    },

    /* ---------- 开发工具 ---------- */
    {
      id: 'vscode',
      name: 'Visual Studio Code',
      nameZh: 'VS Code',
      aliases: ['vscode', 'vs code', 'visual studio code', '编辑器', '代码'],
      category: 'dev',
      tagline: '微软出品的轻量级代码编辑器，拥有庞大的扩展生态。',
      official: 'https://code.visualstudio.com/',
      license: '免费 · 开源',
      color: '#007ACC',
      icon: 'visualstudiocode',
      featured: true,
      downloads: [
        dl('windows', 'https://code.visualstudio.com/download'),
        dl('macos', 'https://code.visualstudio.com/download'),
        dl('linux', 'https://code.visualstudio.com/download')
      ]
    },
    {
      id: 'idea',
      name: 'IntelliJ IDEA',
      nameZh: 'IDEA',
      aliases: ['idea', 'intellij', 'jetbrains', 'java', 'ide'],
      category: 'dev',
      tagline: 'JetBrains 出品的 Java 集成开发环境，智能补全与重构能力出众。',
      official: 'https://www.jetbrains.com/idea/download/',
      license: '免费增值',
      color: '#1A1A1A',
      icon: 'intellijidea',
      downloads: [
        dl('windows', 'https://www.jetbrains.com/idea/download/'),
        dl('macos', 'https://www.jetbrains.com/idea/download/'),
        dl('linux', 'https://www.jetbrains.com/idea/download/')
      ]
    },
    {
      id: 'sublime',
      name: 'Sublime Text',
      nameZh: 'Sublime Text',
      aliases: ['sublime', 'sublime text', '编辑器'],
      category: 'dev',
      tagline: '启动迅速、响应轻快的跨平台文本编辑器，深受程序员喜爱。',
      official: 'https://www.sublimetext.com/',
      license: '试用付费',
      color: '#E88A00',
      icon: 'sublimetext',
      downloads: [
        dl('windows', 'https://www.sublimetext.com/download'),
        dl('macos', 'https://www.sublimetext.com/download'),
        dl('linux', 'https://www.sublimetext.com/download')
      ]
    },
    {
      id: 'notepadpp',
      name: 'Notepad++',
      nameZh: 'Notepad++',
      aliases: ['notepad++', 'notepad', '记事本', '文本编辑器'],
      category: 'dev',
      tagline: 'Windows 上经典的免费文本编辑器，支持语法高亮与宏。',
      official: 'https://notepad-plus-plus.org/',
      license: '免费 · 开源',
      color: '#2D7D46',
      icon: 'notepadplusplus',
      downloads: [
        dl('windows', 'https://notepad-plus-plus.org/downloads/')
      ]
    },
    {
      id: 'git',
      name: 'Git',
      nameZh: 'Git 版本控制',
      aliases: ['git', '版本控制', 'scm'],
      category: 'dev',
      tagline: '分布式版本控制系统，现代软件协作开发的基础设施。',
      official: 'https://git-scm.com/',
      license: '免费 · 开源',
      color: '#E44C30',
      icon: 'git',
      featured: true,
      downloads: [
        dl('windows', 'https://git-scm.com/downloads'),
        dl('macos', 'https://git-scm.com/downloads'),
        dl('linux', 'https://git-scm.com/downloads')
      ]
    },
    {
      id: 'githubdesktop',
      name: 'GitHub Desktop',
      nameZh: 'GitHub 桌面客户端',
      aliases: ['github desktop', 'github', 'git客户端'],
      category: 'dev',
      tagline: 'GitHub 官方图形化 Git 客户端，简化提交、分支与代码审查流程。',
      official: 'https://desktop.github.com/',
      license: '免费 · 开源',
      color: '#24292F',
      icon: 'github',
      downloads: [
        dl('windows', 'https://desktop.github.com/download/'),
        dl('macos', 'https://desktop.github.com/download/')
      ]
    },
    {
      id: 'postman',
      name: 'Postman',
      nameZh: 'Postman',
      aliases: ['postman', 'api', '接口调试'],
      category: 'dev',
      tagline: 'API 开发、调试与协作平台，覆盖设计、测试和文档全流程。',
      official: 'https://www.postman.com/',
      license: '免费增值',
      color: '#FF6C37',
      icon: 'postman',
      downloads: [
        dl('windows', 'https://www.postman.com/downloads/'),
        dl('macos', 'https://www.postman.com/downloads/'),
        dl('linux', 'https://www.postman.com/downloads/')
      ]
    },
    {
      id: 'docker',
      name: 'Docker Desktop',
      nameZh: 'Docker 桌面版',
      aliases: ['docker', '容器', 'container'],
      category: 'dev',
      tagline: '在本地构建、运行与共享容器应用的完整开发环境。',
      official: 'https://www.docker.com/products/docker-desktop/',
      license: '免费增值',
      color: '#2496ED',
      icon: 'docker',
      downloads: [
        dl('windows', 'https://www.docker.com/products/docker-desktop/'),
        dl('macos', 'https://www.docker.com/products/docker-desktop/'),
        dl('linux', 'https://www.docker.com/products/docker-desktop/')
      ]
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      nameZh: 'Node.js 运行时',
      aliases: ['node', 'nodejs', 'javascript', 'npm'],
      category: 'dev',
      tagline: '基于 V8 的 JavaScript 运行时，用于构建服务端与命令行工具。',
      official: 'https://nodejs.org/',
      license: '免费 · 开源',
      color: '#5FA04E',
      icon: 'nodedotjs',
      downloads: [
        dl('windows', 'https://nodejs.org/en/download'),
        dl('macos', 'https://nodejs.org/en/download'),
        dl('linux', 'https://nodejs.org/en/download')
      ]
    },
    {
      id: 'python',
      name: 'Python',
      nameZh: 'Python 解释器',
      aliases: ['python', 'python3', '编程'],
      category: 'dev',
      tagline: '通用编程语言与标准库发行版，广泛用于数据、自动化与后端开发。',
      official: 'https://www.python.org/',
      license: '免费 · 开源',
      color: '#3776AB',
      icon: 'python',
      downloads: [
        dl('windows', 'https://www.python.org/downloads/'),
        dl('macos', 'https://www.python.org/downloads/'),
        dl('linux', 'https://www.python.org/downloads/')
      ]
    },
    {
      id: 'visualstudio',
      name: 'Visual Studio',
      nameZh: 'Visual Studio',
      aliases: ['visual studio', 'vs', '微软ide'],
      category: 'dev',
      tagline: '微软全功能集成开发环境，适合 .NET、C++ 与桌面应用开发。',
      official: 'https://visualstudio.microsoft.com/',
      license: '免费增值',
      color: '#5C2D91',
      icon: 'visualstudio',
      downloads: [
        dl('windows', 'https://visualstudio.microsoft.com/downloads/'),
        dl('macos', 'https://visualstudio.microsoft.com/downloads/')
      ]
    },
    {
      id: 'androidstudio',
      name: 'Android Studio',
      nameZh: 'Android Studio',
      aliases: ['android studio', '安卓开发', 'android'],
      category: 'dev',
      tagline: 'Android 官方开发环境，集成模拟器、调试器与性能分析工具。',
      official: 'https://developer.android.com/studio',
      license: '免费',
      color: '#2A9D5C',
      icon: 'androidstudio',
      downloads: [
        dl('windows', 'https://developer.android.com/studio'),
        dl('macos', 'https://developer.android.com/studio'),
        dl('linux', 'https://developer.android.com/studio')
      ]
    },
    {
      id: 'xcode',
      name: 'Xcode',
      nameZh: 'Xcode',
      aliases: ['xcode', 'ios开发', 'mac开发'],
      category: 'dev',
      tagline: 'Apple 平台应用开发的官方工具链，包含编译器、模拟器与 Interface Builder。',
      official: 'https://developer.apple.com/xcode/',
      license: '免费',
      color: '#147EFB',
      icon: 'xcode',
      downloads: [
        dl('macos', 'https://developer.apple.com/xcode/')
      ]
    },
    {
      id: 'homebrew',
      name: 'Homebrew',
      nameZh: 'Homebrew 包管理器',
      aliases: ['homebrew', 'brew', '包管理器'],
      category: 'dev',
      tagline: 'macOS 与 Linux 上最常用的包管理器，一条命令安装开发工具。',
      official: 'https://brew.sh/',
      license: '免费 · 开源',
      color: '#E7A51A',
      icon: 'homebrew',
      downloads: [
        dl('macos', 'https://brew.sh/'),
        dl('linux', 'https://brew.sh/')
      ]
    },
    {
      id: 'cursor',
      name: 'Cursor',
      nameZh: 'Cursor 编辑器',
      aliases: ['cursor', 'ai编辑器', 'ai ide'],
      category: 'dev',
      tagline: 'AI 原生的代码编辑器，把补全、问答与重构融进编写流程。',
      official: 'https://cursor.com/',
      license: '免费增值',
      color: '#1F1F1F',
      icon: 'cursor',
      featured: true,
      downloads: [
        dl('windows', 'https://cursor.com/'),
        dl('macos', 'https://cursor.com/'),
        dl('linux', 'https://cursor.com/')
      ]
    },
    {
      id: 'dbeaver',
      name: 'DBeaver',
      nameZh: 'DBeaver 数据库工具',
      aliases: ['dbeaver', '数据库', 'sql'],
      category: 'dev',
      tagline: '通用开源数据库管理工具，支持 MySQL、PostgreSQL、SQLite 等。',
      official: 'https://dbeaver.io/',
      license: '免费增值 · 开源',
      color: '#382923',
      icon: 'dbeaver',
      downloads: [
        dl('windows', 'https://dbeaver.io/download/'),
        dl('macos', 'https://dbeaver.io/download/'),
        dl('linux', 'https://dbeaver.io/download/')
      ]
    },

    /* ---------- AI 工具 ---------- */
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      nameZh: 'ChatGPT',
      aliases: ['chatgpt', 'gpt', 'openai', 'ai'],
      category: 'ai',
      tagline: 'OpenAI 的 AI 对话助手官方客户端，支持桌面与移动设备。',
      official: 'https://chatgpt.com/download/',
      license: '免费增值',
      color: '#0A8F72',
      icon: 'openai',
      featured: true,
      downloads: [
        dl('windows', 'https://chatgpt.com/download/'),
        dl('macos', 'https://chatgpt.com/download/'),
        dl('android', 'https://chatgpt.com/download/'),
        dl('ios', 'https://chatgpt.com/download/')
      ]
    },
    {
      id: 'claude',
      name: 'Claude',
      nameZh: 'Claude',
      aliases: ['claude', 'anthropic', 'ai'],
      category: 'ai',
      tagline: 'Anthropic 的 AI 助手官方客户端，适合长文档阅读与写作协作。',
      official: 'https://claude.ai/download',
      license: '免费增值',
      color: '#C2603F',
      icon: 'anthropic',
      downloads: [
        dl('windows', 'https://claude.ai/download'),
        dl('macos', 'https://claude.ai/download'),
        dl('android', 'https://claude.ai/download'),
        dl('ios', 'https://claude.ai/download')
      ]
    },
    {
      id: 'ollama',
      name: 'Ollama',
      nameZh: 'Ollama 本地模型',
      aliases: ['ollama', '本地大模型', 'llm'],
      category: 'ai',
      tagline: '在本地一键运行开源大模型，数据不出本机，支持命令行与 API。',
      official: 'https://ollama.com/',
      license: '免费 · 开源',
      color: '#1A1A1A',
      icon: 'ollama',
      featured: true,
      downloads: [
        dl('windows', 'https://ollama.com/download'),
        dl('macos', 'https://ollama.com/download'),
        dl('linux', 'https://ollama.com/download')
      ]
    },
    {
      id: 'lmstudio',
      name: 'LM Studio',
      nameZh: 'LM Studio',
      aliases: ['lm studio', 'lmstudio', '本地模型'],
      category: 'ai',
      tagline: '带图形界面的本地大模型运行与对话工具，适合离线实验。',
      official: 'https://lmstudio.ai/',
      license: '免费',
      color: '#4361EE',
      icon: 'lmstudio',
      downloads: [
        dl('windows', 'https://lmstudio.ai/'),
        dl('macos', 'https://lmstudio.ai/'),
        dl('linux', 'https://lmstudio.ai/')
      ]
    },
    {
      id: 'cherrystudio',
      name: 'Cherry Studio',
      nameZh: 'Cherry Studio',
      aliases: ['cherry studio', 'cherrystudio', '多模型'],
      category: 'ai',
      tagline: '开源的多模型 AI 桌面客户端，统一管理不同服务商的对话与知识库。',
      official: 'https://www.cherry-ai.com/',
      license: '免费 · 开源',
      color: '#D93A5C',
      iconFile: 'cherrystudio-official.png',
      downloads: [
        dl('windows', 'https://www.cherry-ai.com/download'),
        dl('macos', 'https://www.cherry-ai.com/download'),
        dl('linux', 'https://www.cherry-ai.com/download')
      ]
    },
    {
      id: 'chatbox',
      name: 'Chatbox',
      nameZh: 'Chatbox AI',
      aliases: ['chatbox', 'ai客户端'],
      category: 'ai',
      tagline: '跨平台 AI 对话客户端，支持多种模型服务与本地 API。',
      official: 'https://chatboxai.app/',
      license: '免费增值 · 开源',
      color: '#2563EB',
      iconFile: 'chatbox-official.png',
      downloads: [
        dl('windows', 'https://chatboxai.app/'),
        dl('macos', 'https://chatboxai.app/'),
        dl('linux', 'https://chatboxai.app/'),
        dl('android', 'https://chatboxai.app/'),
        dl('ios', 'https://chatboxai.app/')
      ]
    },

    /* ---------- 设计创意 ---------- */
    {
      id: 'figma',
      name: 'Figma',
      nameZh: 'Figma 设计工具',
      aliases: ['figma', 'ui设计', '原型', '设计'],
      category: 'design',
      tagline: '浏览器优先的协作式界面设计与原型工具，团队实时共创。',
      official: 'https://www.figma.com/',
      license: '免费增值',
      color: '#D9422C',
      icon: 'figma',
      featured: true,
      downloads: [
        dl('windows', 'https://www.figma.com/downloads/'),
        dl('macos', 'https://www.figma.com/downloads/')
      ]
    },
    {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      nameZh: 'Photoshop',
      aliases: ['photoshop', 'ps', 'adobe', '修图'],
      category: 'design',
      tagline: '行业标准的图像处理与合成软件，覆盖修图、绘画与视觉设计。',
      official: 'https://www.adobe.com/products/photoshop.html',
      license: '付费订阅',
      color: '#1473E6',
      icon: 'adobephotoshop',
      downloads: [
        dl('windows', 'https://www.adobe.com/products/photoshop.html'),
        dl('macos', 'https://www.adobe.com/products/photoshop.html')
      ]
    },
    {
      id: 'gimp',
      name: 'GIMP',
      nameZh: 'GIMP 图像编辑',
      aliases: ['gimp', '图像编辑', '修图', '开源ps'],
      category: 'design',
      tagline: '免费开源的图像编辑与合成工具，插件生态丰富。',
      official: 'https://www.gimp.org/',
      license: '免费 · 开源',
      color: '#5C5543',
      icon: 'gimp',
      downloads: [
        dl('windows', 'https://www.gimp.org/downloads/'),
        dl('macos', 'https://www.gimp.org/downloads/'),
        dl('linux', 'https://www.gimp.org/downloads/')
      ]
    },
    {
      id: 'inkscape',
      name: 'Inkscape',
      nameZh: 'Inkscape 矢量绘图',
      aliases: ['inkscape', '矢量', 'svg', 'illustrator'],
      category: 'design',
      tagline: '专业的开源矢量图形编辑器，原生支持 SVG 标准。',
      official: 'https://inkscape.org/',
      license: '免费 · 开源',
      color: '#2E2E2E',
      icon: 'inkscape',
      downloads: [
        dl('windows', 'https://inkscape.org/release/'),
        dl('macos', 'https://inkscape.org/release/'),
        dl('linux', 'https://inkscape.org/release/')
      ]
    },
    {
      id: 'blender',
      name: 'Blender',
      nameZh: 'Blender 三维创作',
      aliases: ['blender', '3d', '建模', '动画'],
      category: 'design',
      tagline: '开源 3D 创作全流程套件，覆盖建模、动画、渲染与视频编辑。',
      official: 'https://www.blender.org/',
      license: '免费 · 开源',
      color: '#E87D0D',
      icon: 'blender',
      featured: true,
      downloads: [
        dl('windows', 'https://www.blender.org/download/'),
        dl('macos', 'https://www.blender.org/download/'),
        dl('linux', 'https://www.blender.org/download/')
      ]
    },
    {
      id: 'krita',
      name: 'Krita',
      nameZh: 'Krita 数字绘画',
      aliases: ['krita', '绘画', '插画', '数位板'],
      category: 'design',
      tagline: '为插画师与概念艺术家打造的开源数字绘画软件。',
      official: 'https://krita.org/',
      license: '免费 · 开源',
      color: '#3BABFF',
      icon: 'krita',
      downloads: [
        dl('windows', 'https://krita.org/en/download/'),
        dl('macos', 'https://krita.org/en/download/'),
        dl('linux', 'https://krita.org/en/download/')
      ]
    },
    {
      id: 'canva',
      name: 'Canva',
      nameZh: 'Canva 可画',
      aliases: ['canva', '可画', '平面设计', '海报'],
      category: 'design',
      tagline: '模板驱动的在线设计平台，快速完成海报、演示与社交媒体素材。',
      official: 'https://www.canva.com/',
      license: '免费增值',
      color: '#00A3A8',
      icon: 'canva',
      downloads: [
        dl('windows', 'https://www.canva.com/download/'),
        dl('macos', 'https://www.canva.com/download/'),
        dl('android', 'https://www.canva.com/download/'),
        dl('ios', 'https://www.canva.com/download/')
      ]
    },
    {
      id: 'davinci',
      name: 'DaVinci Resolve',
      nameZh: '达芬奇视频剪辑',
      aliases: ['davinci', '达芬奇', '视频剪辑', '调色'],
      category: 'design',
      tagline: 'Blackmagic 出品的专业级剪辑、调色与视觉特效软件，提供免费版。',
      official: 'https://www.blackmagicdesign.com/products/davinciresolve',
      license: '免费增值',
      color: '#E04E00',
      icon: 'davinciresolve',
      downloads: [
        dl('windows', 'https://www.blackmagicdesign.com/products/davinciresolve'),
        dl('macos', 'https://www.blackmagicdesign.com/products/davinciresolve'),
        dl('linux', 'https://www.blackmagicdesign.com/products/davinciresolve')
      ]
    },

    /* ---------- 影音媒体 ---------- */
    {
      id: 'vlc',
      name: 'VLC media player',
      nameZh: 'VLC 播放器',
      aliases: ['vlc', '播放器', '视频播放', 'videolan'],
      category: 'media',
      tagline: '几乎没有它打不开格式的全能开源播放器，跨平台且完全免费。',
      official: 'https://www.videolan.org/vlc/',
      license: '免费 · 开源',
      color: '#E85D04',
      icon: 'vlcmediaplayer',
      featured: true,
      downloads: [
        dl('windows', 'https://www.videolan.org/vlc/'),
        dl('macos', 'https://www.videolan.org/vlc/'),
        dl('linux', 'https://www.videolan.org/vlc/'),
        dl('android', 'https://www.videolan.org/vlc/download-android.html'),
        dl('ios', 'https://www.videolan.org/vlc/download-ios.html')
      ]
    },
    {
      id: 'potplayer',
      name: 'PotPlayer',
      nameZh: 'PotPlayer 播放器',
      aliases: ['potplayer', '播放器', 'kmplayer'],
      category: 'media',
      tagline: 'Windows 上功能丰富、性能出色的本地视频播放器。',
      official: 'https://potplayer.daum.net/',
      license: '免费',
      color: '#235A9E',
      downloads: [
        dl('windows', 'https://potplayer.daum.net/')
      ]
    },
    {
      id: 'obs',
      name: 'OBS Studio',
      nameZh: 'OBS 直播软件',
      aliases: ['obs', 'obs studio', '直播', '录屏'],
      category: 'media',
      tagline: '开源直播与录屏软件，支持多场景切换、混流与插件扩展。',
      official: 'https://obsproject.com/',
      license: '免费 · 开源',
      color: '#2E2C2F',
      icon: 'obsstudio',
      featured: true,
      downloads: [
        dl('windows', 'https://obsproject.com/download'),
        dl('macos', 'https://obsproject.com/download'),
        dl('linux', 'https://obsproject.com/download')
      ]
    },
    {
      id: 'handbrake',
      name: 'HandBrake',
      nameZh: 'HandBrake 转码',
      aliases: ['handbrake', '视频转码', '压缩'],
      category: 'media',
      tagline: '开源视频转码工具，把视频转换成通用格式或更小的体积。',
      official: 'https://handbrake.fr/',
      license: '免费 · 开源',
      color: '#B74A1E',
      downloads: [
        dl('windows', 'https://handbrake.fr/downloads.php'),
        dl('macos', 'https://handbrake.fr/downloads.php'),
        dl('linux', 'https://handbrake.fr/downloads.php')
      ]
    },
    {
      id: 'audacity',
      name: 'Audacity',
      nameZh: 'Audacity 音频编辑',
      aliases: ['audacity', '音频', '录音', '剪辑'],
      category: 'media',
      tagline: '经典的开源音频录制与编辑软件，支持多轨编辑与效果处理。',
      official: 'https://www.audacityteam.org/',
      license: '免费 · 开源',
      color: '#0B4EA2',
      icon: 'audacity',
      downloads: [
        dl('windows', 'https://www.audacityteam.org/download/'),
        dl('macos', 'https://www.audacityteam.org/download/'),
        dl('linux', 'https://www.audacityteam.org/download/')
      ]
    },
    {
      id: 'iina',
      name: 'IINA',
      nameZh: 'IINA 播放器',
      aliases: ['iina', 'mac播放器'],
      category: 'media',
      tagline: '为 macOS 打造的现代开源播放器，原生界面与触控栏支持。',
      official: 'https://iina.io/',
      license: '免费 · 开源',
      color: '#1F7AEF',
      downloads: [
        dl('macos', 'https://iina.io/')
      ]
    },
    {
      id: 'spotify',
      name: 'Spotify',
      nameZh: 'Spotify',
      aliases: ['spotify', '音乐', '流媒体'],
      category: 'media',
      tagline: '全球流行的音乐与播客流媒体服务，支持离线下载。',
      official: 'https://www.spotify.com/',
      license: '免费增值',
      color: '#118A42',
      icon: 'spotify',
      downloads: [
        dl('windows', 'https://www.spotify.com/download/'),
        dl('macos', 'https://www.spotify.com/download/'),
        dl('linux', 'https://www.spotify.com/download/'),
        dl('android', 'https://www.spotify.com/download/'),
        dl('ios', 'https://www.spotify.com/download/')
      ]
    },
    {
      id: 'netease',
      name: '网易云音乐',
      nameZh: '网易云音乐',
      aliases: ['网易云', 'netease', '音乐', 'cloudmusic'],
      category: 'media',
      tagline: '国内主流音乐社区与播放器，以歌单和评论氛围著称。',
      official: 'https://music.163.com/',
      license: '免费增值',
      color: '#C20C0C',
      icon: 'neteasecloudmusic',
      downloads: [
        dl('windows', 'https://music.163.com/#/download'),
        dl('macos', 'https://music.163.com/#/download'),
        dl('android', 'https://music.163.com/#/download'),
        dl('ios', 'https://music.163.com/#/download')
      ]
    },
    {
      id: 'qqmusic',
      name: 'QQ音乐',
      nameZh: 'QQ音乐',
      aliases: ['qq音乐', 'qqmusic', '音乐'],
      category: 'media',
      tagline: '腾讯音乐旗下的播放器与曲库，覆盖大量华语与版权内容。',
      official: 'https://y.qq.com/',
      license: '免费增值',
      color: '#129A5A',
      iconFile: 'qqmusic-official.png',
      icon: 'qqmusic',
      downloads: [
        dl('windows', 'https://y.qq.com/download/index.html'),
        dl('macos', 'https://y.qq.com/download/index.html'),
        dl('android', 'https://y.qq.com/download/index.html'),
        dl('ios', 'https://y.qq.com/download/index.html')
      ]
    },
    {
      id: 'capcut',
      name: '剪映',
      nameZh: '剪映专业版',
      aliases: ['剪映', 'capcut', '视频剪辑', '抖音'],
      category: 'media',
      tagline: '上手轻松的桌面视频剪辑工具，内置字幕、模板与素材库。',
      official: 'https://www.capcut.cn/',
      license: '免费增值',
      color: '#1C1C1C',      downloads: [
        dl('windows', 'https://www.capcut.cn/'),
        dl('macos', 'https://www.capcut.cn/')
      ]
    },

    /* ---------- 通讯社交 ---------- */
    {
      id: 'wechat',
      name: 'WeChat',
      nameZh: '微信',
      aliases: ['wechat', '微信', 'weixin', '聊天'],
      category: 'social',
      tagline: '国民级即时通讯与生活服务应用，连接聊天、支付与小程序。',
      official: 'https://weixin.qq.com/',
      license: '免费',
      color: '#079E4C',
      icon: 'wechat',
      featured: true,
      downloads: [
        dl('windows', 'https://weixin.qq.com/download'),
        dl('macos', 'https://weixin.qq.com/download'),
        dl('android', 'https://weixin.qq.com/download'),
        dl('ios', 'https://apps.apple.com/app/wechat/id414478124')
      ]
    },
    {
      id: 'qq',
      name: 'QQ',
      nameZh: '腾讯 QQ',
      aliases: ['qq', '腾讯qq', '聊天'],
      category: 'social',
      tagline: '腾讯的即时通讯与社交平台，支持群聊、文件传输与音视频通话。',
      official: 'https://im.qq.com/',
      license: '免费',
      color: '#12A5D8',
      icon: 'tencentqq',
      downloads: [
        dl('windows', 'https://im.qq.com/'),
        dl('macos', 'https://im.qq.com/'),
        dl('android', 'https://im.qq.com/'),
        dl('ios', 'https://im.qq.com/')
      ]
    },
    {
      id: 'dingtalk',
      name: 'DingTalk',
      nameZh: '钉钉',
      aliases: ['dingtalk', '钉钉', '企业办公'],
      category: 'social',
      tagline: '阿里巴巴的企业协同平台，整合沟通、审批、日程与视频会议。',
      official: 'https://www.dingtalk.com/',
      license: '免费增值',
      color: '#1E7FD4',
      icon: 'dingtalk',
      downloads: [
        dl('windows', 'https://www.dingtalk.com/download'),
        dl('macos', 'https://www.dingtalk.com/download'),
        dl('linux', 'https://www.dingtalk.com/download'),
        dl('android', 'https://www.dingtalk.com/download'),
        dl('ios', 'https://www.dingtalk.com/download')
      ]
    },
    {
      id: 'feishu',
      name: 'Feishu',
      nameZh: '飞书',
      aliases: ['feishu', 'lark', '飞书', '协作'],
      category: 'social',
      tagline: '字节跳动的新一代协作平台，文档、表格、IM 与会议一体化。',
      official: 'https://www.feishu.cn/',
      license: '免费增值',
      color: '#245BDB',
      iconFile: 'feishu-official.png',
      downloads: [
        dl('windows', 'https://www.feishu.cn/download'),
        dl('macos', 'https://www.feishu.cn/download'),
        dl('linux', 'https://www.feishu.cn/download'),
        dl('android', 'https://www.feishu.cn/download'),
        dl('ios', 'https://www.feishu.cn/download')
      ]
    },
    {
      id: 'wecom',
      name: 'WeCom',
      nameZh: '企业微信',
      aliases: ['wecom', '企业微信', 'work wechat'],
      category: 'social',
      tagline: '腾讯的企业通讯工具，可与微信互通，承载客户联系与内部协作。',
      official: 'https://work.weixin.qq.com/',
      license: '免费',
      color: '#1377C8',
      iconFile: 'wecom-official.png',
      icon: 'wechatwork',
      downloads: [
        dl('windows', 'https://work.weixin.qq.com/#indexDownload'),
        dl('macos', 'https://work.weixin.qq.com/#indexDownload'),
        dl('android', 'https://work.weixin.qq.com/#indexDownload'),
        dl('ios', 'https://work.weixin.qq.com/#indexDownload')
      ]
    },
    {
      id: 'telegram',
      name: 'Telegram',
      nameZh: 'Telegram',
      aliases: ['telegram', 'tg', '电报'],
      category: 'social',
      tagline: '注重速度与隐私的即时通讯应用，支持跨设备云同步与频道。',
      official: 'https://telegram.org/',
      license: '免费 · 开源',
      color: '#1F93CE',
      icon: 'telegram',
      downloads: [
        dl('windows', 'https://telegram.org/apps'),
        dl('macos', 'https://telegram.org/apps'),
        dl('linux', 'https://telegram.org/apps'),
        dl('android', 'https://telegram.org/apps'),
        dl('ios', 'https://telegram.org/apps')
      ]
    },
    {
      id: 'discord',
      name: 'Discord',
      nameZh: 'Discord',
      aliases: ['discord', '社群', '语音'],
      category: 'social',
      tagline: '面向游戏与兴趣社群的语音、视频和文字聊天平台。',
      official: 'https://discord.com/',
      license: '免费',
      color: '#4752C4',
      icon: 'discord',
      featured: true,
      downloads: [
        dl('windows', 'https://discord.com/download'),
        dl('macos', 'https://discord.com/download'),
        dl('linux', 'https://discord.com/download'),
        dl('android', 'https://discord.com/download'),
        dl('ios', 'https://discord.com/download')
      ]
    },
    {
      id: 'slack',
      name: 'Slack',
      nameZh: 'Slack',
      aliases: ['slack', '团队沟通'],
      category: 'social',
      tagline: '以频道为核心的团队协作平台，整合消息、文件与工作流。',
      official: 'https://slack.com/',
      license: '免费增值',
      color: '#4A154B',
      icon: 'slack',
      downloads: [
        dl('windows', 'https://slack.com/downloads'),
        dl('macos', 'https://slack.com/downloads'),
        dl('linux', 'https://slack.com/downloads'),
        dl('android', 'https://slack.com/downloads'),
        dl('ios', 'https://slack.com/downloads')
      ]
    },
    {
      id: 'zoom',
      name: 'Zoom',
      nameZh: 'Zoom 视频会议',
      aliases: ['zoom', '视频会议', '会议'],
      category: 'social',
      tagline: '稳定的视频会议与在线协作服务，支持会议、网络研讨会与电话。',
      official: 'https://zoom.us/',
      license: '免费增值',
      color: '#0B5CD5',
      icon: 'zoom',
      downloads: [
        dl('windows', 'https://zoom.us/download'),
        dl('macos', 'https://zoom.us/download'),
        dl('linux', 'https://zoom.us/download'),
        dl('android', 'https://zoom.us/download'),
        dl('ios', 'https://zoom.us/download')
      ]
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      nameZh: 'WhatsApp',
      aliases: ['whatsapp', '聊天'],
      category: 'social',
      tagline: '全球流行的即时通讯应用，以手机号为基础，端到端加密。',
      official: 'https://www.whatsapp.com/',
      license: '免费',
      color: '#128C4B',
      icon: 'whatsapp',
      downloads: [
        dl('windows', 'https://www.whatsapp.com/download'),
        dl('macos', 'https://www.whatsapp.com/download'),
        dl('android', 'https://www.whatsapp.com/download'),
        dl('ios', 'https://www.whatsapp.com/download')
      ]
    },

    /* ---------- 云存储 ---------- */
    {
      id: 'baidu',
      name: '百度网盘',
      nameZh: '百度网盘',
      aliases: ['baidu', '百度网盘', '网盘', 'pan'],
      category: 'cloud',
      tagline: '国内主流的个人云存储与文件分享服务，支持多端同步。',
      official: 'https://pan.baidu.com/',
      license: '免费增值',
      color: '#2C6FE0',      downloads: [
        dl('windows', 'https://pan.baidu.com/download'),
        dl('macos', 'https://pan.baidu.com/download'),
        dl('android', 'https://pan.baidu.com/download'),
        dl('ios', 'https://pan.baidu.com/download')
      ]
    },
    {
      id: 'alipan',
      name: '阿里云盘',
      nameZh: '阿里云盘',
      aliases: ['阿里云盘', 'alipan', '阿里', '网盘'],
      category: 'cloud',
      tagline: '阿里出品的个人云存储服务，主打不限速与多端同步。',
      official: 'https://www.alipan.com/',
      license: '免费增值',
      color: '#6C5CE7',
      downloads: [
        dl('windows', 'https://www.alipan.com/'),
        dl('macos', 'https://www.alipan.com/'),
        dl('android', 'https://www.alipan.com/'),
        dl('ios', 'https://www.alipan.com/')
      ]
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      nameZh: '微软 OneDrive',
      aliases: ['onedrive', '微软网盘', '网盘'],
      category: 'cloud',
      tagline: '与 Windows 和 Microsoft 365 深度整合的云存储与同步服务。',
      official: 'https://www.microsoft.com/microsoft-365/onedrive',
      license: '免费增值',
      color: '#0F6CBD',
      icon: 'microsoftonedrive',
      downloads: [
        dl('windows', 'https://www.microsoft.com/microsoft-365/onedrive/download'),
        dl('macos', 'https://www.microsoft.com/microsoft-365/onedrive/download'),
        dl('android', 'https://www.microsoft.com/microsoft-365/onedrive/download'),
        dl('ios', 'https://www.microsoft.com/microsoft-365/onedrive/download')
      ]
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      nameZh: 'Dropbox',
      aliases: ['dropbox', '网盘', '同步'],
      category: 'cloud',
      tagline: '老牌跨平台云存储与文件同步服务，适合团队共享与协作。',
      official: 'https://www.dropbox.com/',
      license: '免费增值',
      color: '#1764D6',
      icon: 'dropbox',
      downloads: [
        dl('windows', 'https://www.dropbox.com/download'),
        dl('macos', 'https://www.dropbox.com/download'),
        dl('linux', 'https://www.dropbox.com/download'),
        dl('android', 'https://www.dropbox.com/download'),
        dl('ios', 'https://www.dropbox.com/download')
      ]
    },
    {
      id: 'googledrive',
      name: 'Google Drive',
      nameZh: '谷歌云端硬盘',
      aliases: ['google drive', 'gdrive', '谷歌drive', '网盘'],
      category: 'cloud',
      tagline: '与 Google 文档套件整合的云端硬盘，支持桌面文件按需同步。',
      official: 'https://www.google.com/drive/',
      license: '免费增值',
      color: '#2C7BE5',
      icon: 'googledrive',
      downloads: [
        dl('windows', 'https://www.google.com/drive/download/'),
        dl('macos', 'https://www.google.com/drive/download/'),
        dl('android', 'https://www.google.com/drive/download/'),
        dl('ios', 'https://www.google.com/drive/download/')
      ]
    },
    {
      id: 'syncthing',
      name: 'Syncthing',
      nameZh: 'Syncthing 同步',
      aliases: ['syncthing', '文件同步', '去中心化'],
      category: 'cloud',
      tagline: '开源的点对点文件同步工具，数据不经过第三方服务器。',
      official: 'https://syncthing.net/',
      license: '免费 · 开源',
      color: '#0A7EA4',
      icon: 'syncthing',
      downloads: [
        dl('windows', 'https://syncthing.net/downloads/'),
        dl('macos', 'https://syncthing.net/downloads/'),
        dl('linux', 'https://syncthing.net/downloads/'),
        dl('android', 'https://syncthing.net/downloads/')
      ]
    },
    {
      id: 'jianguoyun',
      name: '坚果云',
      nameZh: '坚果云',
      aliases: ['坚果云', 'jianguoyun', '网盘', '同步'],
      category: 'cloud',
      tagline: '国内稳定的文件同步与云存储服务，支持增量同步与历史版本。',
      official: 'https://www.jianguoyun.com/',
      license: '免费增值',
      color: '#1590C8',
      iconFile: 'jianguoyun-official.png',
      downloads: [
        dl('windows', 'https://www.jianguoyun.com/s/downloads'),
        dl('macos', 'https://www.jianguoyun.com/s/downloads'),
        dl('linux', 'https://www.jianguoyun.com/s/downloads'),
        dl('android', 'https://www.jianguoyun.com/s/downloads'),
        dl('ios', 'https://www.jianguoyun.com/s/downloads')
      ]
    },

    /* ---------- 系统工具 ---------- */
    {
      id: '7zip',
      name: '7-Zip',
      nameZh: '7-Zip 压缩工具',
      aliases: ['7zip', '7-zip', '压缩', '解压', 'rar'],
      category: 'system',
      tagline: '免费开源的压缩与解压工具，压缩率高且没有广告捆绑。',
      official: 'https://www.7-zip.org/',
      license: '免费 · 开源',
      color: '#1C5AA6',
      icon: '7zip',
      featured: true,
      downloads: [
        dl('windows', 'https://www.7-zip.org/download.html')
      ]
    },
    {
      id: 'winrar',
      name: 'WinRAR',
      nameZh: 'WinRAR 压缩软件',
      aliases: ['winrar', 'rar', '压缩', '解压'],
      category: 'system',
      tagline: '老牌压缩软件，原生支持 RAR 与 ZIP 格式，可长期试用。',
      official: 'https://www.win-rar.com/',
      license: '试用付费',
      color: '#9E1B1B',
      iconFile: 'winrar-official.png',
      icon: 'winrar',
      downloads: [
        dl('windows', 'https://www.win-rar.com/download.html')
      ]
    },
    {
      id: 'bandizip',
      name: 'Bandizip',
      nameZh: 'Bandizip',
      aliases: ['bandizip', '压缩', '解压'],
      category: 'system',
      tagline: '轻量快速的压缩工具，界面清爽，支持多种压缩格式。',
      official: 'https://www.bandisoft.com/bandizip/',
      license: '免费增值',
      color: '#D95C16',
      iconFile: 'bandizip-official.png',
      downloads: [
        dl('windows', 'https://www.bandisoft.com/bandizip/'),
        dl('macos', 'https://www.bandisoft.com/bandizip/')
      ]
    },
    {
      id: 'everything',
      name: 'Everything',
      nameZh: 'Everything 文件搜索',
      aliases: ['everything', '搜索', '文件搜索'],
      category: 'system',
      tagline: '毫秒级返回结果的 Windows 本地文件搜索工具，占用极低。',
      official: 'https://www.voidtools.com/',
      license: '免费',
      color: '#1E88B8',
      iconFile: 'everything-official.png',
      downloads: [
        dl('windows', 'https://www.voidtools.com/downloads/')
      ]
    },
    {
      id: 'powertoys',
      name: 'PowerToys',
      nameZh: '微软 PowerToys',
      aliases: ['powertoys', 'power toys', 'windows工具'],
      category: 'system',
      tagline: '微软官方 Windows 效率工具集，包含窗口管理、取色器、快捷启动等。',
      official: 'https://learn.microsoft.com/windows/powertoys/',
      license: '免费 · 开源',
      color: '#0F7BC4',
      downloads: [
        dl('windows', 'https://github.com/microsoft/PowerToys/releases')
      ]
    },
    {
      id: 'rufus',
      name: 'Rufus',
      nameZh: 'Rufus 启动盘工具',
      aliases: ['rufus', '启动盘', 'u盘', 'iso'],
      category: 'system',
      tagline: '小巧快速的 USB 启动盘制作工具，适合安装系统与刷写镜像。',
      official: 'https://rufus.ie/',
      license: '免费 · 开源',
      color: '#1D6FE0',
      iconFile: 'rufus-official.png',
      downloads: [
        dl('windows', 'https://rufus.ie/')
      ]
    },
    {
      id: 'ventoy',
      name: 'Ventoy',
      nameZh: 'Ventoy 多合一启动盘',
      aliases: ['ventoy', '启动盘', 'u盘', '多合一'],
      category: 'system',
      tagline: '把多个 ISO 直接复制进 U 盘即可启动，无需反复格式化。',
      official: 'https://www.ventoy.net/',
      license: '免费 · 开源',
      color: '#2F7D32',
      iconFile: 'ventoy-official.png',
      downloads: [
        dl('windows', 'https://www.ventoy.net/en/download.html'),
        dl('linux', 'https://www.ventoy.net/en/download.html')
      ]
    },
    {
      id: 'etcher',
      name: 'balenaEtcher',
      nameZh: 'balenaEtcher 烧录工具',
      aliases: ['etcher', 'balena', '烧录', '镜像'],
      category: 'system',
      tagline: '跨平台的镜像烧录工具，三步把系统镜像写入 SD 卡或 U 盘。',
      official: 'https://etcher.balena.io/',
      license: '免费 · 开源',
      color: '#D64B18',
      iconFile: 'etcher-official.png',
      downloads: [
        dl('windows', 'https://etcher.balena.io/'),
        dl('macos', 'https://etcher.balena.io/'),
        dl('linux', 'https://etcher.balena.io/')
      ]
    },
    {
      id: 'crystaldiskinfo',
      name: 'CrystalDiskInfo',
      nameZh: 'CrystalDiskInfo 硬盘检测',
      aliases: ['crystaldiskinfo', '硬盘检测', 'smart', 'ssd'],
      category: 'system',
      tagline: '读取 S.M.A.R.T. 信息，快速了解硬盘健康状态与温度。',
      official: 'https://crystalmark.info/en/software/crystaldiskinfo/',
      license: '免费',
      color: '#2E76B5',
      iconFile: 'crystaldiskinfo-official.png',
      downloads: [
        dl('windows', 'https://crystalmark.info/en/software/crystaldiskinfo/')
      ]
    },
    {
      id: 'snipaste',
      name: 'Snipaste',
      nameZh: 'Snipaste 截图工具',
      aliases: ['snipaste', '截图', '贴图'],
      category: 'system',
      tagline: '把截图贴在屏幕上的效率工具，支持标注、取色与多屏使用。',
      official: 'https://www.snipaste.com/',
      license: '免费增值',
      color: '#2E9E4F',
      iconFile: 'snipaste-official.png',
      downloads: [
        dl('windows', 'https://www.snipaste.com/'),
        dl('macos', 'https://www.snipaste.com/')
      ]
    },
    {
      id: 'geekuninstaller',
      name: 'Geek Uninstaller',
      nameZh: 'Geek 卸载工具',
      aliases: ['geek', '卸载', 'uninstall'],
      category: 'system',
      tagline: '轻量彻底的软件卸载工具，可清理残留文件与注册表项。',
      official: 'https://geekuninstaller.com/',
      license: '免费',
      color: '#B23A2F',
      downloads: [
        dl('windows', 'https://geekuninstaller.com/')
      ]
    },
    {
      id: 'diskgenius',
      name: 'DiskGenius',
      nameZh: 'DiskGenius 磁盘工具',
      aliases: ['diskgenius', '分区', '数据恢复', '磁盘'],
      category: 'system',
      tagline: '国产磁盘分区管理与数据恢复工具，支持分区、备份与检测。',
      official: 'https://www.diskgenius.cn/',
      license: '免费增值',
      color: '#1666C2',
      downloads: [
        dl('windows', 'https://www.diskgenius.cn/download.php')
      ]
    },

    /* ---------- 安全隐私 ---------- */
    {
      id: 'bitwarden',
      name: 'Bitwarden',
      nameZh: 'Bitwarden 密码管理器',
      aliases: ['bitwarden', '密码', 'password', '密码管理'],
      category: 'security',
      tagline: '开源跨平台密码管理器，用一套主密码保管所有账号凭据。',
      official: 'https://bitwarden.com/',
      license: '免费增值 · 开源',
      color: '#175DDC',
      icon: 'bitwarden',
      featured: true,
      downloads: [
        dl('windows', 'https://bitwarden.com/download/'),
        dl('macos', 'https://bitwarden.com/download/'),
        dl('linux', 'https://bitwarden.com/download/'),
        dl('android', 'https://bitwarden.com/download/'),
        dl('ios', 'https://bitwarden.com/download/')
      ]
    },
    {
      id: 'keepassxc',
      name: 'KeePassXC',
      nameZh: 'KeePassXC 密码管理器',
      aliases: ['keepass', 'keepassxc', '密码', 'password'],
      category: 'security',
      tagline: '本地优先的开源密码管理器，数据库文件完全由自己保管。',
      official: 'https://keepassxc.org/',
      license: '免费 · 开源',
      color: '#4C7A34',
      icon: 'keepassxc',
      downloads: [
        dl('windows', 'https://keepassxc.org/download/'),
        dl('macos', 'https://keepassxc.org/download/'),
        dl('linux', 'https://keepassxc.org/download/')
      ]
    },
    {
      id: 'huorong',
      name: '火绒安全',
      nameZh: '火绒安全软件',
      aliases: ['火绒', 'huorong', '杀毒', '安全'],
      category: 'security',
      tagline: '轻量、克制的国产安全软件，安静拦截而不打扰日常使用。',
      official: 'https://www.huorong.cn/',
      license: '免费',
      color: '#D96B0C',
      iconFile: 'huorong-official.png',
      downloads: [
        dl('windows', 'https://www.huorong.cn/person')
      ]
    },
    {
      id: 'ccleaner',
      name: 'CCleaner',
      nameZh: 'CCleaner 系统清理',
      aliases: ['ccleaner', '清理', '系统优化'],
      category: 'security',
      tagline: '系统垃圾清理与隐私痕迹清理工具，提供免费基础版本。',
      official: 'https://www.ccleaner.com/',
      license: '免费增值',
      color: '#1C8FBD',
      icon: 'ccleaner',
      downloads: [
        dl('windows', 'https://www.ccleaner.com/ccleaner/download'),
        dl('macos', 'https://www.ccleaner.com/ccleaner/download')
      ]
    },

    /* ---------- 远程控制 ---------- */
    {
      id: 'anydesk',
      name: 'AnyDesk',
      nameZh: 'AnyDesk 远程控制',
      aliases: ['anydesk', '远程', '远程桌面'],
      category: 'remote',
      tagline: '低延迟的跨平台远程桌面工具，适合远程办公与技术支持。',
      official: 'https://anydesk.com/',
      license: '免费增值',
      color: '#C93A31',
      icon: 'anydesk',
      downloads: [
        dl('windows', 'https://anydesk.com/download'),
        dl('macos', 'https://anydesk.com/download'),
        dl('linux', 'https://anydesk.com/download'),
        dl('android', 'https://anydesk.com/download'),
        dl('ios', 'https://anydesk.com/download')
      ]
    },
    {
      id: 'teamviewer',
      name: 'TeamViewer',
      nameZh: 'TeamViewer 远程控制',
      aliases: ['teamviewer', '远程', '远程桌面'],
      category: 'remote',
      tagline: '成熟的跨平台远程控制与支持工具，支持文件传输与会议。',
      official: 'https://www.teamviewer.com/',
      license: '免费增值',
      color: '#0E79C4',
      icon: 'teamviewer',
      downloads: [
        dl('windows', 'https://www.teamviewer.com/download/'),
        dl('macos', 'https://www.teamviewer.com/download/'),
        dl('linux', 'https://www.teamviewer.com/download/'),
        dl('android', 'https://www.teamviewer.com/download/'),
        dl('ios', 'https://www.teamviewer.com/download/')
      ]
    },
    {
      id: 'todesk',
      name: 'ToDesk',
      nameZh: 'ToDesk 远程控制',
      aliases: ['todesk', '远程', '远程桌面'],
      category: 'remote',
      tagline: '国产跨平台远程控制软件，连接稳定，适合个人与团队使用。',
      official: 'https://www.todesk.com/',
      license: '免费增值',
      color: '#2E6FD8',
      downloads: [
        dl('windows', 'https://www.todesk.com/download.html'),
        dl('macos', 'https://www.todesk.com/download.html'),
        dl('linux', 'https://www.todesk.com/download.html'),
        dl('android', 'https://www.todesk.com/download.html'),
        dl('ios', 'https://www.todesk.com/download.html')
      ]
    },
    {
      id: 'sunlogin',
      name: '向日葵远程控制',
      nameZh: '向日葵',
      aliases: ['sunlogin', '向日葵', '远程', 'oray'],
      category: 'remote',
      tagline: '贝锐出品的远程控制与运维工具，支持多设备管理与远控开机。',
      official: 'https://sunlogin.oray.com/',
      license: '免费增值',
      color: '#1087C9',
      downloads: [
        dl('windows', 'https://sunlogin.oray.com/download/'),
        dl('macos', 'https://sunlogin.oray.com/download/'),
        dl('linux', 'https://sunlogin.oray.com/download/'),
        dl('android', 'https://sunlogin.oray.com/download/'),
        dl('ios', 'https://sunlogin.oray.com/download/')
      ]
    },

    /* ---------- 游戏娱乐 ---------- */
    {
      id: 'steam',
      name: 'Steam',
      nameZh: 'Steam 游戏平台',
      aliases: ['steam', '游戏', 'valve', '游戏平台'],
      category: 'game',
      tagline: '全球最大的 PC 游戏平台，提供商店、库管理、创意工坊与社区。',
      official: 'https://store.steampowered.com/',
      license: '免费',
      color: '#1B2838',
      icon: 'steam',
      featured: true,
      downloads: [
        dl('windows', 'https://store.steampowered.com/about/'),
        dl('macos', 'https://store.steampowered.com/about/'),
        dl('linux', 'https://store.steampowered.com/about/')
      ]
    },
    {
      id: 'epic',
      name: 'Epic Games Store',
      nameZh: 'Epic 游戏商城',
      aliases: ['epic', 'epic games', '游戏', '游戏平台'],
      category: 'game',
      tagline: 'Epic 的 PC 游戏商店，每周提供免费游戏并独占部分大作。',
      official: 'https://store.epicgames.com/',
      license: '免费',
      color: '#2A2A2A',
      icon: 'epicgames',
      downloads: [
        dl('windows', 'https://store.epicgames.com/download'),
        dl('macos', 'https://store.epicgames.com/download')
      ]
    }
  ];

  window.APP_DATA = {
    categories: CATEGORIES,
    apps: APPS
  };
})();
