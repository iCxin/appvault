import fs from 'node:fs';
import vm from 'node:vm';

const root = process.cwd();
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('data/apps.js', 'utf8'), sandbox);
const curated = sandbox.window.APP_DATA.apps;

const TARGET_EXTENDED = 9904; // 96 curated + 9904 = 10,000
const palette = [
  '#2563EB', '#16A34A', '#DC2626', '#7C3AED', '#0891B2', '#EA580C',
  '#4F46E5', '#0F766E', '#9333EA', '#B45309', '#BE123C', '#1D4ED8'
];

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '');
}

function sanitizeId(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 64) || 'app';
}

function colorFor(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length];
}

function trimText(value, max) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;
}

function validUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch (error) {
    return false;
  }
}

function resolveCaskUrl(url, version) {
  if (!url || !validUrl(url)) return '';
  let result = String(url).
    replaceAll('#{version.major}', String(version || '').split('.')[0] || '').
    replaceAll('#{version.minor}', String(version || '').split('.')[1] || '').
    replaceAll('#{version.patch}', String(version || '').split('.')[2] || '').
    replaceAll('#{version}', String(version || ''));
  if (result.includes('#{')) return '';
  result = result.replace(/([^:]\/)\/+/g, '$1');
  return validUrl(result) ? result : '';
}

const curatedNames = new Set();
const curatedUrls = new Set();
const curatedIds = new Set();
for (const app of curated) {
  curatedNames.add(normalize(app.name));
  curatedNames.add(normalize(app.nameZh));
  curatedUrls.add(String(app.official || '').replace(/\/$/, '').toLowerCase());
  curatedIds.add(app.id);
}

console.log('Loading Homebrew catalogs...');
let casks;
let formulas;
if (fs.existsSync('.cache-cask.json') && fs.existsSync('.cache-formula.json')) {
  casks = JSON.parse(fs.readFileSync('.cache-cask.json', 'utf8'));
  formulas = JSON.parse(fs.readFileSync('.cache-formula.json', 'utf8'));
} else {
  const caskResponse = await fetch('https://formulae.brew.sh/api/cask.json', { signal: AbortSignal.timeout(120000) });
  const formulaResponse = await fetch('https://formulae.brew.sh/api/formula.json', { signal: AbortSignal.timeout(180000) });
  if (!caskResponse.ok || !formulaResponse.ok) throw new Error('Homebrew API unavailable');
  casks = await caskResponse.json();
  formulas = await formulaResponse.json();
}
console.log('casks', casks.length, 'formulas', formulas.length);

const extended = [];
const usedNames = new Set(curatedNames);
const usedIds = new Set(curatedIds);

function addEntry(entry) {
  if (!entry) return false;
  const keyName = normalize(entry.name);
  if (!keyName || usedNames.has(keyName)) return false;
  const keyUrl = entry.official.replace(/\/$/, '').toLowerCase();
  if (curatedUrls.has(keyUrl)) return false;
  if (!entry.id || usedIds.has(entry.id)) return false;
  usedNames.add(keyName);
  usedIds.add(entry.id);
  extended.push(entry);
  return true;
}

for (const cask of casks) {
  if (extended.length >= TARGET_EXTENDED) break;
  if (cask.disabled || cask.deprecated) continue;
  const homepage = cask.homepage;
  if (!homepage || !validUrl(homepage)) continue;
  const name = trimText(Array.isArray(cask.name) ? cask.name[0] : cask.token, 90);
  const id = 'cask-' + sanitizeId(cask.token);
  const direct = resolveCaskUrl(cask.url, cask.version);
  const downloadUrl = direct || homepage;
  addEntry({
    id: id,
    name: name,
    nameZh: name,
    aliases: [cask.token, cask.full_token].filter(Boolean),
    category: 'extended',
    tagline: trimText(cask.desc || 'macOS 应用，收录自 Homebrew Cask 公开目录。', 110),
    official: homepage,
    license: '见官网',
    color: colorFor(id),
    source: 'Homebrew Cask',
    downloads: [{
      os: 'macos',
      label: direct ? 'macOS 版 · 官方安装包' : 'macOS 版 · 官网',
      url: downloadUrl
    }]
  });
}

for (const formula of formulas) {
  if (extended.length >= TARGET_EXTENDED) break;
  const homepage = formula.homepage;
  if (!homepage || !validUrl(homepage)) continue;
  const name = trimText(formula.name, 90);
  const id = 'formula-' + sanitizeId(formula.name);
  addEntry({
    id: id,
    name: name,
    nameZh: name,
    aliases: [formula.full_name, formula.name].concat(formula.aliases || []).filter(Boolean),
    category: 'extended',
    tagline: trimText(formula.desc || '命令行工具，收录自 Homebrew Formula 公开目录。', 110),
    official: homepage,
    license: typeof formula.license === 'string' ? formula.license : '见官网',
    color: colorFor(id),
    source: 'Homebrew Formula',
    downloads: [{
      os: 'macos',
      label: 'macOS 版 · 官网',
      url: homepage
    }]
  });
}

console.log('extended generated', extended.length);
if (extended.length < TARGET_EXTENDED) {
  console.log('WARNING: fewer than target');
}

const header = `/* =========================================================
   AppVault 扩展目录（自动生成，请勿手工编辑）
   数据来源：Homebrew API（https://formulae.brew.sh/）
   共 ${extended.length} 条，均为 macOS 条目；官方主页/下载链接来自公开元数据，
   未逐条人工复核。精选条目见 data/apps.js。
   ========================================================= */

window.EXTENDED_APPS = `;

fs.writeFileSync(
  'data/extended.js',
  header + '[\n' + extended.map(function (entry) { return JSON.stringify(entry); }).join(',\n') + '\n];\n'
);
const bytes = fs.statSync('data/extended.js').size;
console.log('data/extended.js', bytes, 'bytes');
