'use client';

interface ToolFilterProps {
  tools: string[];
  selectedTools: string[];
  onToggleTool: (tool: string) => void;
}

export default function ToolFilter({ tools, selectedTools, onToggleTool }: ToolFilterProps) {
  if (tools.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
        Filter by Tool
      </h3>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => {
          const isSelected = selectedTools.includes(tool);
          
          return (
            <button
              key={tool}
              onClick={() => onToggleTool(tool)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-ring ${
                isSelected
                  ? 'bg-accent text-white'
                  : 'bg-white text-ink hover:bg-muted'
              }`}
            >
              {tool}
            </button>
          );
        })}
      </div>
    </div>
  );
}