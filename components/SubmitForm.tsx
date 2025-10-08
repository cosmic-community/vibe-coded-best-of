'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

const AVAILABLE_TOOLS = [
  'Cosmic', 'Lovable', 'Replit', 'Cursor', 'V0', 'Bolt', 'Claude', 'ChatGPT',
  'Vercel', 'Supabase', 'Firebase', 'Netlify', 'Framer', 'Webflow', 'Wix',
  'Bubble', 'Make', 'Zapier', 'Other'
];

export default function SubmitForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    websiteUrl: '',
    repoUrl: '',
    description: '',
    tools: [] as string[],
    prompts: '',
    tips: '',
    highs: '',
    lows: '',
    honeypot: '', // Anti-spam honeypot
  });
  
  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool]
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      
      // Celebrate with confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Redirect to success page
      router.push('/submit/success');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit');
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-2xl">
          {error}
        </div>
      )}
      
      {/* Honeypot field - hidden from real users */}
      <input
        type="text"
        name="portfolio"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-ink mb-2">
          Project Title *
        </label>
        <input
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none"
          placeholder="My Awesome Project"
        />
      </div>
      
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ink mb-2">
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none"
          placeholder="Jane Doe"
        />
      </div>
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">
          Your Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none"
          placeholder="jane@example.com"
        />
        <p className="text-sm text-ink/60 mt-1">We'll email you when your project is approved</p>
      </div>
      
      {/* Website URL */}
      <div>
        <label htmlFor="websiteUrl" className="block text-sm font-semibold text-ink mb-2">
          Website or App URL *
        </label>
        <input
          id="websiteUrl"
          type="url"
          required
          value={formData.websiteUrl}
          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none"
          placeholder="https://myproject.com"
        />
      </div>
      
      {/* Repository URL */}
      <div>
        <label htmlFor="repoUrl" className="block text-sm font-semibold text-ink mb-2">
          Repository URL (optional)
        </label>
        <input
          id="repoUrl"
          type="url"
          value={formData.repoUrl}
          onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none"
          placeholder="https://github.com/user/project"
        />
      </div>
      
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-ink mb-2">
          What did you build? *
        </label>
        <textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none resize-none"
          placeholder="Describe your project in detail..."
        />
      </div>
      
      {/* Tools Used */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-3">
          Tools Used *
        </label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TOOLS.map((tool) => {
            const isSelected = formData.tools.includes(tool);
            
            return (
              <button
                key={tool}
                type="button"
                onClick={() => handleToolToggle(tool)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-ring ${
                  isSelected
                    ? 'bg-accent text-white'
                    : 'bg-muted text-ink hover:bg-gray-300'
                }`}
              >
                {tool}
              </button>
            );
          })}
        </div>
        {formData.tools.length === 0 && (
          <p className="text-sm text-red-600 mt-2">Please select at least one tool</p>
        )}
      </div>
      
      {/* Prompts or Notes */}
      <div>
        <label htmlFor="prompts" className="block text-sm font-semibold text-ink mb-2">
          Prompts or Notes (optional)
        </label>
        <textarea
          id="prompts"
          value={formData.prompts}
          onChange={(e) => setFormData({ ...formData, prompts: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none resize-none"
          placeholder="Share any interesting prompts or development notes..."
        />
      </div>
      
      {/* Tips */}
      <div>
        <label htmlFor="tips" className="block text-sm font-semibold text-ink mb-2">
          Tips for Others (optional)
        </label>
        <textarea
          id="tips"
          value={formData.tips}
          onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none resize-none"
          placeholder="What advice would you give to others building something similar?"
        />
      </div>
      
      {/* Highs */}
      <div>
        <label htmlFor="highs" className="block text-sm font-semibold text-ink mb-2">
          Highs (optional)
        </label>
        <textarea
          id="highs"
          value={formData.highs}
          onChange={(e) => setFormData({ ...formData, highs: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none resize-none"
          placeholder="What went really well during this build?"
        />
      </div>
      
      {/* Lows */}
      <div>
        <label htmlFor="lows" className="block text-sm font-semibold text-ink mb-2">
          Lows (optional)
        </label>
        <textarea
          id="lows"
          value={formData.lows}
          onChange={(e) => setFormData({ ...formData, lows: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-accent focus:outline-none resize-none"
          placeholder="What challenges did you face?"
        />
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || formData.tools.length === 0}
        className="w-full bg-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-hover hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Project'}
      </button>
    </form>
  );
}