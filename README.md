# MotoFixPoint Website

Official website for **MotoFixPoint** — Electronic City, Bengaluru's trusted car & bike repair and servicing workshop.

🌐 **Live Site:** [motofixpoint.com](https://www.motofixpoint.com)

---

## 📁 Project Structure

```
motofixpoint/
├── index.html          # Main homepage
├── style.css           # All styles (dark red brand theme)
├── script.js           # Interactions, animations, service filter
├── assets/
│   ├── logo.png        # Brand logo (MOTO FIX POINT)
│   ├── hero.jpg        # Hero section image
│   ├── workshop.jpg    # Workshop photo (Why Us section)
│   ├── og-image.jpg    # Open Graph preview image
│   └── gallery/        # Workshop gallery photos
│       ├── g1.jpg
│       ├── g2.jpg
│       └── ...
└── README.md
```

---

## 🛠️ Adding Gallery Photos

Gallery photos are loaded from `assets/gallery/`. To update:
1. Add your photos named `g1.jpg`, `g2.jpg` ... `g6.jpg` to `assets/gallery/`
2. Commit and push → Vercel auto-deploys ✅

> 📸 Tip: Export photos from Google Drive/Google Form responses, rename them, and drop them in this folder.

---

## 🚀 Deployment (Vercel)

This is a **static HTML site** — no build step needed.

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Framework: **Other** (no framework)
4. Root directory: `/`
5. Deploy ✅

Add your custom domain `www.motofixpoint.com` in Vercel → Domains.

---

## 🔑 SEO

The site is optimised for:
- Car & bike repair near me
- Electronic City car bike service
- Doorstep car/bike service Bengaluru
- And 30+ targeted local keywords

Structured data (JSON-LD `AutoRepair` schema), OpenGraph, Twitter Card, and geo meta tags are all included in `index.html`.

---

## ✏️ To Update Contact Info

In `index.html`, search for `+91 99999 99999` and replace with your real phone number.
Search for `wa.me/919999999999` and replace with your WhatsApp number.

---

© 2026 MotoFixPoint
