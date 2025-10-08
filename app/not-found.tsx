import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-serif font-bold text-ink mb-6">
          404
        </h1>
        <h2 className="text-3xl font-serif font-bold text-ink mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-ink/70 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link 
          href="/"
          className="inline-block bg-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-hover hover:bg-accent/90 focus-ring"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}