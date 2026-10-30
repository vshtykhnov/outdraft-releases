#!/usr/bin/env node
/**
 * Outdraft guides generator.
 * Builds /<lang>/<slug>/index.html for every article plus /<lang>/guides/ index,
 * reusing the landing look (same tokens, header, footer, language switcher).
 * Content lives in build/articles/content-<lang>.js, sources in build/articles/sources.js.
 * Usage: node build/generate-articles.js [outDir]
 */
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://outdraft.org';
const LANGS = ['en', 'ru', 'uk'];
const LOCALE = { en: 'en_US', ru: 'ru_RU', uk: 'uk_UA' };
const PUBLISHED = '2026-10-19';
const DOWNLOAD = 'https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-windows-x86_64.exe';
const ORDER = ['why-i-keep-losing', 'can-you-win-in-draft', 'last-pick-counter-math', 'cant-kill-this-hero'];

const CONTENT = {
  en: require('./articles/content-en'),
  ru: require('./articles/content-ru'),
  uk: require('./articles/content-uk'),
};
const SOURCES = require('./articles/sources');

const UI = {
  en: { home: 'Home', guides: 'Guides', features: 'Features', faq: 'FAQ', updated: 'Updated', read: 'min read',
        data: 'Live numbers: Dotabuff / OpenDota / D2PT, 19 Oct 2026, patch 7.41', toc: 'On this page',
        sources: 'Sources', related: 'Read next', faqTitle: 'Questions', ctaTitle: 'See your draft odds live',
        ctaText: 'Outdraft is a free overlay for Dota 2. It reads the picks on your screen and shows each hero’s impact in %, lane ratings and the overall draft win chance.',
        download: '⬇ Download for Windows', how: 'How it works', tg: 'Telegram', foot: '© 2026 Outdraft · Not affiliated with Valve',
        feedback: 'Feedback', releases: 'All releases',
        guidesTitle: 'Dota 2 draft guides', guidesMeta: 'Guides | Outdraft',
        guidesLead: 'Research, real numbers and honest answers about drafting in Dota 2. No filler: every figure links to its source.',
        guidesDesc: 'Dota 2 draft guides based on research and real match data: losing streaks, draft win prediction, counter-picking and hard-to-kill heroes.' },
  ru: { home: 'Главная', guides: 'Статьи', features: 'Возможности', faq: 'Вопросы', updated: 'Обновлено', read: 'мин чтения',
        data: 'Живые цифры: Dotabuff / OpenDota / D2PT, 19.10.2026, патч 7.41', toc: 'Содержание',
        sources: 'Источники', related: 'Читать дальше', faqTitle: 'Частые вопросы', ctaTitle: 'Смотри шансы своего драфта вживую',
        ctaText: 'Outdraft — бесплатный оверлей для Dota 2. Он читает пики с экрана и показывает вклад каждого героя в процентах, расклад по линиям и общий шанс драфта на победу.',
        download: '⬇ Скачать для Windows', how: 'Как это работает', tg: 'Telegram', foot: '© 2026 Outdraft · Не связан с Valve',
        feedback: 'Обратная связь', releases: 'Все версии',
        guidesTitle: 'Статьи о драфте в Dota 2', guidesMeta: 'Статьи о драфте | Outdraft',
        guidesLead: 'Исследования, реальные цифры и честные ответы о драфте в Dota 2. Без воды: у каждой цифры есть ссылка на источник.',
        guidesDesc: 'Статьи о драфте в Dota 2 на основе исследований и статистики матчей: серии поражений, шанс победы по пикам, контрпик и неубиваемые герои.' },
  uk: { home: 'Головна', guides: 'Статті', features: 'Можливості', faq: 'Питання', updated: 'Оновлено', read: 'хв читання',
        data: 'Живі цифри: Dotabuff / OpenDota / D2PT, 19.10.2026, патч 7.41', toc: 'Зміст',
        sources: 'Джерела', related: 'Читати далі', faqTitle: 'Часті питання', ctaTitle: 'Дивись шанси свого драфту наживо',
        ctaText: 'Outdraft — безкоштовний оверлей для Dota 2. Він читає піки з екрана й показує внесок кожного героя у відсотках, розклад по лініях і загальний шанс драфту на перемогу.',
        download: '⬇ Завантажити для Windows', how: 'Як це працює', tg: 'Telegram', foot: '© 2026 Outdraft · Не пов\'язаний із Valve',
        feedback: 'Зворотний зв\'язок', releases: 'Усі версії',
        guidesTitle: 'Статті про драфт у Dota 2', guidesMeta: 'Статті про драфт | Outdraft',
        guidesLead: 'Дослідження, реальні цифри й чесні відповіді про драфт у Dota 2. Без води: кожна цифра має посилання на джерело.',
        guidesDesc: 'Статті про драфт у Dota 2 на основі досліджень і статистики матчів: серії поразок, шанс перемоги за піками, контрпік і невбивні герої.' },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const url = (lang, slug) => `${DOMAIN}/${lang}/${slug ? slug + '/' : ''}`;
const words = s => strip(s).split(' ').filter(w => /[\p{L}\p{N}]/u.test(w)).length;

const TG_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M21.9 4.6 18.7 19.7c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.3Z"/></svg>';
const LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#141414"/><g fill="none" stroke-width="7"><circle cx="32" cy="32" r="17" stroke="#5DCAA5" stroke-dasharray="48 59" transform="rotate(-90 32 32)"/><circle cx="32" cy="32" r="17" stroke="#E24B4A" stroke-dasharray="48 59" transform="rotate(90 32 32)"/></g></svg>';

const CSS = `
    @font-face { font-family: 'Inter'; src: url('/fonts/inter-var.woff2') format('woff2'); font-weight: 100 900; font-style: normal; font-display: swap; }
    :root { --bg: #0a0d12; --panel: #10151c; --card: #141a22; --line: #222b37; --text: #e8edf4; --muted: #8b95a5; --r: #5DCAA5; --d: #E24B4A; }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.6 Inter, system-ui, sans-serif; }
    a { color: inherit; }
    .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
    .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 18px; text-decoration: none; }
    .brand svg { width: 32px; height: 32px; }
    .right { display: flex; align-items: center; gap: 22px; }
    .links { display: flex; gap: 22px; font-size: 14px; color: var(--muted); }
    .links a { text-decoration: none; } .links a:hover, .links a[aria-current] { color: var(--text); }
    .lang { display: flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
    .lang a { color: var(--muted); font: 600 13px Inter, sans-serif; padding: 6px 10px; text-decoration: none; }
    .lang a:hover { color: var(--text); } .lang a[aria-current="page"] { background: #1c2430; color: var(--text); }
    .tg-top { display: inline-flex; align-items: center; color: var(--muted); } .tg-top:hover { color: #2aabee; }
    .btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; border-radius: 10px; background: var(--r); color: #05140e; font-weight: 700; text-decoration: none; }
    .btn:hover { filter: brightness(1.08); }
    .btn.ghost { background: none; color: var(--text); border: 1px solid var(--line); font-weight: 600; } .btn.ghost:hover { border-color: var(--r); color: var(--r); filter: none; }
    .tag { display: inline-block; font-size: 13px; color: var(--r); border: 1px solid #2c4a40; background: #10221c; padding: 4px 10px; border-radius: 999px; margin-bottom: 18px; }
    .crumbs { font-size: 13px; color: var(--muted); margin: 8px 0 26px; } .crumbs a { text-decoration: none; } .crumbs a:hover { color: var(--text); } .crumbs span { margin: 0 8px; opacity: .5; }
    .ahead { padding: 24px 0 40px; border-bottom: 1px solid #141b24; background: radial-gradient(60% 120% at 0% 0%, #12261f 0%, transparent 60%), radial-gradient(50% 120% at 100% 0%, #2a1515 0%, transparent 55%); }
    h1 { font-size: 46px; line-height: 1.08; margin: 0 0 18px; letter-spacing: -1.4px; font-weight: 800; max-width: 18em; }
    h1 .r { color: var(--r); } h1 .d { color: var(--d); }
    .lead { color: #c3cbd7; font-size: 19px; margin: 0 0 22px; max-width: 40em; }
    .meta { font-size: 13px; color: var(--muted); display: flex; gap: 18px; flex-wrap: wrap; }
    .layout { display: grid; grid-template-columns: 1fr 250px; gap: 56px; padding: 44px 0 24px; }
    .toc { position: sticky; top: 24px; align-self: start; font-size: 14px; border-left: 1px solid var(--line); padding-left: 18px; }
    .toc b { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-bottom: 10px; }
    .toc a { display: block; color: var(--muted); text-decoration: none; padding: 5px 0; line-height: 1.35; } .toc a:hover { color: var(--text); }
    .toc .btn { margin-top: 18px; padding: 10px 14px; font-size: 14px; color: #05140e; display: inline-flex; }
    article { max-width: 720px; font-size: 17px; line-height: 1.7; }
    article h2 { font-size: 28px; line-height: 1.2; margin: 48px 0 14px; letter-spacing: -.5px; scroll-margin-top: 16px; }
    article h2:first-child { margin-top: 0; }
    article h3 { font-size: 19px; margin: 28px 0 8px; }
    article p { margin: 0 0 16px; color: #d3d9e2; }
    article ul, article ol { padding-left: 22px; margin: 0 0 18px; color: #d3d9e2; } article li { margin-bottom: 6px; }
    article a { color: var(--r); text-decoration: underline; text-decoration-color: #2c4a40; text-underline-offset: 3px; } article a:hover { text-decoration-color: var(--r); }
    article b, article strong { color: var(--text); }
    sup a { text-decoration: none !important; font-size: 12px; color: var(--muted) !important; padding-left: 1px; }
    .tbl { overflow-x: auto; margin: 8px 0 22px; border: 1px solid var(--line); border-radius: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 15px; background: var(--card); }
    th, td { text-align: left; padding: 11px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }
    th { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); background: #10151c; font-weight: 600; }
    tr:last-child td { border-bottom: 0; } td.num { font-variant-numeric: tabular-nums; white-space: nowrap; font-weight: 700; }
    .up { color: var(--r); } .dn { color: var(--d); }
    .callout { border: 1px solid #2c4a40; background: #0f1d18; border-radius: 12px; padding: 16px 20px; margin: 8px 0 22px; }
    .callout.warn { border-color: #4a2c2c; background: #1c1111; }
    .callout.od { border-color: #2a3a52; background: #0f1724; }
    .callout p:last-child { margin-bottom: 0; }
    .callout .k { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--r); font-weight: 700; margin-bottom: 6px; }
    .callout.warn .k { color: var(--d); } .callout.od .k { color: #8fb3ff; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 8px 0 24px; }
    .stat { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px; }
    .stat b { display: block; font-size: 30px; line-height: 1.1; letter-spacing: -1px; color: var(--r); }
    .stat.d b { color: var(--d); } .stat span { display: block; font-size: 13px; color: var(--muted); margin-top: 6px; line-height: 1.4; }
    .pill { display: inline-block; font-size: 13px; font-weight: 700; padding: 1px 8px; border-radius: 6px; background: #1c2430; white-space: nowrap; }
    .pill.g { color: var(--r); background: #10221c; } .pill.h { color: #f0b35a; background: #2a2010; } .pill.vh { color: var(--d); background: #2a1414; } .pill.e { color: #c3cbd7; }
    section.blk { padding: 44px 0; border-top: 1px solid #141b24; }
    section.blk h2 { font-size: 26px; margin: 0 0 20px; letter-spacing: -.5px; }
    details { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px 20px; margin-bottom: 10px; max-width: 820px; }
    summary { cursor: pointer; font-weight: 700; list-style: none; } summary::-webkit-details-marker { display: none; }
    summary::after { content: "+"; float: right; color: var(--muted); } details[open] summary::after { content: "–"; }
    details p { color: var(--muted); margin: 10px 0 0; }
    .ctabox { display: grid; grid-template-columns: 1fr auto; gap: 28px; align-items: center; border-radius: 16px; padding: 28px; border: 1px solid var(--line);
              background: radial-gradient(120% 120% at 0% 0%, #17322a 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, #3a1a1a 0%, transparent 55%), var(--panel); }
    .ctabox h2 { margin: 0 0 8px !important; } .ctabox p { margin: 0; color: var(--muted); max-width: 36em; }
    .ctabox .acts { display: flex; flex-direction: column; gap: 10px; }
    .ctabox img { width: 100%; max-width: 220px; height: auto; border-radius: 10px; display: block; -webkit-mask-image: linear-gradient(#000 80%, transparent); mask-image: linear-gradient(#000 80%, transparent); }
    .ctabox .row { display: grid; grid-template-columns: 220px 1fr; gap: 24px; align-items: center; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .grid.g3 { grid-template-columns: repeat(3, 1fr); }
    .card { display: block; background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 20px; text-decoration: none; transition: border-color .15s; }
    a.card:hover { border-color: #2c4a40; }
    .card .n { font-size: 12px; color: var(--r); font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
    .card h3 { margin: 6px 0 6px; font-size: 17px; line-height: 1.3; } .card p { margin: 0; color: var(--muted); font-size: 14px; }
    ol.src { font-size: 14px; color: var(--muted); padding-left: 22px; margin: 0; columns: 1; } ol.src li { margin-bottom: 6px; word-break: break-word; }
    ol.src a { color: #b9c3d0; } ol.src a:hover { color: var(--r); }
    .note { font-size: 13px; color: var(--muted); margin-top: 14px; }
    footer { padding: 32px 0 48px; border-top: 1px solid #141b24; color: var(--muted); font-size: 14px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    footer .links { display: flex; flex-wrap: wrap; row-gap: 8px; }
    @media (max-width: 920px) { .layout { grid-template-columns: 1fr; gap: 0; } .toc { display: none; } }
    @media (max-width: 820px) {
      .wrap { padding: 0 16px; } h1 { font-size: 32px; letter-spacing: -1px; } .lead { font-size: 17px; }
      article { font-size: 16px; } article h2 { font-size: 23px; margin-top: 38px; }
      .stats { grid-template-columns: 1fr; } .grid, .grid.g3 { grid-template-columns: 1fr; }
      .ctabox { grid-template-columns: 1fr; padding: 20px; } .ctabox .row { grid-template-columns: 1fr; } .ctabox img { max-width: 260px; }
      .btn { justify-content: center; } .top .links { display: none; } footer { flex-direction: column; }
      th, td { padding: 9px 10px; font-size: 14px; }
    }`;

const POSTHOG = `  <script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias set_config reset opt_in_capturing opt_out_capturing has_opted_out_capturing get_distinct_id get_property".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init("phc_tXqHeZPMF6h8Ls2ETXPWwyt8392FjHPi3TkW8wiMrmcf", {api_host: "https://eu.i.posthog.com", persistence: "memory", person_profiles: "never"});
  </script>`;

function head(lang, { title, description, slug, ogType, jsonld }) {
  const alts = LANGS.map(l => `  <link rel="alternate" hreflang="${l}" href="${url(l, slug)}">`).join('\n');
  const altLoc = LANGS.filter(l => l !== lang).map(l => `  <meta property="og:locale:alternate" content="${LOCALE[l]}">`).join('\n');
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <link rel="canonical" href="${url(lang, slug)}">
  <meta name="description" content="${esc(description)}">
${alts}
  <link rel="alternate" hreflang="x-default" href="${url('en', slug)}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Outdraft">
  <meta property="og:url" content="${url(lang, slug)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${DOMAIN}/media/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${LOCALE[lang]}">
${altLoc}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${DOMAIN}/media/og-image.png">
${jsonld.map(j => `  <script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <style>${CSS}
  </style>
${POSTHOG}
</head>
<body>`;
}

function header(lang, slug, current) {
  const u = UI[lang];
  const sw = LANGS.map(l => `<a href="/${l}/${slug ? slug + '/' : ''}" hreflang="${l}"${l === lang ? ' aria-current="page"' : ''}>${l === 'uk' ? 'UA' : l.toUpperCase()}</a>`).join('');
  return `<div class="wrap">
  <header class="top">
    <a class="brand" href="/${lang}/">${LOGO}Outdraft</a>
    <div class="right">
      <nav class="links"><a href="/${lang}/guides/"${current === 'guides' ? ' aria-current="page"' : ''}>${u.guides}</a><a href="/${lang}/#features">${u.features}</a><a href="/${lang}/#faq">${u.faq}</a></nav>
      <a class="tg-top" href="https://t.me/d2_outdraft" target="_blank" rel="noopener" aria-label="Telegram" title="Telegram">${TG_SVG}</a>
      <nav class="lang" role="group" aria-label="Language">${sw}</nav>
    </div>
  </header>
</div>`;
}

function footer(lang) {
  const u = UI[lang];
  return `<div class="wrap">
  <footer><span>${u.foot}</span>
    <nav class="links"><a href="/${lang}/guides/">${u.guides}</a><a href="https://t.me/d2_outdraft" target="_blank" rel="noopener">Telegram</a><a href="https://www.youtube.com/@comaapp" target="_blank" rel="noopener">YouTube</a><a href="https://tally.so/r/D4lK4E">${u.feedback}</a><a href="https://github.com/vshtykhnov/outdraft-releases/releases">${u.releases}</a></nav>
  </footer>
</div>
<script>
  document.querySelectorAll('.download-btn').forEach(a => a.addEventListener("click", () => posthog.capture("download_clicked", { from: location.pathname })));
</script>
</body>
</html>`;
}

function cta(lang) {
  const u = UI[lang];
  return `<section class="blk"><div class="wrap">
  <div class="ctabox">
    <div class="row"><img src="/media/overlay.png" alt="Outdraft overlay" width="488" height="468">
      <div><h2>${u.ctaTitle}</h2><p>${u.ctaText}</p></div></div>
    <div class="acts"><a class="btn download-btn" href="${DOWNLOAD}">${u.download}</a><a class="btn ghost" href="/${lang}/#start">${u.how}</a></div>
  </div>
</div></section>`;
}

function buildArticle(lang, id) {
  const a = CONTENT[lang][id];
  const u = UI[lang];
  const srcs = SOURCES[id];
  // number H2s for TOC
  let n = 0; const toc = [];
  const body = a.body.replace(/<h2>(.*?)<\/h2>/g, (_, t) => { n++; toc.push([`s${n}`, strip(t)]); return `<h2 id="s${n}">${t}</h2>`; })
    .replace(/\[(\d+)\]/g, (_, k) => `<sup><a href="#src${k}">[${k}]</a></sup>`);
  const wc = words(a.lead + body + a.faq.map(f => f.join(' ')).join(' '));
  const mins = Math.max(3, Math.round(wc / 200));
  const related = ORDER.filter(x => x !== id).map(x => {
    const r = CONTENT[lang][x];
    return `<a class="card" href="/${lang}/${x}/"><span class="n">${u.guides}</span><h3>${r.h1}</h3><p>${r.card}</p></a>`;
  }).join('\n    ');

  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: strip(a.h1), description: a.description, inLanguage: lang,
      datePublished: PUBLISHED, dateModified: PUBLISHED, mainEntityOfPage: url(lang, id), image: `${DOMAIN}/media/og-image.png`,
      author: { '@type': 'Organization', name: 'Outdraft', url: DOMAIN }, publisher: { '@type': 'Organization', name: 'Outdraft', logo: { '@type': 'ImageObject', url: `${DOMAIN}/apple-touch-icon.png` } },
      citation: srcs.map(s => s[1]) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(ans) } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: u.home, item: url(lang) },
      { '@type': 'ListItem', position: 2, name: u.guides, item: url(lang, 'guides') },
      { '@type': 'ListItem', position: 3, name: a.crumb, item: url(lang, id) } ] },
  ];

  const html = `${head(lang, { title: a.metaTitle, description: a.description, slug: id, ogType: 'article', jsonld })}
${header(lang, id, 'article')}

<div class="ahead"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/${lang}/">${u.home}</a><span>/</span><a href="/${lang}/guides/">${u.guides}</a><span>/</span>${a.crumb}</nav>
  <span class="tag">${a.tag}</span>
  <h1>${a.h1}</h1>
  <p class="lead">${a.lead}</p>
  <div class="meta"><span>${u.updated}: ${lang === 'en' ? '19 Oct 2026' : '19.10.2026'}</span><span>${mins} ${u.read}</span><span>${u.data}</span></div>
</div></div>

<div class="wrap"><div class="layout">
  <article>
${body}
  </article>
  <aside class="toc"><b>${u.toc}</b>${toc.map(([h, t]) => `<a href="#${h}">${t}</a>`).join('')}<a class="btn download-btn" href="${DOWNLOAD}">${u.download}</a></aside>
</div></div>

<section class="blk" id="faq"><div class="wrap">
  <h2>${u.faqTitle}</h2>
  ${a.faq.map(([q, ans], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${ans}</p></details>`).join('\n  ')}
