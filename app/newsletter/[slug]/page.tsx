// app/newsletter/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getNewsletterBySlug, getNewsletterIssues } from '@/lib/cosmic';
import ProjectCard from '@/components/ProjectCard';
import type { Metadata } from 'next';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getNewsletterBySlug(slug);
  
  if (!issue) {
    return {
      title: 'Newsletter Not Found',
    };
  }
  
  return {
    title: `${issue.title} | Vibe-Coded Best Of Newsletter`,
    description: issue.metadata?.excerpt || 'A vibe-coded newsletter issue',
  };
}

export async function generateStaticParams() {
  const issues = await getNewsletterIssues();
  
  return issues.map((issue) => ({
    slug: issue.slug,
  }));
}

export default async function NewsletterIssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = await getNewsletterBySlug(slug);
  
  if (!issue) {
    notFound();
  }
  
  const {
    title,
    metadata: {
      issue_number,
      cover_image,
      excerpt,
      body,
      featured_projects = [],
      published_at
    } = {}
  } = issue;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      {cover_image && (
        <div className="w-full h-96 bg-muted relative overflow-hidden">
          <img 
            src={`${cover_image.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          {issue_number && (
            <div className="text-accent font-semibold text-lg mb-2">
              Issue #{issue_number}
            </div>
          )}
          <h1 className="text-5xl font-serif font-bold text-ink mb-4">
            {title}
          </h1>
          {published_at && (
            <div className="text-ink/70">
              {new Date(published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          )}
          {excerpt && (
            <p className="text-xl text-ink/70 mt-6 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>
        
        {/* Body Content */}
        {body && (
          <div 
            className="prose mb-16"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
        
        {/* Featured Projects */}
        {featured_projects.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-ink mb-8">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featured_projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}