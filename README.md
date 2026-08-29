# PNG ONE Co., Ltd — Website

Bilingual (EN/VI) marketing website for PNG ONE Co., Ltd, a Vietnamese agricultural export company. Static HTML + Tailwind CSS, no framework or backend required to host.

## Pages

- `index.html` — Home
- `about.html` — About Us
- `products.html` — Products (rice, coffee, cashew, pepper, dragon fruit, mango, tea, spices)
- `quality.html` — Quality & Certifications
- `export-process.html` — Export Process
- `contact.html` — Contact / Get a Quote

## Development

```bash
npm install
npm run watch:css   # rebuild assets/css/styles.css on change while editing
npm run build:css   # one-off production build (minified)
npm run serve       # preview at http://localhost:5500
```

Language switching, mobile menu, scroll animations, product filter, FAQ accordion, and the contact form are handled by `assets/js/i18n.js` and `assets/js/main.js` — no build step required for them.

## Before going live — please review

This is a complete, working draft. A few things use placeholder content and need your input before publishing:

- **Contact details** — real office address, phone number, email, and business registration number (currently `[bracketed placeholders]` in the footer and Contact page).
- **Certifications** (`quality.html`) — HACCP / ISO 22000 / VietGAP / GlobalG.A.P. badges are shown as the standards the site claims to follow; confirm which are actually held/certified and attach real certificate documents if you want them referenced specifically.
- **Testimonials** (`index.html`) — the three buyer quotes are sample placeholders for layout purposes, clearly marked in an HTML comment. Replace with real, verified customer quotes (or remove the section).
- **Contact form** — currently front-end only (shows a success message but doesn't send anywhere). See the `TODO(client)` comment in `assets/js/main.js` — wire the form to an email service, CRM, or serverless endpoint before launch.
- **Social links** — LinkedIn/Facebook/WhatsApp icons in the footer link to `#`; add real profile URLs.
- **Stats** (export markets, years, etc.) — currently illustrative; update with your real figures.

## Deployment

Everything is static — upload the folder as-is to any static host (Netlify, Vercel, cPanel, S3, etc.). Only `index.html`, the other `.html` files, and `assets/` are needed; `node_modules/`, `src/`, and config files are build-time only.

This repo is configured to deploy to **Hostinger** automatically via GitHub Actions on every push to `main` — see [DEPLOY.md](DEPLOY.md) for the one-time setup (adding your Hostinger FTP credentials as GitHub secrets).
