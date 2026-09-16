import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

test('Project Verification: All projects must have verified real-world substance', () => {
  const fileContent = readFileSync(resolve('src/data/projects.ts'), 'utf-8');
  assert.ok(fileContent.includes('Travex'), 'Travex project must be present');
  assert.ok(fileContent.includes('PulseGuard'), 'PulseGuard project must be present');
  assert.ok(fileContent.includes('Sri Lanka Railway Network'), 'Railway GIS project must be present');
  assert.ok(fileContent.includes('Experience Udawalawe'), 'Experience Udawalawe project must be present');
  assert.ok(fileContent.includes('58'), 'Travex 58 DB models verified');
  assert.ok(fileContent.includes('237'), 'Travex 237 API endpoints verified');
  assert.ok(fileContent.includes('422'), 'Railway 422 stops verified');
  assert.ok(fileContent.includes('1,444 km'), 'Railway 1,444 km verified');
});

test('UX Principles Verification: Doherty threshold and context menu rules present', () => {
  const fileContent = readFileSync(resolve('src/data/principles.ts'), 'utf-8');
  assert.ok(fileContent.includes('Right-click is a system'), 'Right-click rule present');
  assert.ok(fileContent.includes('The Doherty Motion Budget'), 'Doherty rule present');
  assert.ok(fileContent.includes('250ms'), 'Entrance timing verified');
  assert.ok(fileContent.includes('150ms'), 'Exit timing verified');
  assert.ok(fileContent.includes('<100ms'), 'Feedback timing verified');
});

test('Experience Verification: Primary role at Connaissance De Ceylan (CDC)', () => {
  const fileContent = readFileSync(resolve('src/data/experience.ts'), 'utf-8');
  assert.ok(fileContent.includes('Connaissance De Ceylan'), 'CDC role must be present');
  assert.ok(fileContent.includes('Experience Udawalawe'), 'Advisory systems role verified');
});

test('SEO & Structured Data Verification: Canonical and Schema.org integrity', () => {
  const layoutContent = readFileSync(resolve('src/app/layout.tsx'), 'utf-8');
  assert.ok(layoutContent.includes('https://dulajmendis.com'), 'Canonical domain set');
  assert.ok(layoutContent.includes('schema.org'), 'JSON-LD schema included');
  assert.ok(layoutContent.includes('Person'), 'Schema Person type included');
  assert.ok(layoutContent.includes('Connaissance De Ceylan'), 'Organization affiliation included');
});

test('Security Headers Verification: next.config.js enforces strict policies', () => {
  const nextConfig = readFileSync(resolve('next.config.js'), 'utf-8');
  assert.ok(nextConfig.includes('Strict-Transport-Security'), 'HSTS configured');
  assert.ok(nextConfig.includes('X-Frame-Options'), 'Clickjacking defense configured');
  assert.ok(nextConfig.includes('X-Content-Type-Options'), 'MIME sniffing defense configured');
  assert.ok(nextConfig.includes('Referrer-Policy'), 'Referrer policy configured');
});

test('Static Asset Verification: Favicon, OG Image, Robots, and Sitemap exist', () => {
  assert.ok(existsSync(resolve('public/icon.svg')), 'icon.svg exists');
  assert.ok(existsSync(resolve('public/og-image.png')), 'og-image.png exists');
  assert.ok(existsSync(resolve('src/app/robots.ts')), 'robots.ts exists');
  assert.ok(existsSync(resolve('src/app/sitemap.ts')), 'sitemap.ts exists');
});
