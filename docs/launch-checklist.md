# Production Launch Checklist & Rollback Procedure

**Product:** PulseGuard  
**Environment:** Vercel Edge & Serverless  
**Target URL:** `https://pulseguard.vercel.app` (or custom domain)  

---

## 1. Pre-Deployment Verification
- [x] All unit tests passing (`npm test` -> 4/4 passed).
- [x] Production build passes without errors (`npm run build` -> 16 routes compiled).
- [x] Zero sensitive secrets in codebase (verified `.gitignore` covers `.env`, `.pem`, tokens).
- [x] Dynamic route parameters handle asynchronous resolution cleanly.
- [x] Fallback storage active with seed monitors for instant demo experience.
- [x] SEO files configured (`robots.txt` and `sitemap.xml`).
- [x] Legal pages active (`/privacy` and `/terms`).

---

## 2. Deployment Sequence
1. Push all source code and documentation to the new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of PulseGuard observability suite"
   gh repo create DulajMendis/pulseguard --public --source=. --push
   ```
2. Deploy production build to Vercel:
   ```bash
   npx vercel --prod --yes
   ```
3. Verify live production deployment:
   - HTTPS is enabled automatically by Vercel Let's Encrypt.
   - Test live ping ingestion: `curl -fsS https://<production-url>/api/ping/cron-billing-sync`.
   - Verify dashboard loads and displays updated status.

---

## 3. Rollback Procedure
If a critical production error occurs:
1. Identify failing deployment via Vercel CLI:
   ```bash
   npx vercel list
   ```
2. Promote previous working deployment instantly:
   ```bash
   npx vercel alias set <previous-deployment-url> pulseguard.vercel.app
   ```
3. Or via Git revert:
   ```bash
   git revert HEAD
   git push origin main
   npx vercel --prod
   ```
