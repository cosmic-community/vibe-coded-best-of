import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Submission Received | Vibe-Coded Best Of',
  description: 'Your project submission has been received.',
};

export default function SubmitSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="w-24 h-24 text-green-500" />
        </div>
        
        <h1 className="text-5xl font-serif font-bold text-ink mb-6">
          Submission Received!
        </h1>
        
        <p className="text-xl text-ink/70 mb-8 leading-relaxed">
          Thank you for sharing your project with the community. We've received your submission and will review it shortly.
        </p>
        
        <p className="text-lg text-ink/60 mb-12">
          We'll send you an email once your project is approved and published. Keep building amazing things!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-hover hover:bg-accent/90 focus-ring"
          >
            Back to Home
          </Link>
          <Link 
            href="/projects"
            className="bg-white border-2 border-ink text-ink px-8 py-4 rounded-2xl font-semibold text-lg transition-hover hover:bg-muted focus-ring"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}