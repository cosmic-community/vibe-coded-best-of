import { getNewsletterIssues } from '@/lib/cosmic';
import NewsletterCard from '@/components/NewsletterCard';
import NewsletterForm from '@/components/NewsletterForm';

export const revalidate = 60;

export const metadata = {
  title: 'Newsletter | Vibe-Coded Best Of',
  description: 'Browse past newsletter issues featuring the best vibe-coded projects.',
};

export default async function NewsletterPage() {
  const issues = await getNewsletterIssues();
  
  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <section className="bg-ink text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold mb-6">
            Newsletter Archive
          </h1>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Catch up on past issues featuring the best vibe-coded projects from the community.
          </p>
          <NewsletterForm />
        </div>
      </section>
      
      {/* Issues */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {issues.length > 0 ? (
            <div className="space-y-8">
              {issues.map((issue) => (
                <NewsletterCard key={issue.id} issue={issue} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-ink/60">No newsletter issues yet. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}