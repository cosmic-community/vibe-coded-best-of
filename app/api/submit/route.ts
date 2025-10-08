import { NextRequest, NextResponse } from 'next/server';
import { createProjectSubmission } from '@/lib/cosmic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const title = formData.get('title') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const websiteUrl = formData.get('websiteUrl') as string;
    const repoUrl = formData.get('repoUrl') as string;
    const description = formData.get('description') as string;
    const toolsJson = formData.get('tools') as string;
    const prompts = formData.get('prompts') as string;
    const tips = formData.get('tips') as string;
    const highs = formData.get('highs') as string;
    const lows = formData.get('lows') as string;
    const honeypot = formData.get('honeypot') as string;
    const screenshot = formData.get('screenshot') as File | null;
    
    // Honeypot check
    if (honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }
    
    // Parse tools array
    let tools: string[] = [];
    try {
      tools = JSON.parse(toolsJson);
    } catch {
      return NextResponse.json(
        { error: 'Invalid tools format' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!title || !name || !email || !websiteUrl || !description || tools.length === 0 || !screenshot) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Validate URL format
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(websiteUrl)) {
      return NextResponse.json(
        { error: 'Invalid website URL' },
        { status: 400 }
      );
    }
    
    if (repoUrl && !urlRegex.test(repoUrl)) {
      return NextResponse.json(
        { error: 'Invalid repository URL' },
        { status: 400 }
      );
    }
    
    // Create submission with screenshot
    await createProjectSubmission({
      title,
      author_name: name,
      author_email: email,
      website_url: websiteUrl,
      repo_url: repoUrl,
      description,
      tools_used: tools,
      prompts_or_notes: prompts,
      tips,
      highs,
      lows,
      screenshot,
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