#!/usr/bin/env node
/**
 * Outdraft tour generator: /<lang>/tour/index.html — the narrated video and the screens one by one.
 * Copy lives in build/tour-content.js; the videos and their lengths come from build/make-tour-video.py.
 * Usage: node build/generate-tour.js [outDir]
 */
const fs = require('fs');
const path = require('path');
const { DOMAIN, LANGS, UI, esc, url, head, header, footer } = require('./generate-articles');
const { SCREENS, CONTENT } = require('./tour-content');

const SLUG = 'tour';
const VIDEOS = JSON.parse(fs.readFileSync(path.join(__dirname, 'tour-videos.json'), 'utf8'));
const W = 380, H = 350; // the app window; the screens are twice that in pixels

const CSS = `  <style>
    .tour-hero { text-align: center; padding: 56px 0 52px; border-bottom: 1px solid #141b24;
                 background: radial-gradient(70% 120% at 50% 0%, #10251f 0%, transparent 68%); }
    .tour-hero h1 { margin: 0 auto 12px; max-width: 760px; } .tour-hero .lead { margin: 0 auto; max-width: 620px; }
    .tour-sec { padding: 56px 0; border-bottom: 1px solid #141b24; }
    .tour-head { max-width: 760px; margin: 0 auto 22px; text-align: center; }
    .tour-head h2 { margin: 0; font-size: 30px; letter-spacing: -.5px; }
    .eyebrow { margin: 0 0 6px; color: var(--r); font-size: 12px; font-weight: 800; letter-spacing: .1em; }
    .video-card { max-width: 600px; margin: 0 auto; padding: 12px; border: 1px solid var(--line); border-radius: 18px;
                  background: linear-gradient(145deg, #151d27, #10151c); box-shadow: 0 16px 46px rgba(0,0,0,.22); }
    .video { display: block; width: 100%; aspect-ratio: ${W} / ${H}; border-radius: 10px; background: #000; }
    .tour-note { max-width: 600px; margin: 13px auto 0; color: var(--muted); font-size: 14px; text-align: center; }
    .tour-gallery { max-width: 640px; margin: 0 auto; }
    .gallery { display: grid; grid-template-columns: 48px minmax(0, 1fr) 48px; align-items: center; gap: 16px; }
    .frame { overflow: hidden; border: 1px solid var(--line); background: var(--panel); border-radius: 16px; }
    .frame img { display: block; width: 100%; height: auto; }
    .control { width: 48px; height: 48px; border: 1px solid var(--line); border-radius: 50%; background: var(--card); color: var(--text);
               font: 28px/1 Inter, sans-serif; cursor: pointer; }
    .control:hover { border-color: var(--r); color: var(--r); } .control:focus-visible { outline: 2px solid var(--r); outline-offset: 3px; }
    .caption { display: flex; justify-content: space-between; gap: 20px; align-items: baseline; margin-top: 18px; min-height: 4.5em; }
    .caption h3 { margin: 0; font-size: 20px; } .caption p { margin: 4px 0 0; color: var(--muted); }
    .count { color: var(--r); white-space: nowrap; font-size: 14px; font-weight: 700; }
    .dots { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
    .dot { width: 8px; height: 8px; padding: 0; border: 0; border-radius: 50%; background: #3a4554; cursor: pointer; }
    .dot[aria-current="true"] { background: var(--r); transform: scale(1.2); }
    .thumbs { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-top: 36px; }
    .thumb { overflow: hidden; border: 1px solid var(--line); border-radius: 8px; padding: 0; background: #000; cursor: pointer; }
    .thumb img { width: 100%; height: auto; display: block; opacity: .6; }
    .thumb:hover img, .thumb[aria-current="true"] img { opacity: 1; } .thumb[aria-current="true"] { border-color: var(--r); }
    @media (max-width: 720px) {
      .tour-hero { padding: 36px 0; } .tour-sec { padding: 40px 0; }
      .gallery { grid-template-columns: 38px minmax(0, 1fr) 38px; gap: 8px; } .control { width: 38px; height: 38px; font-size: 23px; }
      .thumbs { grid-template-columns: repeat(4, 1fr); gap: 6px; } .caption { display: block; } .count { display: block; margin-top: 10px; }
    }
  </style>`;

const img = (screen, alt, extra = '') =>
  `<img src="/media/tour/${screen}.png" alt="${esc(alt)}" width="${W}" height="${H}"${extra}>`;

