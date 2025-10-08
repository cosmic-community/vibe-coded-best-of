import { getPendingSubmissions } from '@/lib/cosmic';
import AdminSubmissionCard from '@/components/AdminSubmissionCard';

export const revalidate = 0;

export const metadata = {
  title: 'Admin: Pending Submissions | Vibe-Coded Best Of',
  description: 'Review and moderate project submissions.',
};

export default async function AdminSubmissionsPage() {
  const pendingSubmissions = await getPendingSubmissions();
  
  return (
    <div className="min-h-screen bg-muted py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-ink mb-4">
            Pending Submissions
          </h1>
          <p className="text-xl text-ink/70">
            {pendingSubmissions.length} {pendingSubmissions.length === 1 ? 'submission' : 'submissions'} awaiting review
          </p>
        </div>
        
        {pendingSubmissions.length > 0 ? (
          <div className="space-y-8">
            {pendingSubmissions.map((submission) => (
              <AdminSubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-xl text-ink/60">No pending submissions. All caught up! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}