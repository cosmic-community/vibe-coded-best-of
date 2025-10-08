'use client';

import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import ToolFilter from './ToolFilter';
import { Search } from 'lucide-react';
import type { ProjectSubmission } from '@/lib/types';

interface ProjectsGridProps {
  projects: ProjectSubmission[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  
  // Extract all unique tools
  const allTools = useMemo(() => {
    const toolsSet = new Set<string>();
    projects.forEach(project => {
      project.metadata?.tools_used?.forEach(tool => toolsSet.add(tool));
    });
    return Array.from(toolsSet).sort();
  }, [projects]);
  
  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDescription = project.metadata?.description?.toLowerCase().includes(query);
        const matchesTools = project.metadata?.tools_used?.some(
          tool => tool.toLowerCase().includes(query)
        );
        
        if (!matchesTitle && !matchesDescription && !matchesTools) {
          return false;
        }
      }
      
      // Tool filter
      if (selectedTools.length > 0) {
        const projectTools = project.metadata?.tools_used || [];
        const hasSelectedTool = selectedTools.some(tool => 
          projectTools.includes(tool)
        );
        
        if (!hasSelectedTool) {
          return false;
        }
      }
      
      return true;
    });
  }, [projects, searchQuery, selectedTools]);
  
  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-accent focus:outline-none text-lg"
          />
        </div>
        
        {/* Tool Filters */}
        <ToolFilter
          tools={allTools}
          selectedTools={selectedTools}
          onToggleTool={(tool) => {
            setSelectedTools(prev =>
              prev.includes(tool)
                ? prev.filter(t => t !== tool)
                : [...prev, tool]
            );
          }}
        />
      </div>
      
      {/* Results Count */}
      <div className="mb-6 text-ink/70">
        Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
      </div>
      
      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl">
          <p className="text-xl text-ink/60 mb-4">No projects found</p>
          <p className="text-ink/50">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}