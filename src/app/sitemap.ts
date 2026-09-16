import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dulajmendis.com';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://railway.dulajmendis.com',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
