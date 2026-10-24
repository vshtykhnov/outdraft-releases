#!/usr/bin/env node
/**
 * Outdraft Landing Page Generator
 * 
 * Generates static HTML pages for each language (/en/, /ru/, /uk/) and a root index.html
 * with proper SEO tags including hreflang, Open Graph, Twitter Cards, and JSON-LD.
 */

const fs = require('fs');
const path = require('path');
const { EN, RU, UK, META } = require('./translations');

const LANGS = ['en', 'ru', 'uk'];
const DICTS = { en: EN, ru: RU, uk: UK };
const DOMAIN = 'https://outdraft.org';
const WINDOWS_DOWNLOAD = 'https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-windows-x86_64.zip';
const LINUX_DOWNLOAD = 'https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-linux-x86_64.tar.gz';

const LANG_NAMES = { en: 'en', ru: 'ru', uk: 'uk' };

function getLastMod() {
  return new Date().toISOString().split('T')[0];
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateHreflangTags(currentLang) {
  let tags = '';
  for (const lang of LANGS) {
    tags += `  <link rel="alternate" hreflang="${lang}" href="${DOMAIN}/${lang}/">\n`;
  }
  tags += `  <link rel="alternate" hreflang="x-default" href="${DOMAIN}/">`;
  return tags;
}

function generateOpenGraphTags(lang) {
  const meta = META[lang];
  const locale = { en: 'en_US', ru: 'ru_RU', uk: 'uk_UA' }[lang];
  const altLocales = LANGS.filter(l => l !== lang).map(l => ({ en: 'en_US', ru: 'ru_RU', uk: 'uk_UA' }[l]));
  
  let tags = `  <meta property="og:type" content="website">
  <meta property="og:url" content="${DOMAIN}/${lang}/">
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:image" content="${DOMAIN}/media/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${locale}">`;
  
  for (const alt of altLocales) {
    tags += `\n  <meta property="og:locale:alternate" content="${alt}">`;
  }
  
  return tags;
}

function generateTwitterCardTags(lang) {
  const meta = META[lang];
  return `  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="${DOMAIN}/media/og-image.png">`;
}

function generateJsonLd(lang) {
  const meta = META[lang];
  const dict = DICTS[lang];
  
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Outdraft",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Windows, Linux",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": meta.description,
    "downloadUrl": WINDOWS_DOWNLOAD,
    "softwareVersion": "0.2.0",
    "author": {
      "@type": "Organization",
      "name": "Outdraft"
    }
  };

  const videoObject = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": dict.demoTitle,
    "description": meta.description,
    "thumbnailUrl": `${DOMAIN}/media/demo.jpg`,
    "contentUrl": `${DOMAIN}/media/demo.mp4`,
    "uploadDate": "2026-01-01",
    "duration": "PT30S"
  };

  return `  <script type="application/ld+json">${JSON.stringify(softwareApp)}</script>
  <script type="application/ld+json">${JSON.stringify(videoObject)}</script>`;
}

