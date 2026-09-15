import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pulseguard.vercel.app';
  const routes = [
    '',
    '/pricing',
    '/status/demo',
    '/tools/ssl-checker',
    '/tools/cron-generator',
    '/tools/header-analyzer',
    '/privacy',
    '/terms'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
