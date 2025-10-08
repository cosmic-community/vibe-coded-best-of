// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getProjectBySlug, getApprovedProjects } from '@/lib/cosmic';
import ShareButtons from '@/components/ShareButtons';
import { ExternalLink, Github } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | Vibe-Coded Best Of`,
    description: project.metadata?.description?.substring(0, 160) || 'A vibe-coded project',
  };
}

export async function generateStaticParams() {
  const projects = await getApprovedProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  const {
    title,
    metadata: {
      author_name,
      website_url,
      repo_url,
      thumbnail,
      description,
      tools_used = [],
      prompts_or_notes,
      tips,
      highs,
      lows,
      published_at
    } = {}
  } = project;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      {thumbnail && (
        <div className="w-full h-96 bg-muted relative overflow-hidden">
          <img 
            src={`${thumbnail.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-ink mb-4">
            {title}
          </h1>
          <div className="flex items-center gap-6 text-ink/70 mb-6">
            <span>By {author_name}</span>
            {published_at && (
              <span>Published {new Date(published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            )}
          </div>
          
          {/* External Links */}
          <div className="flex gap-4 mb-8">
            {website_url && (
              <a 
                href={website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-2xl font-semibold transition-hover hover:bg-accent/90 focus-ring"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Site
              </a>
            )}
            {repo_url && (
              <a 
                href={repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-2xl font-semibold transition-hover hover:bg-ink/90 focus-ring"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            )}
          </div>
          
          {/* Tools Used */}
          {tools_used.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
                Built With
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools_used.map((tool) => (
                  <span 
                    key={tool}
                    className="bg-muted px-4 py-2 rounded-full text-sm font-medium text-ink"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <ShareButtons 
            url={`https://vibecoded.app/projects/${slug}`}
            title={title}
          />
        </div>
        
        {/* Description */}
        {description && (
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink mb-6">
              What they built
            </h2>
            <div 
              className="prose"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </section>
        )}
        
        {/* Prompts & Notes */}
        {prompts_or_notes && (
          <section className="mb-12 bg-muted p-8 rounded-2xl">
            <h2 className="text-3xl font-serif font-bold text-ink mb-6">
              Prompts & Notes
            </h2>
            <div 
              className="prose"
              dangerouslySetInnerHTML={{ __html: prompts_or_notes }}
            />
          </section>
        )}
        
        {/* Tips */}
        {tips && (
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink mb-6">
              Tips for builders
            </h2>
            <div 
              className="prose"
              dangerouslySetInnerHTML={{ __html: tips }}
            />
          </section>
        )}
        
        {/* Highs & Lows */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {highs && (
            <section className="bg-green-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-serif font-bold text-ink mb-4">
                ✨ Highs
              </h2>
              <div 
                className="prose prose-sm"
                dangerouslySetInnerHTML={{ __html: highs }}
              />
            </section>
          )}
          
          {lows && (
            <section className="bg-orange-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-serif font-bold text-ink mb-4">
                🤔 Lows
              </h2>
              <div 
                className="prose prose-sm"
                dangerouslySetInnerHTML={{ __html: lows }}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}