function generateFaviconTags() {
  return `  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;
}

function generateLanguagePage(lang) {
  const dict = DICTS[lang];
  const meta = META[lang];
  const brandHref = `/${lang}/`;

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(meta.title)}</title>
  <link rel="canonical" href="${DOMAIN}/${lang}/">
  <meta name="description" content="${escapeHtml(meta.description)}">
${generateHreflangTags(lang)}
${generateFaviconTags()}
${generateOpenGraphTags(lang)}
${generateTwitterCardTags(lang)}
${generateJsonLd(lang)}
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('/fonts/inter-var.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    :root {
      --bg: #0a0d12; --panel: #10151c; --card: #141a22; --line: #222b37;
      --text: #e8edf4; --muted: #8b95a5; --r: #5DCAA5; --d: #E24B4A;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--bg); color: var(--text);
           font: 16px/1.6 Inter, system-ui, sans-serif; }
    a { color: inherit; }
    .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
    .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 18px; text-decoration: none; }
    .brand svg { width: 32px; height: 32px; }
    .right { display: flex; align-items: center; gap: 22px; }
    .links { display: flex; gap: 22px; font-size: 14px; color: var(--muted); }
    .links a { text-decoration: none; }
    .links a:hover { color: var(--text); }
    .lang { display: flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
    .lang a { background: none; border: 0; color: var(--muted); font: 600 13px Inter, sans-serif;
              padding: 6px 10px; text-decoration: none; }
    .lang a:hover { color: var(--text); }
    .lang a[aria-current="page"] { background: #1c2430; color: var(--text); }
    .hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; padding: 56px 0 72px; }
    .tag { display: inline-block; font-size: 13px; color: var(--r); border: 1px solid #2c4a40;
           background: #10221c; padding: 4px 10px; border-radius: 999px; margin-bottom: 18px; }
    h1 { font-size: 52px; line-height: 1.05; margin: 0 0 18px; letter-spacing: -1.5px; font-weight: 800; }
    h1 .r { color: var(--r); } h1 .d { color: var(--d); }
    .lead { color: var(--muted); font-size: 18px; margin: 0 0 28px; max-width: 30em; }
    .cta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 9px;
           background: var(--r); color: #05140e; font-weight: 700; text-decoration: none; }
    .btn:hover { filter: brightness(1.08); }
    .btn.linux { padding: 10px 14px; background: transparent; border: 1px solid var(--line); color: var(--muted); font-weight: 600; }
    .btn.linux:hover { border-color: var(--r); color: var(--text); filter: none; }
    .sub { font-size: 13px; color: var(--muted); }
    .btn.tg { background: none; color: var(--text); border: 1px solid var(--line); font-weight: 600; }
    .btn.tg:hover { border-color: #2aabee; color: #2aabee; filter: none; }
    .cta .tg { order: 1; }
    .cta .sub { order: 2; flex-basis: 100%; }
    .tg-top { display: inline-flex; align-items: center; color: var(--muted); }
    .tg-top:hover { color: #2aabee; }
    .shot { position: relative; border-radius: 16px; padding: 18px; background:
            radial-gradient(120% 90% at 0% 0%, #17322a 0%, transparent 55%),
            radial-gradient(120% 90% at 100% 100%, #3a1a1a 0%, transparent 55%), var(--panel);
            border: 1px solid var(--line); }
    .ov-img { display: block; width: 100%; height: auto; border-radius: 10px;
             -webkit-mask-image: linear-gradient(#000 82%, transparent); mask-image: linear-gradient(#000 82%, transparent); }
    .float { position: absolute; right: -14px; bottom: -18px; background: var(--card); border: 1px solid var(--line);
             border-radius: 10px; padding: 10px 14px; font-size: 13px; box-shadow: 0 10px 30px rgba(0,0,0,.4); }
    .float b { color: var(--r); }
    .demo { display: block; width: 100%; aspect-ratio: 16 / 9; border-radius: 12px; border: 1px solid var(--line); background: #000; }
    section { padding: 64px 0; border-top: 1px solid #141b24; scroll-margin-top: 8px; }
    h2 { font-size: 30px; margin: 0 0 24px; letter-spacing: -.5px; }
    .muted { color: var(--muted); margin: 0 0 32px; }
    .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 22px; }
    .card h3 { margin: 10px 0 6px; font-size: 17px; }
    .card p { margin: 0; color: var(--muted); font-size: 15px; }
    .ic { width: 36px; height: 36px; border-radius: 9px; display: grid; place-items: center; font-weight: 800; }
    .ic.g { background: #10221c; color: var(--r); } .ic.rd { background: #2a1414; color: var(--d); } .ic.b { background: #151d2a; color: #8fb3ff; }
    .steps { counter-reset: s; }
    .steps .card h3::before { counter-increment: s; content: counter(s); display: inline-grid; place-items: center;
           width: 26px; height: 26px; margin-right: 10px; border-radius: 50%; background: #1c2430; color: var(--r); font-size: 14px; }
    details { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px 20px; margin-bottom: 10px; }
    summary { cursor: pointer; font-weight: 700; list-style: none; }
    summary::-webkit-details-marker { display: none; }
    summary::after { content: "+"; float: right; color: var(--muted); }
    details[open] summary::after { content: "–"; }
    details p { color: var(--muted); margin: 10px 0 0; }
    .ss { margin-top: 12px; border: 1px solid #2a4f7a; background: #0e2240; border-radius: 8px; padding: 14px; font-size: 13px; color: #c8dcf5; }
    .ss b { display: block; font-size: 15px; margin-bottom: 4px; color: #fff; }
    .privacy ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
    .privacy li { color: var(--muted); padding-left: 22px; position: relative; }
    .privacy li::before { content: "✓"; position: absolute; left: 0; color: var(--r); font-weight: 700; }
    .privacy li b { color: var(--text); font-weight: 600; }
    footer { padding: 32px 0 48px; border-top: 1px solid #141b24; color: var(--muted); font-size: 14px;
             display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    footer .links { display: flex; flex-wrap: wrap; row-gap: 8px; }
    @media (max-width: 820px) {
      .wrap { padding: 0 16px; }
      .hero { grid-template-columns: 1fr; gap: 32px; padding: 16px 0 48px; }
      h1 { font-size: 34px; letter-spacing: -1px; }
      .lead { font-size: 16px; margin-bottom: 22px; }
      .cta { flex-direction: column; align-items: stretch; text-align: center; }
      .cta .tg, .cta .sub { order: 0; }
      .btn { justify-content: center; }
      .shot { padding: 12px; }
      .float { position: static; margin-top: 10px; box-shadow: none; text-align: center; }
      section { padding: 44px 0; }
      h2 { font-size: 24px; margin-bottom: 20px; }
      .grid3 { grid-template-columns: 1fr; gap: 10px; }
      .card { padding: 16px; }
      .top .links { display: none; }
      footer { flex-direction: column; }
    }
  </style>
  <script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias set_config reset opt_in_capturing opt_out_capturing has_opted_out_capturing get_distinct_id get_property".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init("phc_tXqHeZPMF6h8Ls2ETXPWwyt8392FjHPi3TkW8wiMrmcf", {api_host: "https://eu.i.posthog.com", persistence: "memory", person_profiles: "never"});
  </script>
</head>
<body>
<div class="wrap">
  <header class="top">
    <a class="brand" href="${brandHref}"><svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#141414"/><g fill="none" stroke-width="7"><circle cx="32" cy="32" r="17" stroke="#5DCAA5" stroke-dasharray="48 59" transform="rotate(-90 32 32)"/><circle cx="32" cy="32" r="17" stroke="#E24B4A" stroke-dasharray="48 59" transform="rotate(90 32 32)"/></g></svg>Outdraft</a>
    <div class="right">
      <nav class="links"><a href="/${lang}/guides/">${dict.navGuides}</a><a href="#features">${dict.navFeatures}</a><a href="#start">${dict.navStart}</a><a href="#faq">${dict.navFaq}</a></nav>
      <a class="tg-top" href="https://t.me/d2_outdraft" target="_blank" rel="noopener" aria-label="Telegram" title="Telegram"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M21.9 4.6 18.7 19.7c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.3Z"/></svg></a>
      <nav class="lang" role="group" aria-label="Language"><a href="/en/"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a><a href="/ru/"${lang === 'ru' ? ' aria-current="page"' : ''}>RU</a><a href="/uk/"${lang === 'uk' ? ' aria-current="page"' : ''}>UA</a></nav>
    </div>
  </header>

  <div class="hero">
    <div>
      <span class="tag">${dict.tag}</span>
      <h1>${dict.title}</h1>
      <p class="lead">${dict.lead}</p>
      <div class="cta">
        <a class="btn download-btn" data-platform="windows" href="${WINDOWS_DOWNLOAD}">${dict.downloadWindows}</a>
        <a class="btn download-btn linux" data-platform="linux" href="${LINUX_DOWNLOAD}">${dict.downloadLinux}</a>
        <span class="sub"><span>${dict.noInstall}</span></span>
        <a class="btn tg" href="https://t.me/d2_outdraft" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M21.9 4.6 18.7 19.7c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.3Z"/></svg><span>${dict.tgJoin}</span></a>
      </div>
    </div>
    <div class="shot" aria-hidden="true">
      <img class="ov-img" src="/media/overlay.png" alt="Outdraft overlay during a draft" width="488" height="468" loading="eager">
      <div class="float"><span>${dict.bestPick}</span> <b>Phantom Lancer</b></div>
    </div>
  </div>
</div>

<section id="demo"><div class="wrap">
  <h2>${dict.demoTitle}</h2>
  <video class="demo" src="/media/demo.mp4" poster="/media/demo.jpg" autoplay muted loop playsinline preload="metadata"></video>
</div></section>

<section id="features"><div class="wrap">
  <h2>${dict.featTitle}</h2>
  <p class="lead">${dict.featLead}</p>
  <div class="grid3">
    <div class="card"><div class="ic g">▲</div><h3>${dict.f1t}</h3><p>${dict.f1}</p></div>
    <div class="card"><div class="ic rd">✕</div><h3>${dict.f2t}</h3><p>${dict.f2}</p></div>
    <div class="card"><div class="ic b">≡</div><h3>${dict.f4t}</h3><p>${dict.f4}</p></div>
    <div class="card"><div class="ic g">⚖</div><h3>${dict.f5t}</h3><p>${dict.f5}</p></div>
    <div class="card"><div class="ic b">◆</div><h3>${dict.f3t}</h3><p>${dict.f3}</p></div>
    <div class="card"><div class="ic rd">★</div><h3>${dict.f6t}</h3><p>${dict.f6}</p></div>
  </div>
</div></section>

<section id="start"><div class="wrap">
  <h2>${dict.startTitle}</h2>
  <div class="grid3 steps">
    <div class="card"><h3>${dict.s1t}</h3><p>${dict.s1}</p></div>
    <div class="card"><h3>${dict.s2t}</h3><p>${dict.s2}</p></div>
    <div class="card"><h3>${dict.s3t}</h3><p>${dict.s3}</p></div>
  </div>
</div></section>

<section id="faq"><div class="wrap">
  <h2>FAQ</h2>
  <details open><summary>${dict.q1}</summary>
    <p>${dict.a1}</p>
    <div class="ss"><b>Windows protected your PC</b>Microsoft Defender SmartScreen prevented an unrecognized app from starting… <u>More info</u></div>
  </details>
  <details><summary>${dict.q2}</summary>
    <p>${dict.a2}</p></details>
  <details><summary>${dict.q3}</summary>
    <p>${dict.a3}</p></details>
  <details><summary>${dict.q5}</summary>
    <p>${dict.a5}</p></details>
</div></section>

<section id="privacy"><div class="wrap">
  <h2>${dict.privTitle}</h2>
  <div class="card privacy"><ul>
    <li>${dict.p1}</li>
    <li>${dict.p2}</li>
    <li>${dict.p3}</li>
  </ul></div>
</div></section>

<div class="wrap">
  <footer><span>${dict.foot}</span>
    <nav class="links"><a href="https://t.me/d2_outdraft" target="_blank" rel="noopener">Telegram</a><a href="https://tally.so/r/D4lK4E">${dict.feedback}</a><a href="#privacy">${dict.privTitle}</a><a href="https://github.com/vshtykhnov/outdraft-releases/releases">${dict.releases}</a></nav>
  </footer>
</div>

<script>
  document.querySelectorAll('.download-btn').forEach(a => a.addEventListener("click", () => posthog.capture("download_clicked", { platform: a.dataset.platform })));
</script>
</body>
</html>`;
}

