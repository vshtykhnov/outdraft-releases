#!/usr/bin/env node
/**
 * Outdraft patch pages generator.
 * Builds /<lang>/patch-7-42/index.html (EN, RU, UK) with the same look as the guides
 * (head, header, footer and styles come from generate-articles.js) and adds them to the sitemap.
 * Content lives in build/patch/content-<lang>.js.
 * Run after generate-articles.js, generate-how-to.js and generate-tour.js, so the sitemap keeps its order.
 * Usage: node build/generate-patch.js [outDir]
 */
const fs = require('fs');
const path = require('path');
const A = require('./generate-articles');
const { DOMAIN, LANGS, UI, strip, url, head, header, footer } = A;
// After the landing SEO changes the English home lives at "/"; fall back to /<lang>/ until then.
const homeHref = A.homeHref || (lang => `/${lang}/`);

const SLUG = 'patch-7-42';
const PUBLISHED = '2026-11-18';
const MODIFIED = '2026-11-18';
const DOWNLOAD = 'https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-windows-x86_64.exe';
const GUIDES = ['why-i-keep-losing', 'can-you-win-in-draft', 'last-pick-counter-math', 'cant-kill-this-hero'];

const CONTENT = {
  en: require('./patch/content-en'),
  ru: require('./patch/content-ru'),
  uk: require('./patch/content-uk'),
};
const ARTICLES = {
  en: require('./articles/content-en'),
  ru: require('./articles/content-ru'),
  uk: require('./articles/content-uk'),
};

const SOURCES = [
  ['Valve — Dota 2 Gameplay Update 7.42, official patch notes (18 Nov 2026)', 'https://www.dota2.com/patches/7.42'],
  ['AllPatchNotes — Dota 2 patch notes 7.42 (full mirror of the official notes)', 'https://allpatchnotes.com/g/dota-2/dota-patch-notes-7-42'],
  ['Metaratings — Valve released patch 7.42 for Dota 2: Khanda, Javelin and Swiftslash removed (18 Nov 2026, in Russian)', 'https://cybersport.metaratings.ru/news/valve-vypustila-patch-742-v-dota-2-iz-igry-udalili-khanda-javelin-i-swiftslash/'],
];

const words = s => strip(s).split(' ').filter(w => /[\p{L}\p{N}]/u.test(w)).length;

function cta(lang, c) {
  return `<section class="blk"><div class="wrap">
  <div class="ctabox">
    <div class="row"><img src="/media/overlay.png" alt="Outdraft overlay" width="488" height="468">
      <div><h2>${c.ctaTitle}</h2><p>${c.ctaText}</p></div></div>
    <div class="acts"><a class="btn download-btn" href="${DOWNLOAD}">${UI[lang].download}</a><a class="btn ghost" href="${homeHref(lang)}#start">${UI[lang].how}</a></div>
  </div>
</div></section>`;
}

