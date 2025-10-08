import { NextRequest, NextResponse } from 'next/server';
import { updateProjectStatus } from '@/lib/cosmic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    await updateProjectStatus(body.id, 'Approved', body.featured);
    
    return NextResponse.json(
      { message: 'Project approved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error approving project:', error);
    return NextResponse.json(
      { error: 'Failed to approve project' },
      { status: 500 }
    );
  }
}