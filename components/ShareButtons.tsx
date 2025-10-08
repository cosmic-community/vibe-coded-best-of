'use client';

import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-ink/60 mr-2">Share:</span>
      
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-muted rounded-lg hover:bg-gray-300 transition-colors focus-ring"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5 text-ink" />
      </a>
      
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-muted rounded-lg hover:bg-gray-300 transition-colors focus-ring"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5 text-ink" />
      </a>
      
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-muted rounded-lg hover:bg-gray-300 transition-colors focus-ring"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-ink" />
      </a>
      
      <button
        onClick={handleCopyLink}
        className="p-2 bg-muted rounded-lg hover:bg-gray-300 transition-colors focus-ring relative"
        aria-label="Copy link"
      >
        <LinkIcon className="w-5 h-5 text-ink" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}