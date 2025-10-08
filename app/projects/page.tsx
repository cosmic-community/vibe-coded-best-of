import { getApprovedProjects } from '@/lib/cosmic';
import ProjectsGrid from '@/components/ProjectsGrid';

export const revalidate = 60;

export const metadata = {
  title: 'Projects | Vibe-Coded Best Of',
  description: 'Browse all approved vibe-coded projects from makers around the world.',
};

export default async function ProjectsPage() {
  const projects = await getApprovedProjects();
  
  return (
    <div className="min-h-screen bg-muted py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-ink mb-4">
            All Projects
          </h1>
          <p className="text-xl text-ink/70">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} from makers around the world
          </p>
        </div>
        
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}