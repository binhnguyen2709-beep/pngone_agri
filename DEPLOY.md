# Deploy to Hostinger (Shared/Web Hosting)

This site is static HTML/CSS/JS — Node.js is only used to build the Tailwind CSS file, not to run anything on the server. Hostinger's shared hosting just needs the finished files uploaded to `public_html/`.

## Option A — Automatic deploy on every push (recommended)

A GitHub Actions workflow is already set up at `.github/workflows/deploy.yml`. It builds the CSS and uploads the site to Hostinger via FTP every time you push to `main`. You just need to give it your Hostinger FTP credentials, once, as GitHub secrets (GitHub never shows these back to anyone, including me).

1. **Get FTP credentials from Hostinger:**
   hPanel → **Files → FTP Accounts**. Note down:
   - FTP host (e.g. `ftp.yourdomain.com` or an IP like `123.45.67.89`)
   - FTP username
   - FTP password (or create a new FTP account for this)
   - The target folder — usually `/public_html/` for your main domain, or `/domains/yourdomain.com/public_html/` if it's an addon domain.

2. **Add them as GitHub repo secrets:**
   On GitHub.com, open your repo → **Settings → Secrets and variables → Actions → New repository secret**, and add each of these:
   - `FTP_SERVER` — the FTP host
   - `FTP_USERNAME` — the FTP username
   - `FTP_PASSWORD` — the FTP password
   - `FTP_SERVER_DIR` — the target folder, e.g. `/public_html/`

3. **Push to `main`.** The workflow runs automatically (check the **Actions** tab on GitHub to watch it), builds the CSS, and uploads everything except dev-only files (`node_modules`, `src/`, config files, etc.) to Hostinger.

You can also trigger a deploy manually from the **Actions** tab (**Run workflow**) without pushing new code.

## Option B — Manual upload (no CI)

1. Run `npm run build:css` locally to produce `assets/css/styles.css`.
2. In Hostinger hPanel, open **File Manager** (or connect via FTP with any client, e.g. FileZilla) and go to `public_html/`.
3. Upload: `index.html`, `about.html`, `products.html`, `quality.html`, `export-process.html`, `contact.html`, and the whole `assets/` folder.
4. Do **not** upload `node_modules/`, `src/`, `package.json`, `tailwind.config.js`, or `.github/` — they're not needed to serve the site.

## Custom domain / SSL

If `yourdomain.com` isn't already pointed at this Hostinger hosting account, do that first in hPanel (**Domains**), then enable the free SSL certificate under **Security → SSL** so the site serves over `https://`.
