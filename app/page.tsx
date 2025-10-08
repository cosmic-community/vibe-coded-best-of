import Link from 'next/link';
import { getApprovedProjects, getFeaturedProjects } from '@/lib/cosmic';
import ProjectCard from '@/components/ProjectCard';
import NewsletterForm from '@/components/NewsletterForm';

export const revalidate = 60;

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const recentProjects = await getApprovedProjects();
  const displayProjects = featuredProjects.length > 0 ? featuredProjects.slice(0, 6) : recentProjects.slice(0, 6);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-ink mb-6">
            The best vibe-coded builds, in one place
          </h1>
          <p className="text-xl md:text-2xl text-ink/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover standout projects from makers using every tool under the sun. Submit yours, subscribe for fresh finds, and get inspired.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/submit"
              className="bg-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-hover hover:bg-accent/90 focus-ring"
            >
              Submit a Project
            </Link>
            <a 
              href="#subscribe"
              className="bg-white border-2 border-ink text-ink px-8 py-4 rounded-2xl font-semibold text-lg transition-hover hover:bg-muted focus-ring"
            >
              Subscribe
            </a>
          </div>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-ink">
              Latest Projects
            </h2>
            <Link 
              href="/projects"
              className="text-accent hover:underline font-semibold text-lg"
            >
              View All →
            </Link>
          </div>
          
          {displayProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-ink/60">No projects yet. Be the first to submit!</p>
            </div>
          )}
        </div>
      </section>

      {/* What is Vibe Coding */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-ink mb-6">
            What is vibe coding?
          </h2>
          <p className="text-xl text-ink/80 leading-relaxed mb-8">
            Vibe coding is building at the speed of thought. We highlight the teams and solo builders who turn ideas into working products fast. Tools do not matter. Craft does.
          </p>
          <p className="text-lg text-ink/70 leading-relaxed">
            Whether you're using Cursor, Claude, V0, Bolt, or any other tool, if you're building something amazing with AI assistance, we want to showcase your work. Share your process, your prompts, your wins, and your challenges.
          </p>
        </div>
      </section>

      {/* Newsletter Subscribe */}
      <section id="subscribe" className="py-20 px-6 bg-ink">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-6">
            Stay inspired
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Get the best vibe-coded projects delivered to your inbox. Join thousands of makers staying at the cutting edge.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}