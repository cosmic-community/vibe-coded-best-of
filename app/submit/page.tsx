import SubmitForm from '@/components/SubmitForm';

export const metadata = {
  title: 'Submit a Project | Vibe-Coded Best Of',
  description: 'Share your vibe-coded project with the community.',
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-muted py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-serif font-bold text-ink mb-4">
            Submit Your Project
          </h1>
          <p className="text-xl text-ink/70">
            Share your vibe-coded build with the community
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <SubmitForm />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-accent/10 p-8 rounded-2xl sticky top-8">
              <h3 className="text-2xl font-serif font-bold text-ink mb-6">
                Submission Tips
              </h3>
                <ul className="space-y-4 text-ink/80">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span>Upload a clear screenshot or preview image of your project</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span>Be specific about what you shipped and why it matters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span>List the tools you used and why you chose them</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span>Share any interesting prompts or development notes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">•</span>
                    <span>Be honest about what worked and what didn't</span>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-ink/10">
                <p className="text-sm text-ink/60">
                  All submissions go through a review process. We'll email you once your project is approved!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}