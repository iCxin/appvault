/* =========================================================
   AppVault 交互逻辑
   ========================================================= */

(function () {
  'use strict';

  const DATA = window.APP_DATA || { categories: [], apps: [] };
  const CONFIG = window.SITE_CONFIG || {};
  const APPS = DATA.apps.slice();
  const CATEGORIES = DATA.categories.slice();
  const CATEGORY_MAP = new Map(CATEGORIES.map(function (category) {
    return [category.id, category];
  }));

  const OS_ORDER = ['windows', 'macos', 'linux', 'android', 'ios'];
  const OS_META = {
    windows: { label: 'Windows', short: 'Win' },
    macos: { label: 'macOS', short: 'Mac' },
    linux: { label: 'Linux', short: 'Linux' },
    android: { label: 'Android', short: 'Android' },
    ios: { label: 'iOS', short: 'iOS' }
  };

  const state = {
    query: '',
    category: 'all',
    platform: 'all',
    sort: 'recommended'
  };

  const el = {
    header: document.getElementById('siteHeader'),
    searchForm: document.getElementById('searchForm'),
    searchInput: document.getElementById('searchInput'),
    searchClear: document.getElementById('searchClear'),
    categoryChips: document.getElementById('categoryChips'),
    platformSelect: document.getElementById('platformSelect'),
    sortSelect: document.getElementById('sortSelect'),
    grid: document.getElementById('appGrid'),
    resultCount: document.getElementById('resultCount'),
    emptyState: document.getElementById('emptyState'),
    resetFilters: document.getElementById('resetFilters'),
    drawer: document.getElementById('appDrawer'),
    drawerBody: document.getElementById('drawerBody'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    drawerClose: document.getElementById('drawerClose'),
    toast: document.getElementById('toast'),
    themeToggle: document.getElementById('themeToggle'),
    themeMeta: document.getElementById('themeMeta'),
    statApps: document.getElementById('statApps'),
    statLinks: document.getElementById('statLinks'),
    statPlatforms: document.getElementById('statPlatforms'),
    statCategories: document.getElementById('statCategories'),
    year: document.getElementById('year')
  };

  let composing = false;
  let activeAppId = null;
  let lastFocusedElement = null;
  let drawerPushedHistory = false;
  let toastTimer = 0;

  /* ---------- 工具函数 ---------- */

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalize(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function inkFor(hex) {
    const raw = String(hex || '#555555').replace('#', '');
    const full = raw.length === 3
      ? raw.split('').map(function (character) { return character + character; }).join('')
      : raw;
    const r = parseInt(full.slice(0, 2), 16) || 0;
    const g = parseInt(full.slice(2, 4), 16) || 0;
    const b = parseInt(full.slice(4, 6), 16) || 0;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.62 ? '#16180F' : '#FFFFFF';
  }

  function iconSource(app, prefersDarkInk) {
    if (app.iconFile) return 'assets/icons/' + app.iconFile;
    if (!app.icon) return '';
    const suffix = prefersDarkInk ? '-ink' : '';
    return 'assets/icons/' + app.icon + suffix + '.svg';
  }

  function monogram(app) {
    const source = String(app.nameZh || app.name || '?').trim();
    return source.charAt(0).toUpperCase();
  }

  function uniquePlatforms(app) {
    const seen = [];
    OS_ORDER.forEach(function (os) {
      if (app.downloads.some(function (item) { return item.os === os; })) {
        seen.push(os);
      }
    });
    return seen;
  }

  function totalLinks() {
    return APPS.reduce(function (sum, app) { return sum + app.downloads.length; }, 0);
  }

  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch (error) {
      return url;
    }
  }

  function tileMarkup(app, sizeClass) {
    const isOfficial = Boolean(app.iconFile);
    const ink = isOfficial ? '#16180F' : inkFor(app.color);
    const source = iconSource(app, ink === '#16180F');
    const image = source
      ? '<img src="' + escapeHtml(source) + '" alt="" ' +
        (sizeClass ? '' : 'loading="lazy" decoding="async" ') +
        'onerror="this.style.display=\'none\'">'
      : '';
    const classes = ['tile', isOfficial ? 'is-official' : '', sizeClass || ''].filter(Boolean).join(' ');
    return '<span class="' + classes + '" style="--tile:' + escapeHtml(app.color) +
      ';--tile-ink:' + ink + '">' + image +
      '<span class="tile-letter" aria-hidden="true">' + escapeHtml(monogram(app)) + '</span></span>';
  }

  const arrowIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg>';
  const copyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V6a2 2 0 0 1 2-2h9"></path></svg>';

  /* ---------- 搜索计分 ---------- */

  function scoreApp(app, query) {
    if (!query) return 0;
    const category = CATEGORY_MAP.get(app.category);
    const strongFields = [app.name, app.nameZh, category ? category.name : '']
      .concat(app.aliases || []);
    const weakFields = [app.tagline, app.official, app.license];
    let score = 0;

    strongFields.forEach(function (field) {
      const value = normalize(field);
      if (!value) return;
      if (value === query) score = Math.max(score, 100);
      else if (value.indexOf(query) === 0) score = Math.max(score, 80);
      else if (value.indexOf(query) !== -1) score = Math.max(score, 55);
    });

    weakFields.forEach(function (field) {
      if (normalize(field).indexOf(query) !== -1) score = Math.max(score, 22);
    });

    return score;
  }

  function visibleApps() {
    const query = normalize(state.query);
    const scores = new Map();

    const list = APPS.filter(function (app) {
      if (state.category !== 'all' && app.category !== state.category) return false;
      if (state.platform !== 'all' &&
        !app.downloads.some(function (item) { return item.os === state.platform; })) return false;
      if (query) {
        const score = scoreApp(app, query);
        if (!score) return false;
        scores.set(app.id, score);
      }
      return true;
    });

    const categoryIndex = new Map(CATEGORIES.map(function (category, index) {
      return [category.id, index];
    }));

    list.sort(function (a, b) {
      if (state.sort === 'name') {
        return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
      }
      const scoreA = scores.get(a.id) || 0;
      const scoreB = scores.get(b.id) || 0;
      if (scoreA !== scoreB) return scoreB - scoreA;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      const indexA = categoryIndex.get(a.category) || 0;
      const indexB = categoryIndex.get(b.category) || 0;
      if (indexA !== indexB) return indexA - indexB;
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    });

    return list;
  }

  /* ---------- 渲染 ---------- */

  function renderCategoryChips() {
    let html = '<button class="chip is-active" type="button" data-category="all">全部</button>';

    CATEGORIES.forEach(function (category) {
      html += '<button class="chip" type="button" data-category="' + escapeHtml(category.id) + '">' +
        escapeHtml(category.name) + '</button>';
    });

    el.categoryChips.innerHTML = html;
  }

  function cardHtml(app, index) {
    const platforms = uniquePlatforms(app).map(function (os) {
      return '<span class="os-pill">' + escapeHtml(OS_META[os].short) + '</span>';
    }).join('');

    return '<a class="card" href="#/app/' + escapeHtml(app.id) + '" data-id="' + escapeHtml(app.id) + '"' +
      ' style="--i:' + Math.min(index, 16) +
      ';--tile:' + escapeHtml(app.color) +
      ';--tile-ink:' + inkFor(app.color) + '"' +
      ' aria-label="' + escapeHtml(app.name + ' ' + app.nameZh) + ' 官方下载详情">' +
      '<span class="card-top">' +
        tileMarkup(app) +
        '<span class="card-heading">' +
          '<span class="card-name">' + escapeHtml(app.name) + '</span>' +
          '<span class="card-zh">' + escapeHtml(app.nameZh) + '</span>' +
        '</span>' +
        '<span class="card-index">' + String(index + 1).padStart(2, '0') + '</span>' +
      '</span>' +
      '<span class="card-desc">' + escapeHtml(app.tagline) + '</span>' +
      '<span class="card-foot">' +
        '<span class="os-pills">' + platforms + '</span>' +
        '<span class="card-arrow" aria-hidden="true">' + arrowIcon + '</span>' +
      '</span>' +
    '</a>';
  }

  function render() {
    const list = visibleApps();
    const hasFilters = state.query !== '' || state.category !== 'all' || state.platform !== 'all';

    el.grid.innerHTML = list.map(cardHtml).join('');
    el.grid.hidden = list.length === 0;
    el.emptyState.hidden = list.length !== 0;

    if (hasFilters) {
      el.resultCount.textContent = state.query
        ? '找到 ' + list.length + ' 款与“' + state.query + '”相关的软件'
        : '当前筛选下共 ' + list.length + ' 款软件';
    } else {
      el.resultCount.textContent = '共 ' + APPS.length + ' 款软件 · ' + totalLinks() + ' 个官方入口';
    }

    el.categoryChips.querySelectorAll('.chip').forEach(function (chip) {
      chip.classList.toggle('is-active', chip.dataset.category === state.category);
    });
  }

  /* ---------- 抽屉 ---------- */

  function downloadRow(item) {
    const meta = OS_META[item.os];
    return '<a class="dl-row" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">' +
      '<span class="dl-badge">' + escapeHtml(meta.short) + '</span>' +
      '<span class="dl-text">' +
        '<strong>' + escapeHtml(item.label) + '</strong>' +
        '<small>官方下载入口 · ' + escapeHtml(meta.label) + '</small>' +
      '</span>' +
      '<span class="dl-arrow" aria-hidden="true">' + arrowIcon + '</span>' +
    '</a>';
  }

  function reportMarkup(app) {
    if (!CONFIG.repoUrl) {
      return '发现链接失效？欢迎在项目开源仓库中提交修订。';
    }
    const title = encodeURIComponent('[链接失效] ' + app.name);
    const body = encodeURIComponent('软件：' + app.name + '\n当前链接：' + app.official + '\n问题描述：');
    const url = CONFIG.repoUrl.replace(/\/$/, '') + '/issues/new?title=' + title + '&body=' + body;
    return '发现链接失效？<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener">报告问题</a>，或直接提交 PR 修正。';
  }

  function drawerHtml(app) {
    const category = CATEGORY_MAP.get(app.category);
    const categoryName = category ? category.name : '软件';
    const downloads = app.downloads.slice().sort(function (a, b) {
      return OS_ORDER.indexOf(a.os) - OS_ORDER.indexOf(b.os);
    });
    const platforms = uniquePlatforms(app).map(function (os) {
      return OS_META[os].label;
    }).join(' / ');

    return '<div class="drawer-hero">' +
        tileMarkup(app) +
        '<div class="drawer-title-wrap">' +
          '<h2 class="drawer-title" id="drawerTitle">' + escapeHtml(app.name) + '</h2>' +
          '<p class="drawer-zh">' + escapeHtml(app.nameZh) + '</p>' +
          '<div class="drawer-tags">' +
            '<span class="tag">' + escapeHtml(categoryName) + '</span>' +
            '<span class="tag tag-accent">官方渠道</span>' +
            '<span class="tag">' + escapeHtml(app.license) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<p class="drawer-desc">' + escapeHtml(app.tagline) + '</p>' +
      '<div class="drawer-section-label"><span>官方下载 · OFFICIAL</span><span>' +
        downloads.length + ' 个入口</span></div>' +
      '<div class="dl-list">' + downloads.map(downloadRow).join('') + '</div>' +
      '<div class="drawer-meta">' +
        '<div><span>软件类别</span><strong>' + escapeHtml(categoryName) + '</strong></div>' +
        '<div><span>授权方式</span><strong>' + escapeHtml(app.license) + '</strong></div>' +
        '<div><span>支持平台</span><strong>' + escapeHtml(platforms) + '</strong></div>' +
        '<div><span>官方网站</span><strong>' + escapeHtml(hostOf(app.official)) + '</strong></div>' +
      '</div>' +
      '<p class="drawer-note">下载链接全部指向软件官方渠道，本站不托管任何安装包。' +
        reportMarkup(app) + '</p>' +
      '<div class="drawer-actions">' +
        '<a class="btn btn-primary" href="' + escapeHtml(app.official) + '" target="_blank" rel="noopener">' +
          '访问官方网站' + arrowIcon +
        '</a>' +
        '<button class="btn btn-outline btn-icon" type="button" data-copy="' +
          escapeHtml(app.official) + '" aria-label="复制官网链接" title="复制官网链接">' +
          copyIcon +
        '</button>' +
      '</div>';
  }

  function hideDrawer() {
    if (!el.drawer.classList.contains('is-open')) return;
    el.drawer.classList.remove('is-open');
    el.drawerBackdrop.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    activeAppId = null;
    drawerPushedHistory = false;
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus({ preventScroll: true });
    }
    lastFocusedElement = null;
  }

  function openApp(id, pushHistory) {
    const app = APPS.find(function (item) { return item.id === id; });
    if (!app) return;

    activeAppId = app.id;
    lastFocusedElement = document.activeElement;
    el.drawerBody.innerHTML = drawerHtml(app);
    el.drawerBody.scrollTop = 0;
    el.drawer.classList.add('is-open');
    el.drawerBackdrop.classList.add('is-open');
    document.body.classList.add('is-locked');

    if (pushHistory) {
      history.pushState({ app: id }, '', '#/app/' + id);
      drawerPushedHistory = true;
    }

    window.setTimeout(function () {
      el.drawerClose.focus({ preventScroll: true });
    }, 120);
  }

  function requestCloseDrawer() {
    if (!el.drawer.classList.contains('is-open')) return;
    if (drawerPushedHistory && location.hash.indexOf('#/app/') === 0) {
      history.back();
    } else {
      history.replaceState(null, '', location.pathname + location.search);
      hideDrawer();
    }
  }

  function parseAppHash() {
    const match = location.hash.match(/^#\/app\/([a-z0-9-]+)$/i);
    return match ? match[1] : '';
  }

  function syncFromHash() {
    const id = parseAppHash();
    if (id) {
      if (activeAppId !== id) openApp(id, false);
    } else if (activeAppId) {
      hideDrawer();
    }
  }

  /* ---------- 主题 ---------- */

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem('appvault-theme', theme); } catch (error) {}
    }
    if (el.themeMeta) {
      el.themeMeta.setAttribute('content', theme === 'dark' ? '#0B0C08' : '#F7F6F2');
    }
    el.themeToggle.setAttribute('aria-label',
      theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
  }

  function initTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current, false);
    el.themeToggle.addEventListener('click', function () {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
    });
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', function (event) {
        try {
          if (!localStorage.getItem('appvault-theme')) {
            applyTheme(event.matches ? 'dark' : 'light', false);
          }
        } catch (error) {}
      });
    }
  }

  /* ---------- 复制 / 提示 ---------- */

  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      el.toast.classList.remove('is-visible');
    }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('已复制官网链接');
      }).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', 'readonly');
    area.style.position = 'fixed';
    area.style.top = '-9999px';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      showToast('已复制官网链接');
    } catch (error) {
      showToast('复制失败，请手动选择链接');
    }
    document.body.removeChild(area);
  }

  /* ---------- 事件绑定 ---------- */

  function focusSearch() {
    el.searchInput.focus();
    el.searchInput.select();
  }

  function updateSearch(value) {
    state.query = value;
    el.searchClear.hidden = value.length === 0;
    render();
  }

  function bindEvents() {
    el.searchInput.addEventListener('input', function (event) {
      if (composing) return;
      updateSearch(event.target.value);
    });

    el.searchInput.addEventListener('compositionstart', function () {
      composing = true;
    });

    el.searchInput.addEventListener('compositionend', function (event) {
      composing = false;
      updateSearch(event.target.value);
    });

    el.searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    el.searchClear.addEventListener('click', function () {
      updateSearch('');
      el.searchInput.focus();
    });

    document.querySelectorAll('[data-query]').forEach(function (button) {
      button.addEventListener('click', function () {
        const value = button.getAttribute('data-query');
        el.searchInput.value = value;
        updateSearch(value);
        if (state.category !== 'all') {
          state.category = 'all';
        }
        if (state.platform !== 'all') {
          state.platform = 'all';
          el.platformSelect.value = 'all';
        }
        render();
        const catalog = document.getElementById('apps');
        if (catalog) {
          catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    el.categoryChips.addEventListener('click', function (event) {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      state.category = chip.dataset.category;
      render();
    });

    el.platformSelect.addEventListener('change', function (event) {
      state.platform = event.target.value;
      render();
    });

    el.sortSelect.addEventListener('change', function (event) {
      state.sort = event.target.value;
      render();
    });

    el.resetFilters.addEventListener('click', function () {
      state.query = '';
      state.category = 'all';
      state.platform = 'all';
      state.sort = 'recommended';
      el.searchInput.value = '';
      el.searchClear.hidden = true;
      el.platformSelect.value = 'all';
      el.sortSelect.value = 'recommended';
      render();
      el.searchInput.focus();
    });

    el.grid.addEventListener('click', function (event) {
      const card = event.target.closest('.card');
      if (!card) return;
      event.preventDefault();
      openApp(card.dataset.id, true);
    });

    el.drawerClose.addEventListener('click', requestCloseDrawer);

    el.drawerBackdrop.addEventListener('click', requestCloseDrawer);

    el.drawerBody.addEventListener('click', function (event) {
      const copyButton = event.target.closest('[data-copy]');
      if (copyButton) {
        copyText(copyButton.getAttribute('data-copy'));
      }
    });

    document.addEventListener('keydown', function (event) {
      const target = event.target;
      const typing = target.matches('input, textarea, select') || target.isContentEditable;

      if (event.key === 'Escape') {
        if (el.drawer.classList.contains('is-open')) {
          requestCloseDrawer();
          return;
        }
        if (target === el.searchInput) {
          if (state.query) {
            updateSearch('');
          } else {
            target.blur();
          }
        }
        return;
      }

      if (event.key === '/' && !typing) {
        event.preventDefault();
        focusSearch();
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        focusSearch();
      }
    });

    el.drawer.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      const focusable = el.drawer.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener('popstate', syncFromHash);
    window.addEventListener('hashchange', syncFromHash);

    window.addEventListener('scroll', function () {
      el.header.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* ---------- 初始化 ---------- */

  function initStats() {
    if (el.statApps) el.statApps.textContent = APPS.length;
    if (el.statLinks) el.statLinks.textContent = totalLinks();
    if (el.statPlatforms) el.statPlatforms.textContent = OS_ORDER.length;
    if (el.statCategories) el.statCategories.textContent = CATEGORIES.length;
    if (el.year) el.year.textContent = new Date().getFullYear();

    const platformStats = document.getElementById('platformStats');
    if (platformStats) {
      const counts = OS_ORDER.map(function (os) {
        const count = APPS.reduce(function (sum, app) {
          return sum + app.downloads.filter(function (item) { return item.os === os; }).length;
        }, 0);
        return { os: os, count: count };
      });
      const max = Math.max.apply(null, counts.map(function (item) { return item.count; }).concat([1]));
      platformStats.innerHTML = counts.map(function (item) {
        const width = Math.round((item.count / max) * 100);
        return '<div class="aside-platform">' +
          '<span class="aside-os">' + escapeHtml(OS_META[item.os].label) + '</span>' +
          '<span class="aside-track"><span style="width:' + width + '%"></span></span>' +
          '<span class="aside-count">' + item.count + '</span>' +
        '</div>';
      }).join('');
    }
  }

  function initRepoLinks() {
    const repo = String(CONFIG.repoUrl || '').replace(/\/$/, '');
    if (!repo) {
      document.querySelectorAll('.js-repo-link').forEach(function (link) {
        link.classList.add('is-hidden');
      });
      const repoColumn = document.querySelector('[data-repo-column]');
      if (repoColumn) repoColumn.classList.add('is-hidden');
      const footerLinks = document.querySelector('.footer-links');
      if (footerLinks) footerLinks.classList.add('is-compact');
      return;
    }
    document.querySelectorAll('.js-repo-link').forEach(function (link) {
      const path = link.getAttribute('data-repo-path') || '';
      link.href = repo + path;
    });
  }

  function init() {
    el.themeToggle.setAttribute('aria-label', '切换深色 / 浅色主题');
    initTheme();
    initStats();
    initRepoLinks();
    renderCategoryChips();
    render();

    // 让 CSS 过渡对抽屉生效
    el.drawer.removeAttribute('hidden');
    el.drawerBackdrop.removeAttribute('hidden');

    el.header.classList.toggle('is-scrolled', window.scrollY > 8);
    bindEvents();

    const initialId = parseAppHash();
    if (initialId && APPS.some(function (app) { return app.id === initialId; })) {
      window.setTimeout(function () { openApp(initialId, false); }, 60);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
