import { NextRequest, NextResponse } from 'next/server';
import { createProjectSubmission } from '@/lib/cosmic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    const requiredFields = ['title', 'name', 'email', 'websiteUrl', 'description', 'tools'];
    for (const field of requiredFields) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Validate URL format
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(body.websiteUrl)) {
      return NextResponse.json(
        { error: 'Invalid website URL' },
        { status: 400 }
      );
    }
    
    if (body.repoUrl && !urlRegex.test(body.repoUrl)) {
      return NextResponse.json(
        { error: 'Invalid repository URL' },
        { status: 400 }
      );
    }
    
    // Create submission
    await createProjectSubmission({
      title: body.title,
      author_name: body.name,
      author_email: body.email,
      website_url: body.websiteUrl,
      repo_url: body.repoUrl,
      description: body.description,
      tools_used: body.tools,
      prompts_or_notes: body.prompts,
      tips: body.tips,
      highs: body.highs,
      lows: body.lows,
    });
    
    return NextResponse.json(
      { message: 'Submission received successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}