function generateRootPage() {
  const meta = META.en;
  const dict = EN;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(meta.title)}</title>
  <link rel="canonical" href="${DOMAIN}/">
  <meta name="description" content="${escapeHtml(meta.description)}">
${generateHreflangTags('en')}
${generateFaviconTags()}
${generateOpenGraphTags('en').replace(`${DOMAIN}/en/`, `${DOMAIN}/`)}
${generateTwitterCardTags('en')}
${generateJsonLd('en')}
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('/fonts/inter-var.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    :root {
      --bg: #0a0d12; --panel: #10151c; --card: #141a22; --line: #222b37;
      --text: #e8edf4; --muted: #8b95a5; --r: #5DCAA5; --d: #E24B4A;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--bg); color: var(--text);
           font: 16px/1.6 Inter, system-ui, sans-serif; }
    a { color: inherit; }
    .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
    .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 18px; text-decoration: none; }
    .brand svg { width: 32px; height: 32px; }
    .right { display: flex; align-items: center; gap: 22px; }
    .links { display: flex; gap: 22px; font-size: 14px; color: var(--muted); }
    .links a { text-decoration: none; }
    .links a:hover { color: var(--text); }
    .lang { display: flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
    .lang a { background: none; border: 0; color: var(--muted); font: 600 13px Inter, sans-serif;
              padding: 6px 10px; text-decoration: none; }
    .lang a:hover { color: var(--text); }
    .lang a[aria-current="page"] { background: #1c2430; color: var(--text); }
    .hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; padding: 56px 0 72px; }
    .tag { display: inline-block; font-size: 13px; color: var(--r); border: 1px solid #2c4a40;
           background: #10221c; padding: 4px 10px; border-radius: 999px; margin-bottom: 18px; }
    h1 { font-size: 52px; line-height: 1.05; margin: 0 0 18px; letter-spacing: -1.5px; font-weight: 800; }
    h1 .r { color: var(--r); } h1 .d { color: var(--d); }
    .lead { color: var(--muted); font-size: 18px; margin: 0 0 28px; max-width: 30em; }
    .cta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 9px;
           background: var(--r); color: #05140e; font-weight: 700; text-decoration: none; }
    .btn:hover { filter: brightness(1.08); }
    .btn.linux { padding: 10px 14px; background: transparent; border: 1px solid var(--line); color: var(--muted); font-weight: 600; }
    .btn.linux:hover { border-color: var(--r); color: var(--text); filter: none; }
    .sub { font-size: 13px; color: var(--muted); }
    .btn.tg { background: none; color: var(--text); border: 1px solid var(--line); font-weight: 600; }
    .btn.tg:hover { border-color: #2aabee; color: #2aabee; filter: none; }
    .cta .tg { order: 1; }
    .cta .sub { order: 2; flex-basis: 100%; }
    .tg-top { display: inline-flex; align-items: center; color: var(--muted); }
    .tg-top:hover { color: #2aabee; }
    .shot { position: relative; border-radius: 16px; padding: 18px; background:
            radial-gradient(120% 90% at 0% 0%, #17322a 0%, transparent 55%),
            radial-gradient(120% 90% at 100% 100%, #3a1a1a 0%, transparent 55%), var(--panel);
            border: 1px solid var(--line); }
    .ov-img { display: block; width: 100%; height: auto; border-radius: 10px;
             -webkit-mask-image: linear-gradient(#000 82%, transparent); mask-image: linear-gradient(#000 82%, transparent); }
    .float { position: absolute; right: -14px; bottom: -18px; background: var(--card); border: 1px solid var(--line);
             border-radius: 10px; padding: 10px 14px; font-size: 13px; box-shadow: 0 10px 30px rgba(0,0,0,.4); }
    .float b { color: var(--r); }
    .demo { display: block; width: 100%; aspect-ratio: 16 / 9; border-radius: 12px; border: 1px solid var(--line); background: #000; }
    section { padding: 64px 0; border-top: 1px solid #141b24; scroll-margin-top: 8px; }
    h2 { font-size: 30px; margin: 0 0 24px; letter-spacing: -.5px; }
    .muted { color: var(--muted); margin: 0 0 32px; }
    .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 22px; }
    .card h3 { margin: 10px 0 6px; font-size: 17px; }
    .card p { margin: 0; color: var(--muted); font-size: 15px; }
    .ic { width: 36px; height: 36px; border-radius: 9px; display: grid; place-items: center; font-weight: 800; }
    .ic.g { background: #10221c; color: var(--r); } .ic.rd { background: #2a1414; color: var(--d); } .ic.b { background: #151d2a; color: #8fb3ff; }
    .steps { counter-reset: s; }
    .steps .card h3::before { counter-increment: s; content: counter(s); display: inline-grid; place-items: center;
           width: 26px; height: 26px; margin-right: 10px; border-radius: 50%; background: #1c2430; color: var(--r); font-size: 14px; }
    details { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px 20px; margin-bottom: 10px; }
    summary { cursor: pointer; font-weight: 700; list-style: none; }
    summary::-webkit-details-marker { display: none; }
    summary::after { content: "+"; float: right; color: var(--muted); }
    details[open] summary::after { content: "–"; }
    details p { color: var(--muted); margin: 10px 0 0; }
    .ss { margin-top: 12px; border: 1px solid #2a4f7a; background: #0e2240; border-radius: 8px; padding: 14px; font-size: 13px; color: #c8dcf5; }
    .ss b { display: block; font-size: 15px; margin-bottom: 4px; color: #fff; }
    .privacy ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
    .privacy li { color: var(--muted); padding-left: 22px; position: relative; }
    .privacy li::before { content: "✓"; position: absolute; left: 0; color: var(--r); font-weight: 700; }
    .privacy li b { color: var(--text); font-weight: 600; }
    footer { padding: 32px 0 48px; border-top: 1px solid #141b24; color: var(--muted); font-size: 14px;
             display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    footer .links { display: flex; flex-wrap: wrap; row-gap: 8px; }
    @media (max-width: 820px) {
      .wrap { padding: 0 16px; }
      .hero { grid-template-columns: 1fr; gap: 32px; padding: 16px 0 48px; }
      h1 { font-size: 34px; letter-spacing: -1px; }
      .lead { font-size: 16px; margin-bottom: 22px; }
      .cta { flex-direction: column; align-items: stretch; text-align: center; }
      .cta .tg, .cta .sub { order: 0; }
      .btn { justify-content: center; }
      .shot { padding: 12px; }
      .float { position: static; margin-top: 10px; box-shadow: none; text-align: center; }
      section { padding: 44px 0; }
      h2 { font-size: 24px; margin-bottom: 20px; }
      .grid3 { grid-template-columns: 1fr; gap: 10px; }
      .card { padding: 16px; }
      .top .links { display: none; }
      footer { flex-direction: column; }
    }
  </style>
  <script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias set_config reset opt_in_capturing opt_out_capturing has_opted_out_capturing get_distinct_id get_property".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init("phc_tXqHeZPMF6h8Ls2ETXPWwyt8392FjHPi3TkW8wiMrmcf", {api_host: "https://eu.i.posthog.com", persistence: "memory", person_profiles: "never"});
  </script>
</head>
<body>
<div class="wrap">
  <header class="top">
    <a class="brand" href="/"><svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#141414"/><g fill="none" stroke-width="7"><circle cx="32" cy="32" r="17" stroke="#5DCAA5" stroke-dasharray="48 59" transform="rotate(-90 32 32)"/><circle cx="32" cy="32" r="17" stroke="#E24B4A" stroke-dasharray="48 59" transform="rotate(90 32 32)"/></g></svg>Outdraft</a>
    <div class="right">
      <nav class="links"><a href="/en/guides/">${dict.navGuides}</a><a href="#features">${dict.navFeatures}</a><a href="#start">${dict.navStart}</a><a href="#faq">${dict.navFaq}</a></nav>
      <a class="tg-top" href="https://t.me/d2_outdraft" target="_blank" rel="noopener" aria-label="Telegram" title="Telegram"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M21.9 4.6 18.7 19.7c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.3Z"/></svg></a>
      <nav class="lang" role="group" aria-label="Language"><a href="/en/">EN</a><a href="/ru/">RU</a><a href="/uk/">UA</a></nav>
    </div>
  </header>

  <div class="hero">
    <div>
      <span class="tag">${dict.tag}</span>
      <h1>${dict.title}</h1>
      <p class="lead">${dict.lead}</p>
      <div class="cta">
        <a class="btn download-btn" data-platform="windows" href="${WINDOWS_DOWNLOAD}">${dict.downloadWindows}</a>
        <a class="btn download-btn linux" data-platform="linux" href="${LINUX_DOWNLOAD}">${dict.downloadLinux}</a>
        <span class="sub"><span>${dict.noInstall}</span></span>
        <a class="btn tg" href="https://t.me/d2_outdraft" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M21.9 4.6 18.7 19.7c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.3Z"/></svg><span>${dict.tgJoin}</span></a>
      </div>
    </div>
    <div class="shot" aria-hidden="true">
      <img class="ov-img" src="/media/overlay.png" alt="Outdraft overlay during a draft" width="488" height="468" loading="eager">
      <div class="float"><span>${dict.bestPick}</span> <b>Phantom Lancer</b></div>
    </div>
  </div>
</div>

<section id="demo"><div class="wrap">
  <h2>${dict.demoTitle}</h2>
  <video class="demo" src="/media/demo.mp4" poster="/media/demo.jpg" autoplay muted loop playsinline preload="metadata"></video>
</div></section>

<section id="features"><div class="wrap">
  <h2>${dict.featTitle}</h2>
  <p class="lead">${dict.featLead}</p>
  <div class="grid3">
    <div class="card"><div class="ic g">▲</div><h3>${dict.f1t}</h3><p>${dict.f1}</p></div>
    <div class="card"><div class="ic rd">✕</div><h3>${dict.f2t}</h3><p>${dict.f2}</p></div>
    <div class="card"><div class="ic b">≡</div><h3>${dict.f4t}</h3><p>${dict.f4}</p></div>
    <div class="card"><div class="ic g">⚖</div><h3>${dict.f5t}</h3><p>${dict.f5}</p></div>
    <div class="card"><div class="ic b">◆</div><h3>${dict.f3t}</h3><p>${dict.f3}</p></div>
    <div class="card"><div class="ic rd">★</div><h3>${dict.f6t}</h3><p>${dict.f6}</p></div>
  </div>
</div></section>

<section id="start"><div class="wrap">
  <h2>${dict.startTitle}</h2>
  <div class="grid3 steps">
    <div class="card"><h3>${dict.s1t}</h3><p>${dict.s1}</p></div>
    <div class="card"><h3>${dict.s2t}</h3><p>${dict.s2}</p></div>
    <div class="card"><h3>${dict.s3t}</h3><p>${dict.s3}</p></div>
  </div>
</div></section>

<section id="faq"><div class="wrap">
  <h2>FAQ</h2>
  <details open><summary>${dict.q1}</summary>
    <p>${dict.a1}</p>
    <div class="ss"><b>Windows protected your PC</b>Microsoft Defender SmartScreen prevented an unrecognized app from starting… <u>More info</u></div>
  </details>
  <details><summary>${dict.q2}</summary>
    <p>${dict.a2}</p></details>
  <details><summary>${dict.q3}</summary>
    <p>${dict.a3}</p></details>
  <details><summary>${dict.q5}</summary>
    <p>${dict.a5}</p></details>
</div></section>

<section id="privacy"><div class="wrap">
  <h2>${dict.privTitle}</h2>
  <div class="card privacy"><ul>
    <li>${dict.p1}</li>
    <li>${dict.p2}</li>
    <li>${dict.p3}</li>
  </ul></div>
</div></section>

<div class="wrap">
  <footer><span>${dict.foot}</span>
    <nav class="links"><a href="https://t.me/d2_outdraft" target="_blank" rel="noopener">Telegram</a><a href="https://tally.so/r/D4lK4E">${dict.feedback}</a><a href="#privacy">${dict.privTitle}</a><a href="https://github.com/vshtykhnov/outdraft-releases/releases">${dict.releases}</a></nav>
  </footer>
</div>

<script>
  document.querySelectorAll('.download-btn').forEach(a => a.addEventListener("click", () => posthog.capture("download_clicked", { platform: a.dataset.platform })));
  
  // Handle legacy ?lang= URLs - redirect to proper language path
  (function() {
    const params = new URLSearchParams(location.search);
    const lang = params.get('lang');
    if (lang && ['en', 'ru', 'uk'].includes(lang)) {
      location.replace('/' + lang + '/');
    }
  })();
</script>
</body>
</html>`;
}

function generateSitemap() {
  const lastMod = getLastMod();
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${lastMod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/en/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${DOMAIN}/ru/"/>
    <xhtml:link rel="alternate" hreflang="uk" href="${DOMAIN}/uk/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/"/>
  </url>`;
  
  for (const lang of LANGS) {
    sitemap += `
  <url>
    <loc>${DOMAIN}/${lang}/</loc>
    <lastmod>${lastMod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/en/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${DOMAIN}/ru/"/>
    <xhtml:link rel="alternate" hreflang="uk" href="${DOMAIN}/uk/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/"/>
  </url>`;
  }
  
  sitemap += `
</urlset>`;
  return sitemap;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`;
}

function main() {
  const outDir = process.argv[2] || path.join(__dirname, '..');
  
  console.log('Generating Outdraft landing pages...');
  console.log(`Output directory: ${outDir}`);
  
  // Generate language-specific pages
  for (const lang of LANGS) {
    const langDir = path.join(outDir, lang);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }
    const html = generateLanguagePage(lang);
    fs.writeFileSync(path.join(langDir, 'index.html'), html);
    console.log(`  Generated /${lang}/index.html`);
  }
  
  // Generate root page
  const rootHtml = generateRootPage();
  fs.writeFileSync(path.join(outDir, 'index.html'), rootHtml);
  console.log('  Generated /index.html');
  
  // Generate sitemap
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  console.log('  Generated /sitemap.xml');
  
  // Generate robots.txt
  const robots = generateRobotsTxt();
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robots);
  console.log('  Generated /robots.txt');
  
  console.log('Done!');
}

main();
