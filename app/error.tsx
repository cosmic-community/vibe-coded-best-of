'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold text-ink mb-6">
          Something went wrong!
        </h1>
        <p className="text-xl text-ink/70 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="bg-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-hover hover:bg-accent/90 focus-ring"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}