'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }
      
      setMessage({ 
        type: 'success', 
        text: 'Thanks for subscribing! Check your email to confirm.' 
      });
      setEmail('');
      setName('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to subscribe' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-6 py-4 bg-white text-ink rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-6 py-4 bg-white text-ink rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white px-6 py-4 rounded-2xl font-semibold transition-hover hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <div 
          className={`mt-4 p-4 rounded-2xl ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}