function buildPage(lang) {
  const c = CONTENT[lang];
  const u = UI[lang];
  const video = VIDEOS[lang];
  const minutes = Math.max(1, Math.round(video.seconds / 60));
  const screens = SCREENS.map((screen, i) => ({ screen, ...c.screens[i] }));
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'VideoObject', name: c.metaTitle, description: c.description,
      inLanguage: lang, thumbnailUrl: `${DOMAIN}/media/tour/${SCREENS[2]}.png`,
      contentUrl: `${DOMAIN}/media/tour/${video.file}`, uploadDate: video.date,
      duration: `PT${Math.floor(video.seconds / 60)}M${Math.round(video.seconds % 60)}S` },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: u.home, item: url(lang) },
      { '@type': 'ListItem', position: 2, name: u.tour, item: url(lang, SLUG) } ] },
  ];
  const first = screens[0];

  return `${head(lang, { title: c.metaTitle, description: c.description, slug: SLUG, ogType: 'website', jsonld })}
${CSS}
${header(lang, SLUG, 'tour')}

<main>
  <section class="tour-hero"><div class="wrap">
    <span class="tag">${c.tag}</span>
    <h1>${esc(c.h1)}</h1>
    <p class="lead">${esc(c.lead)}</p>
  </div></section>

  <section class="tour-sec"><div class="wrap">
    <div class="tour-head"><p class="eyebrow">${c.videoEyebrow.replace('{min}', minutes)}</p><h2>${esc(c.videoTitle)}</h2></div>
    <div class="video-card"><video class="video" controls preload="none" playsinline poster="/media/tour/${SCREENS[2]}.png">
      <source src="/media/tour/${video.file}?v=${video.version}" type="video/mp4">
      ${esc(c.noVideo)}
    </video></div>
    <p class="tour-note">${esc(c.videoNote)}</p>
  </div></section>

  <section class="tour-sec"><div class="wrap"><div class="tour-gallery">
    <div class="tour-head"><p class="eyebrow">${c.galleryEyebrow.replace('{n}', screens.length)}</p><h2>${esc(c.galleryTitle)}</h2></div>
    <div class="gallery">
      <button class="control" id="prev" type="button" aria-label="${esc(c.prev)}">‹</button>
      <div class="frame">${img(first.screen, first.title, ' id="slide"')}</div>
      <button class="control" id="next" type="button" aria-label="${esc(c.next)}">›</button>
    </div>
    <div class="caption"><div><h3 id="slide-title">${esc(first.title)}</h3><p id="slide-text">${esc(first.text)}</p></div><span class="count" id="count">1 / ${screens.length}</span></div>
    <div class="dots" id="dots" aria-label="${esc(c.choose)}"></div>
    <div class="thumbs" id="thumbs" aria-label="${esc(c.all)}"></div>
  </div></div></section>
</main>

<script>
  (() => {
    const slides = ${JSON.stringify(screens.map(({ screen, title, text }) => [screen, title, text]))};
    let current = 0;
    const $ = id => document.getElementById(id);
    const slide = $('slide'), dots = $('dots'), thumbs = $('thumbs');
    function render(index) {
      current = (index + slides.length) % slides.length;
      const [screen, title, text] = slides[current];
      slide.src = '/media/tour/' + screen + '.png'; slide.alt = title;
      $('slide-title').textContent = title; $('slide-text').textContent = text;
      $('count').textContent = (current + 1) + ' / ' + slides.length;
      [...dots.children].forEach((d, i) => d.setAttribute('aria-current', String(i === current)));
      [...thumbs.children].forEach((t, i) => t.setAttribute('aria-current', String(i === current)));
    }
    slides.forEach(([screen, title], i) => {
      const dot = document.createElement('button'); dot.className = 'dot'; dot.type = 'button';
      dot.setAttribute('aria-label', title); dot.addEventListener('click', () => render(i)); dots.append(dot);
      const thumb = document.createElement('button'); thumb.className = 'thumb'; thumb.type = 'button';
      thumb.setAttribute('aria-label', title); thumb.innerHTML = '<img src="/media/tour/' + screen + '.png" alt="" loading="lazy">';
      thumb.addEventListener('click', () => render(i)); thumbs.append(thumb);
    });
    $('prev').addEventListener('click', () => render(current - 1));
    $('next').addEventListener('click', () => render(current + 1));
    document.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') render(current - 1); if (e.key === 'ArrowRight') render(current + 1); });
    document.querySelector('.video')?.addEventListener('play', () => window.posthog?.capture('tour_video_played', { lang: '${lang}' }), { once: true });
    render(0);
  })();
</script>
${footer(lang)}`;
}

function updateSitemap(outDir) {
  const p = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(p)) return;
  let xml = fs.readFileSync(p, 'utf8').replace(/\s*<!-- tour -->[\s\S]*<!-- \/tour -->/, '');
  let add = '\n\n  <!-- tour -->';
  for (const lang of LANGS) {
    add += `\n  <url>\n    <loc>${url(lang, SLUG)}</loc>\n    <lastmod>${VIDEOS[lang].date}</lastmod>\n` +
      LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, SLUG)}"/>\n`).join('') +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', SLUG)}"/>\n  </url>`;
  }
  add += '\n  <!-- /tour -->';
  fs.writeFileSync(p, xml.replace('\n</urlset>', add + '\n</urlset>'));
}

function main() {
  const outDir = process.argv[2] || path.join(__dirname, '..');
  for (const lang of LANGS) {
    const dir = path.join(outDir, lang, SLUG);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildPage(lang));
    console.log(`  Generated /${lang}/${SLUG}/index.html`);
  }
  updateSitemap(outDir);
}

main();
