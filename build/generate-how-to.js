#!/usr/bin/env node
/**
 * Outdraft "How to use" generator.
 * Builds /<lang>/how-to-use/<windows|linux>/index.html with the guides look (shared head, header, footer).
 * The desktop app links to these exact paths, so keep the slugs stable.
 * Copy lives in build/how-to-content.js.
 * Usage: node build/generate-how-to.js [outDir]
 */
const fs = require('fs');
const path = require('path');
const { DOMAIN, LANGS, UI, esc, strip, url, head, header, footer } = require('./generate-articles');
const CONTENT = require('./how-to-content');

const OSES = ['windows', 'linux'];
const OS_NAMES = { windows: 'Windows', linux: 'Linux' };
const UPDATED = '2026-10-31';
const slugFor = os => `how-to-use/${os}`;

const CSS = `  <style>
    .os { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; margin-top: 4px; }
    .os a { padding: 7px 14px; font-size: 14px; font-weight: 600; color: var(--muted); text-decoration: none; }
    .os a:hover { color: var(--text); } .os a[aria-current="page"] { background: #1c2430; color: var(--text); }
    .howto { max-width: 720px; padding: 40px 0 56px; counter-reset: step; }
    .howto h2 { display: flex; align-items: center; gap: 12px; font-size: 24px; margin: 40px 0 12px; }
    .howto h2:first-child { margin-top: 0; }
    .howto h2::before { counter-increment: step; content: counter(step); display: inline-grid; place-items: center; flex: none;
                        width: 30px; height: 30px; border-radius: 50%; background: #10221c; color: var(--r); font-size: 15px; }
    .howto code { font: 14px ui-monospace, SFMono-Regular, Menlo, monospace; background: #1c2430; padding: 2px 6px; border-radius: 5px; }
    .howto pre { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; overflow-x: auto; margin: 0 0 16px; }
    .howto pre code { background: none; padding: 0; }
  </style>`;

function buildPage(lang, os) {
  const c = CONTENT[lang];
  const page = c[os];
  const u = UI[lang];
  const slug = slugFor(os);
  const steps = c.steps.filter(([, , only]) => !only || only === os);
  const body = steps.map(([h, html]) => `<h2>${h}</h2>\n${html}`).join('\n\n');
  const osSwitch = OSES.map(o => `<a href="/${lang}/${slugFor(o)}/"${o === os ? ' aria-current="page"' : ''}>${OS_NAMES[o]}</a>`).join('');

  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'HowTo', name: page.title, description: page.description, inLanguage: lang,
      url: url(lang, slug), dateModified: UPDATED,
      step: steps.map(([h, html], i) => ({ '@type': 'HowToStep', position: i + 1, name: strip(h), text: strip(html) })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: u.home, item: url(lang) },
      { '@type': 'ListItem', position: 2, name: c.crumb, item: url(lang, slug) } ] },
  ];

  return `${head(lang, { title: page.metaTitle, description: page.description, slug, ogType: 'article', jsonld })}
${CSS}
${header(lang, slug, 'how-to')}

<div class="ahead"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/${lang}/">${u.home}</a><span>/</span>${c.crumb}<span>/</span>${OS_NAMES[os]}</nav>
  <span class="tag">${c.tag}</span>
  <h1>${esc(page.title)}</h1>
  <p class="lead">${page.lead}</p>
  <nav class="os" aria-label="${esc(c.other)}">${osSwitch}</nav>
</div></div>

<div class="wrap"><article class="howto">
${body}
</article></div>

${footer(lang)}`;
}

function updateSitemap(outDir) {
  const p = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(p)) return;
  let xml = fs.readFileSync(p, 'utf8').replace(/\s*<!-- how-to -->[\s\S]*<!-- \/how-to -->/, '');
  let add = '\n\n  <!-- how-to -->';
  for (const os of OSES) for (const lang of LANGS) {
    const slug = slugFor(os);
    add += `\n  <url>\n    <loc>${url(lang, slug)}</loc>\n    <lastmod>${UPDATED}</lastmod>\n` +
      LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, slug)}"/>\n`).join('') +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', slug)}"/>\n  </url>`;
  }
  add += '\n  <!-- /how-to -->';
  xml = xml.replace('\n</urlset>', add + '\n</urlset>');
  fs.writeFileSync(p, xml);
}

function main() {
  const outDir = process.argv[2] || path.join(__dirname, '..');
  for (const lang of LANGS) for (const os of OSES) {
    const dir = path.join(outDir, lang, 'how-to-use', os);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildPage(lang, os));
    console.log(`  Generated /${lang}/${slugFor(os)}/index.html`);
  }
  updateSitemap(outDir);
}

main();
