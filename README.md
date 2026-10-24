# Outdraft for Windows and Linux

Website: [outdraft.org](https://outdraft.org)

Download the latest [Windows ZIP](https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-windows-x86_64.zip) or [Linux archive](https://github.com/vshtykhnov/outdraft-releases/releases/latest/download/Outdraft-linux-x86_64.tar.gz) from GitHub Releases.

On Windows, extract the ZIP and run `Outdraft.exe` from the extracted folder. On Linux, extract the `.tar.gz` and run `Outdraft`. Dota 2 must use borderless window or windowed mode. Restart Dota 2 once after the first run so it loads the overlay integration.

To update, close Outdraft and replace the old executable with the latest download. The app checks for new releases and opens the download page. An internet connection is required to reach the API.

This repository contains releases only. The application source and API are kept in a separate private repository. GitHub's automatically generated source archives for each release contain only the files in this repository.

---

## Website Development

The landing page is a static multilingual site with per-language URLs (`/en/`, `/ru/`, `/uk/`) for proper SEO indexing.

### Structure

```
/                   # Root page (English, x-default)
/en/                # English
/ru/                # Russian  
/uk/                # Ukrainian
/media/             # Images and video
/fonts/             # Self-hosted Inter font
/build/             # Generator scripts (not deployed)
```

### Building the Site

The site is generated from templates and translation dictionaries. To rebuild:

```bash
# Install dependencies (only needed once)
# Requires: Node.js, ImageMagick, librsvg2-bin, ffmpeg, woff2

# Generate HTML pages, sitemap, and robots.txt
node build/generate.js .

# Generate favicon and OG image assets (run once, or when icons change)
./build/generate-assets.sh .

# Compress demo video (run once, or when video changes)
# See build/generate-assets.sh for ffmpeg commands
```

### Translations

Edit `build/translations.js` to update text content. The file contains:
- `EN`, `RU`, `UK` - translation dictionaries
- `META` - page titles and meta descriptions per language

After editing translations, run `node build/generate.js .` to regenerate pages.

### GitHub Pages Deployment

The site is deployed to GitHub Pages directly from the `main` branch. Since all generated files are committed, no build step is needed during deployment.

To deploy changes:
1. Run the generator scripts locally
2. Commit all generated files
3. Push to `main`

GitHub Pages will automatically serve the updated site.

### Adding Google Search Console Verification

To verify the site with Google Search Console:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `https://outdraft.org`
3. Choose "HTML file" verification method
4. Download the verification file (e.g., `googleXXXXXXXXXXXX.html`)
5. Add it to the repository root
6. Commit and push
7. Complete verification in Search Console

The verification file should contain only the Google-provided verification string.

### SEO Features

- **Per-language URLs**: Each language has its own URL path with static HTML content
- **hreflang tags**: Proper language alternates including x-default
- **Open Graph / Twitter Cards**: Social media preview images and metadata
- **JSON-LD**: SoftwareApplication and VideoObject structured data
- **Sitemap**: XML sitemap with hreflang annotations
- **Favicons**: ICO, PNG (16x16, 32x32), and Apple Touch Icon
- **Self-hosted font**: Inter variable font with font-display: swap

### Legacy URL Support

Old `?lang=` URLs (e.g., `/?lang=ru`) are automatically redirected to the proper language path (`/ru/`) via client-side JavaScript.