</div></section>

${cta(lang)}

<section class="blk"><div class="wrap">
  <h2>${u.related}</h2>
  <div class="grid">
    ${related}
  </div>
</div></section>

<section class="blk" id="sources"><div class="wrap">
  <h2>${u.sources}</h2>
  <ol class="src">${srcs.map((s, i) => `<li id="src${i + 1}">${s[0]}. <a href="${s[1]}" target="_blank" rel="noopener nofollow">${s[1].replace(/^https?:\/\//, '')}</a></li>`).join('')}</ol>
  <p class="note">${a.note || ''}</p>
</div></section>

${footer(lang)}`;
  return { html, wc };
}

function buildGuides(lang) {
  const u = UI[lang];
  const cards = ORDER.map((x, i) => {
    const r = CONTENT[lang][x];
    return `<a class="card" href="/${lang}/${x}/"><span class="n">${String(i + 1).padStart(2, '0')} · ${r.tag}</span><h3>${r.h1}</h3><p>${r.card}</p></a>`;
  }).join('\n    ');
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: u.guidesTitle, description: u.guidesDesc, inLanguage: lang, url: url(lang, 'guides'),
      hasPart: ORDER.map(x => ({ '@type': 'Article', headline: strip(CONTENT[lang][x].h1), url: url(lang, x) })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: u.home, item: url(lang) }, { '@type': 'ListItem', position: 2, name: u.guides, item: url(lang, 'guides') } ] },
  ];
  return `${head(lang, { title: u.guidesMeta, description: u.guidesDesc, slug: 'guides', ogType: 'website', jsonld })}
