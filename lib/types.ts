// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project Submission types
export interface ProjectSubmission extends CosmicObject {
  type: 'project-submissions';
  metadata: {
    title?: string;
    status?: {
      key: string;
      value: string;
    };
    author_name?: string;
    author_email?: string;
    website_url?: string;
    repo_url?: string | null;
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
    tools_used?: string[];
    prompts_or_notes?: string;
    tips?: string;
    highs?: string;
    lows?: string;
    featured?: boolean;
    published_at?: string;
  };
}

// Newsletter Issue types
export interface NewsletterIssue extends CosmicObject {
  type: 'newsletter-issues';
  metadata: {
    title?: string;
    issue_number?: number | null;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    excerpt?: string;
    body?: string;
    featured_projects?: ProjectSubmission[];
    published_at?: string;
  };
}

// Subscriber types
export interface Subscriber extends CosmicObject {
  type: 'subscribers';
  metadata: {
    name?: string;
    email?: string;
    source?: string;
    double_opt_in?: boolean;
    opt_in_token?: string | null;
    confirmed_at?: string | null;
  };
}

// Site Settings types
export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    site_name?: string;
    tagline?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    navigation_links?: Array<{
      label: string;
      href: string;
    }>;
    footer_links?: Array<{
      label: string;
      href: string;
    }>;
    social_links?: Array<{
      network: string;
      url: string;
    }>;
    default_og_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Status type literals matching content model exactly
export type ProjectStatus = 'Pending Review' | 'Approved' | 'Rejected';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Form submission types
export interface ProjectSubmissionFormData {
  title: string;
  name: string;
  email: string;
  websiteUrl: string;
  repoUrl?: string;
  description: string;
  tools: string[];
  prompts?: string;
  tips?: string;
  highs?: string;
  lows?: string;
  tags?: string;
  honeypot?: string;
}

export interface SubscribeFormData {
  name?: string;
  email: string;
}

// Type guards
export function isProjectSubmission(obj: CosmicObject): obj is ProjectSubmission {
  return obj.type === 'project-submissions';
}

export function isNewsletterIssue(obj: CosmicObject): obj is NewsletterIssue {
  return obj.type === 'newsletter-issues';
}

export function isSubscriber(obj: CosmicObject): obj is Subscriber {
  return obj.type === 'subscribers';
}

export function isSiteSettings(obj: CosmicObject): obj is SiteSettings {
  return obj.type === 'site-settings';
}