function buildPage(lang) {
  const c = CONTENT[lang];
  const u = UI[lang];
  let n = 0; const toc = [];
  const body = c.body.replace(/<h2( class="[^"]*")?>(.*?)<\/h2>/g, (_, cls, t) => { n++; toc.push([`s${n}`, strip(t)]); return `<h2 id="s${n}"${cls || ''}>${t}</h2>`; })
    .replace(/\[(\d+)\]/g, (_, k) => `<sup><a href="#src${k}">[${k}]</a></sup>`);
  const wc = words(c.lead + body + c.faq.map(f => f.join(' ')).join(' '));
  const mins = Math.max(3, Math.round(wc / 200));
  const related = GUIDES.map(x => {
    const r = ARTICLES[lang][x];
    return `<a class="card" href="/${lang}/${x}/"><span class="n">${u.guides}</span><h3>${r.h1}</h3><p>${r.card}</p></a>`;
  }).join('\n    ');

  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: strip(c.h1), description: c.description, inLanguage: lang,
      datePublished: PUBLISHED, dateModified: MODIFIED, mainEntityOfPage: url(lang, SLUG), image: `${DOMAIN}/media/og-image.png?v=2`,
      about: { '@type': 'VideoGame', name: 'Dota 2' },
      author: { '@type': 'Organization', name: 'Outdraft', url: DOMAIN }, publisher: { '@type': 'Organization', name: 'Outdraft', logo: { '@type': 'ImageObject', url: `${DOMAIN}/apple-touch-icon.png` } },
      citation: SOURCES.map(s => s[1]) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(ans) } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: u.home, item: url(lang) },
      { '@type': 'ListItem', position: 2, name: u.guides, item: url(lang, 'guides') },
      { '@type': 'ListItem', position: 3, name: c.crumb, item: url(lang, SLUG) } ] },
  ];

  // Wide tables: let the article column shrink so they scroll inside .tbl instead of widening the page on phones.
  const html = `${head(lang, { title: c.metaTitle, description: c.description, slug: SLUG, ogType: 'article', jsonld }).replace('</head>', '  <style>article { min-width: 0; }</style>\n</head>')}
${header(lang, SLUG, 'article')}

<div class="ahead"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${homeHref(lang)}">${u.home}</a><span>/</span><a href="/${lang}/guides/">${u.guides}</a><span>/</span>${c.crumb}</nav>
  <span class="tag">${c.tag}</span>
  <h1>${c.h1}</h1>
  <p class="lead">${c.lead}</p>
  <div class="meta"><span>${u.updated}: ${lang === 'en' ? '18 Nov 2026' : '18.11.2026'}</span><span>${mins} ${u.read}</span><span>${c.data}</span></div>
</div></div>

<div class="wrap"><div class="layout">
  <article>
${body}
  </article>
  <aside class="toc"><b>${u.toc}</b>${toc.map(([h, t]) => `<a href="#${h}">${t}</a>`).join('')}<a class="btn download-btn" href="${DOWNLOAD}">${u.download}</a></aside>
</div></div>

<section class="blk" id="faq"><div class="wrap">
  <h2>${u.faqTitle}</h2>
  ${c.faq.map(([q, ans], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${ans}</p></details>`).join('\n  ')}
</div></section>

${cta(lang, c)}

<section class="blk"><div class="wrap">
  <h2>${u.related}</h2>
  <div class="grid">
    ${related}
  </div>
</div></section>

<section class="blk" id="sources"><div class="wrap">
  <h2>${u.sources}</h2>
  <ol class="src">${SOURCES.map((s, i) => `<li id="src${i + 1}">${s[0]}. <a href="${s[1]}" target="_blank" rel="noopener nofollow">${s[1].replace(/^https?:\/\//, '')}</a></li>`).join('')}</ol>
  <p class="note">${c.note}</p>
</div></section>

${footer(lang)}`;
  return { html, wc };
}

function updateSitemap(outDir) {
  const p = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(p)) return;
  let xml = fs.readFileSync(p, 'utf8').replace(/\s*<!-- patch -->[\s\S]*<!-- \/patch -->/, '');
  let add = '\n\n  <!-- patch -->';
  for (const lang of LANGS) {
    add += `\n  <url>\n    <loc>${url(lang, SLUG)}</loc>\n    <lastmod>${MODIFIED}</lastmod>\n` +
      LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, SLUG)}"/>\n`).join('') +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', SLUG)}"/>\n  </url>`;
  }
  add += '\n  <!-- /patch -->';
  fs.writeFileSync(p, xml.replace('\n</urlset>', add + '\n</urlset>'));
}

function main() {
  const outDir = process.argv[2] || path.join(__dirname, '..');
  for (const lang of LANGS) {
    const { html, wc } = buildPage(lang);
    const dir = path.join(outDir, lang, SLUG);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`  Generated /${lang}/${SLUG}/index.html (${wc} words) — ${CONTENT[lang].metaTitle}`);
  }
  updateSitemap(outDir);
}
if (require.main === module) main();

module.exports = { SLUG, CONTENT, MODIFIED };
