export const metadata = {
  title: 'Privacy Policy | Vibe-Coded Best Of',
  description: 'Our privacy policy and data practices.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-ink mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-ink/70 leading-relaxed mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Information We Collect
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed">
              When you submit a project or subscribe to our newsletter, we collect your name, email address, and project details. This information is stored securely in our CMS and is used solely for the purposes of showcasing projects and sending newsletters.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              How We Use Your Information
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-lg text-ink/70 ml-6 list-disc">
              <li>Display approved projects on our platform</li>
              <li>Send newsletter updates to subscribers</li>
              <li>Communicate with project submitters about their submissions</li>
              <li>Improve our platform and services</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Data Security
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed">
              We implement appropriate security measures to protect your personal information. Your data is stored securely with Cosmic CMS and is only accessible to authorized administrators.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Your Rights
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="space-y-2 text-lg text-ink/70 ml-6 list-disc">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Unsubscribe from our newsletter at any time</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-ink mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@vibecoded.app.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}