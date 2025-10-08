'use client';

import { useState } from 'react';
import { ExternalLink, CheckCircle, XCircle, Star } from 'lucide-react';
import type { ProjectSubmission } from '@/lib/types';

interface AdminSubmissionCardProps {
  submission: ProjectSubmission;
}

export default function AdminSubmissionCard({ submission }: AdminSubmissionCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const {
    id,
    title,
    metadata: {
      author_name,
      author_email,
      website_url,
      repo_url,
      description,
      tools_used = [],
      thumbnail
    } = {}
  } = submission;
  
  const handleApprove = async (featured: boolean = false) => {
    setIsProcessing(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, featured }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve');
      }
      
      setMessage(`✅ Project approved${featured ? ' and featured' : ''}!`);
      
      // Reload page after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setMessage('❌ Failed to approve project');
      setIsProcessing(false);
    }
  };
  
  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this submission?')) {
      return;
    }
    
    setIsProcessing(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/admin/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject');
      }
      
      setMessage('✅ Project rejected');
      
      // Reload page after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setMessage('❌ Failed to reject project');
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Preview */}
        <div className="md:col-span-1">
          {thumbnail ? (
            <img 
              src={`${thumbnail.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full aspect-video object-cover rounded-xl"
            />
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-accent/20 to-muted rounded-xl flex items-center justify-center">
              <span className="text-4xl font-serif font-bold text-ink/30">{title[0]}</span>
            </div>
          )}
          
          {/* Links */}
          <div className="mt-4 space-y-2">
            {website_url && (
              <a 
                href={website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </a>
            )}
            {repo_url && (
              <a 
                href={repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </div>
        
        {/* Details */}
        <div className="md:col-span-2">
          <h3 className="text-3xl font-serif font-bold text-ink mb-3">
            {title}
          </h3>
          
          <div className="text-ink/70 mb-4">
            <div>By {author_name}</div>
            <div className="text-sm">{author_email}</div>
          </div>
          
          {/* Tools */}
          {tools_used.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {tools_used.map((tool) => (
                  <span 
                    key={tool}
                    className="bg-muted px-3 py-1 rounded-full text-sm text-ink"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Description */}
          {description && (
            <div 
              className="prose prose-sm mb-6"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleApprove(false)}
              disabled={isProcessing}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5" />
              Approve
            </button>
            
            <button
              onClick={() => handleApprove(true)}
              disabled={isProcessing}
              className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-2xl font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Star className="w-5 h-5" />
              Approve & Feature
            </button>
            
            <button
              onClick={handleReject}
              disabled={isProcessing}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="w-5 h-5" />
              Reject
            </button>
          </div>
          
          {message && (
            <div className="mt-4 text-lg">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}