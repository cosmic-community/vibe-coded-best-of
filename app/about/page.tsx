export const metadata = {
  title: 'About | Vibe-Coded Best Of',
  description: 'Learn about our mission to showcase the best vibe-coded projects.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-ink mb-8">
          About Vibe-Coded Best Of
        </h1>
        
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-ink/80 leading-relaxed mb-6">
              Vibe coding is building at the speed of thought. We highlight the teams and solo builders who turn ideas into working products fast. Tools do not matter. Craft does.
            </p>
            <p className="text-lg text-ink/70 leading-relaxed">
              We celebrate the explosion of AI-assisted development tools—from Cursor and Claude to V0, Bolt, and beyond—and the incredible projects being built with them. Our platform showcases real builders sharing real experiences, complete with their prompts, lessons learned, and honest reflections.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Submission Guidelines
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6">
              We're looking for projects that demonstrate the power of AI-assisted development. Your submission should include:
            </p>
            <ul className="space-y-3 text-lg text-ink/70">
              <li>A working demo or live site (required)</li>
              <li>Clear description of what you built and why</li>
              <li>The tools you used and why you chose them</li>
              <li>Any interesting prompts or development approaches</li>
              <li>Honest reflections on what worked and what didn't</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Curation Criteria
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6">
              We review every submission with these principles in mind:
            </p>
            <ul className="space-y-3 text-lg text-ink/70">
              <li><strong>Quality over quantity:</strong> We look for projects that demonstrate thoughtful execution</li>
              <li><strong>Learning value:</strong> Projects that share insights help the community grow</li>
              <li><strong>Diversity of tools:</strong> We showcase projects built with all kinds of AI tools</li>
              <li><strong>Honest storytelling:</strong> We value transparency about challenges and failures</li>
              <li><strong>Working demos:</strong> Projects should be live and functional</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Review Process
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6">
              After you submit your project:
            </p>
            <ol className="space-y-3 text-lg text-ink/70 list-decimal ml-6">
              <li>Your submission enters our moderation queue</li>
              <li>Our team reviews your project against our curation criteria</li>
              <li>We'll email you once your project is approved (usually within 48 hours)</li>
              <li>Approved projects appear in our public gallery and may be featured in newsletters</li>
            </ol>
          </section>
          
          <section className="bg-muted p-8 rounded-2xl">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Join the Community
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6">
              Vibe-Coded Best Of is more than a showcase—it's a community of builders learning and growing together. Subscribe to our newsletter for weekly curated projects, or submit your own work to inspire others.
            </p>
            <p className="text-lg text-ink/70 leading-relaxed">
              Whether you're just starting with AI-assisted development or you're a seasoned vibe coder, we'd love to see what you're building.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}