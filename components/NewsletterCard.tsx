import Link from 'next/link';
import type { NewsletterIssue } from '@/lib/types';

interface NewsletterCardProps {
  issue: NewsletterIssue;
}

export default function NewsletterCard({ issue }: NewsletterCardProps) {
  const {
    slug,
    title,
    metadata: {
      issue_number,
      cover_image,
      excerpt,
      published_at
    } = {}
  } = issue;
  
  return (
    <Link
      href={`/newsletter/${slug}`}
      className="block bg-white rounded-2xl overflow-hidden card-hover focus-ring"
    >
      <div className="md:flex">
        {/* Cover Image */}
        {cover_image ? (
          <div className="md:w-1/3 aspect-video md:aspect-square bg-muted relative overflow-hidden">
            <img 
              src={`${cover_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="md:w-1/3 aspect-video md:aspect-square bg-gradient-to-br from-accent/20 to-muted flex items-center justify-center">
            <span className="text-4xl font-serif font-bold text-ink/30">
              #{issue_number || '?'}
            </span>
          </div>
        )}
        
        {/* Content */}
        <div className="md:w-2/3 p-6 md:p-8">
          {issue_number && (
            <div className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">
              Issue #{issue_number}
            </div>
          )}
          
          <h3 className="text-3xl font-serif font-bold text-ink mb-3">
            {title}
          </h3>
          
          {published_at && (
            <div className="text-ink/60 mb-4">
              {new Date(published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          )}
          
          {excerpt && (
            <p className="text-lg text-ink/70 line-clamp-3">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}