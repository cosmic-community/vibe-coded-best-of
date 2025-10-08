import Link from 'next/link';
import type { ProjectSubmission } from '@/lib/types';

interface ProjectCardProps {
  project: ProjectSubmission;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    slug,
    title,
    metadata: {
      author_name,
      thumbnail,
      description,
      tools_used = []
    } = {}
  } = project;
  
  // Extract plain text from HTML description
  const plainDescription = description?.replace(/<[^>]*>/g, '') || '';
  const excerpt = plainDescription.length > 150 
    ? `${plainDescription.substring(0, 150)}...` 
    : plainDescription;
  
  return (
    <Link
      href={`/projects/${slug}`}
      className="block bg-white rounded-2xl overflow-hidden card-hover focus-ring"
    >
      {/* Thumbnail */}
      {thumbnail ? (
        <div className="aspect-video bg-muted relative overflow-hidden">
          <img 
            src={`${thumbnail.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-accent/20 to-muted flex items-center justify-center">
          <span className="text-4xl font-serif font-bold text-ink/30">{title[0]}</span>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-ink mb-2 line-clamp-2">
          {title}
        </h3>
        
        {author_name && (
          <p className="text-sm text-ink/60 mb-3">
            by {author_name}
          </p>
        )}
        
        <p className="text-ink/70 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        {/* Tools */}
        {tools_used.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tools_used.slice(0, 3).map((tool) => (
              <span 
                key={tool}
                className="text-xs bg-muted px-3 py-1 rounded-full text-ink/70"
              >
                {tool}
              </span>
            ))}
            {tools_used.length > 3 && (
              <span className="text-xs text-ink/50 px-3 py-1">
                +{tools_used.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}