${header(lang, 'guides', 'guides')}
<div class="ahead"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/${lang}/">${u.home}</a><span>/</span>${u.guides}</nav>
  <h1>${u.guidesTitle}</h1>
  <p class="lead">${u.guidesLead}</p>
</div></div>
<section class="blk" style="border-top:0"><div class="wrap">
  <div class="grid">
    ${cards}
  </div>
</div></section>
${cta(lang)}
${footer(lang)}`;
}

function updateSitemap(outDir) {
  const p = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(p)) return;
  let xml = fs.readFileSync(p, 'utf8').replace(/\s*<!-- guides -->[\s\S]*<!-- \/guides -->/, '');
  let add = '\n  <!-- guides -->';
  for (const slug of ['guides', ...ORDER]) for (const lang of LANGS) {
    add += `\n  <url>\n    <loc>${url(lang, slug)}</loc>\n    <lastmod>${PUBLISHED}</lastmod>\n` +
      LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, slug)}"/>\n`).join('') +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', slug)}"/>\n  </url>`;
  }
  add += '\n  <!-- /guides -->';
  xml = xml.replace('</urlset>', add + '\n</urlset>');
  fs.writeFileSync(p, xml);
}

function main() {
  const outDir = process.argv[2] || path.join(__dirname, '..');
  const report = [];
  for (const lang of LANGS) {
    for (const id of ORDER) {
      const { html, wc } = buildArticle(lang, id);
      const dir = path.join(outDir, lang, id);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      report.push(`${lang}/${id}: ${wc} words — ${strip(CONTENT[lang][id].metaTitle)}`);
    }
    fs.mkdirSync(path.join(outDir, lang, 'guides'), { recursive: true });
    fs.writeFileSync(path.join(outDir, lang, 'guides', 'index.html'), buildGuides(lang));
  }
  updateSitemap(outDir);
  console.log(report.join('\n'));
}
main();
