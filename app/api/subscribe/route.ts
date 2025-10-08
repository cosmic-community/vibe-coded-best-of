import { NextRequest, NextResponse } from 'next/server';
import { createSubscriber } from '@/lib/cosmic';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Generate confirmation token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Create subscriber
    await createSubscriber(body.email, body.name, token);
    
    // In production, send confirmation email here
    // For now, return success
    return NextResponse.json(
      { 
        message: 'Subscription successful. Please check your email to confirm.',
        token // Include token for testing purposes
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}