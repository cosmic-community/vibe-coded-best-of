import { MetadataRoute } from 'next';
import { getApprovedProjects, getNewsletterIssues } from '@/lib/cosmic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vibecoded.app';
  
  const projects = await getApprovedProjects();
  const newsletters = await getNewsletterIssues();
  
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.metadata?.published_at || project.created_at || new Date().toISOString()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  const newsletterUrls = newsletters.map((newsletter) => ({
    url: `${baseUrl}/newsletter/${newsletter.slug}`,
    lastModified: new Date(newsletter.metadata?.published_at || newsletter.created_at || new Date().toISOString()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...projectUrls,
    ...newsletterUrls,
  ];
}