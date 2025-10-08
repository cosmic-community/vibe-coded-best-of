import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ink text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Vibe-Coded Best Of
            </h3>
            <p className="text-white/70 leading-relaxed">
              Celebrating the best vibe-coded projects from makers using AI tools to build at the speed of thought.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-white/70 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-white/70 hover:text-white transition-colors">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-white/70 hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/vibecodedbestof"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/vibecoded"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <p>© {currentYear} Vibe-Coded Best Of. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}