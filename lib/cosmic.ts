import { createBucketClient } from '@cosmicjs/sdk';
import type { ProjectSubmission, NewsletterIssue, SiteSettings } from './types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch approved projects with sorting
export async function getApprovedProjects(): Promise<ProjectSubmission[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'project-submissions',
        'metadata.status.key': 'approved'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by published_at (newest first)
    return (response.objects as ProjectSubmission[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.published_at || '').getTime();
      const dateB = new Date(b.metadata?.published_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch approved projects');
  }
}

// Fetch featured projects
export async function getFeaturedProjects(): Promise<ProjectSubmission[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'project-submissions',
        'metadata.status.key': 'approved',
        'metadata.featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as ProjectSubmission[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.published_at || '').getTime();
      const dateB = new Date(b.metadata?.published_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured projects');
  }
}

// Fetch single project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectSubmission | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'project-submissions',
        slug
      })
      .depth(1);
    
    return response.object as ProjectSubmission;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch project');
  }
}

// Fetch all newsletter issues
export async function getNewsletterIssues(): Promise<NewsletterIssue[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'newsletter-issues'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as NewsletterIssue[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.published_at || '').getTime();
      const dateB = new Date(b.metadata?.published_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch newsletter issues');
  }
}

// Fetch single newsletter issue by slug
export async function getNewsletterBySlug(slug: string): Promise<NewsletterIssue | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'newsletter-issues',
        slug
      })
      .depth(1);
    
    return response.object as NewsletterIssue;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch newsletter issue');
  }
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'site-settings'
      })
      .depth(1);
    
    return response.object as SiteSettings;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch site settings');
  }
}

// Get all pending submissions (admin)
export async function getPendingSubmissions(): Promise<ProjectSubmission[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'project-submissions',
        'metadata.status.key': 'pending'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as ProjectSubmission[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch pending submissions');
  }
}

// Create project submission
export async function createProjectSubmission(data: {
  title: string;
  author_name: string;
  author_email: string;
  website_url: string;
  repo_url?: string;
  description: string;
  tools_used: string[];
  prompts_or_notes?: string;
  tips?: string;
  highs?: string;
  lows?: string;
}): Promise<ProjectSubmission> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'project-submissions',
      title: data.title,
      metadata: {
        title: data.title,
        status: 'Pending Review',
        author_name: data.author_name,
        author_email: data.author_email,
        website_url: data.website_url,
        repo_url: data.repo_url || '',
        description: data.description,
        tools_used: data.tools_used,
        prompts_or_notes: data.prompts_or_notes || '',
        tips: data.tips || '',
        highs: data.highs || '',
        lows: data.lows || '',
        featured: false
      }
    });
    
    return response.object as ProjectSubmission;
  } catch (error) {
    console.error('Error creating project submission:', error);
    throw new Error('Failed to create project submission');
  }
}

// Update project status (admin)
export async function updateProjectStatus(
  id: string,
  status: 'Pending Review' | 'Approved' | 'Rejected',
  featured?: boolean
): Promise<void> {
  try {
    const updateData: any = {
      metadata: {
        status
      }
    };
    
    if (status === 'Approved') {
      updateData.metadata.published_at = new Date().toISOString();
    }
    
    if (featured !== undefined) {
      updateData.metadata.featured = featured;
    }
    
    await cosmic.objects.updateOne(id, updateData);
  } catch (error) {
    console.error('Error updating project status:', error);
    throw new Error('Failed to update project status');
  }
}

// Create subscriber
export async function createSubscriber(email: string, name?: string, token?: string): Promise<void> {
  try {
    await cosmic.objects.insertOne({
      type: 'subscribers',
      title: `${name || 'Subscriber'} - ${email}`,
      metadata: {
        name: name || '',
        email,
        source: 'site',
        double_opt_in: false,
        opt_in_token: token || ''
      }
    });
  } catch (error) {
    console.error('Error creating subscriber:', error);
    throw new Error('Failed to create subscriber');
  }
}

// Confirm subscriber
export async function confirmSubscriber(token: string): Promise<boolean> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'subscribers',
        'metadata.opt_in_token': token
      })
      .props(['id']);
    
    if (response.objects.length === 0) {
      return false;
    }
    
    const subscriberId = response.objects[0]?.id;
    if (!subscriberId) {
      return false;
    }
    
    await cosmic.objects.updateOne(subscriberId, {
      metadata: {
        double_opt_in: true,
        confirmed_at: new Date().toISOString()
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error confirming subscriber:', error);
    return false;
  }
}