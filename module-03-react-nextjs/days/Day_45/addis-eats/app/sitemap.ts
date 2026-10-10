import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const menuRoutes = ['doro-wat', 'special-tibs', 'kitfo'].map((id) => ({
    url: `${baseUrl}/menu/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/menu`, lastModified: new Date(), priority: 0.9 },
    ...menuRoutes,
  ];
}