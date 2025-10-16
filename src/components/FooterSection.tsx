import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="py-12 px-8 bg-gc-bg-primary border-t border-gc-border">
      <div className="max-w-6xl mx-auto">
        {/* Top Section: Logo + Tagline */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img 
              src="/logo/logo.png" 
              alt="The Grey Compass" 
              width="40"
              height="40"
              className="opacity-60"
            />
            <span className="font-heading text-xl text-gc-text-heading">
              THE GREY COMPASS
            </span>
          </div>
          <p className="font-mono text-xs text-gc-text-subtitle italic">
            No ideology, no emotion — only structure and signal.
          </p>
        </div>
        
        {/* Middle Section: Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link 
            href="/signals" 
            className="font-mono text-xs text-gc-text-subtitle hover:text-gc-accent-blue transition-colors tracking-wide"
          >
            Signals
          </Link>
          <span className="text-gc-border">|</span>
          <Link 
            href="#newsletter" 
            className="font-mono text-xs text-gc-text-subtitle hover:text-gc-accent-blue transition-colors tracking-wide"
          >
            Newsletter
          </Link>
          <span className="text-gc-border">|</span>
          <Link 
            href="/about" 
            className="font-mono text-xs text-gc-text-subtitle hover:text-gc-accent-blue transition-colors tracking-wide"
          >
            About
          </Link>
          {/* Future links - uncommented when pages exist */}
          {/* <span className="text-gc-border">|</span>
          <Link href="/deep-lens" className="...">Deep Lens</Link>
          <span className="text-gc-border">|</span>
          <Link href="/meta-reports" className="...">Meta Reports</Link> */}
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href="https://instagram.com/thegreycompass" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gc-text-subtitle hover:text-gc-accent-blue transition-colors"
          >
            Instagram
          </a>
          <a 
            href="https://linkedin.com/company/thegreycompass" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gc-text-subtitle hover:text-gc-accent-blue transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://substack.com/@thegreycompass" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gc-text-subtitle hover:text-gc-accent-blue transition-colors"
          >
            Substack
          </a>
        </div>
        
        {/* Bottom Section: Copyright */}
        <div className="text-center">
          <p className="font-mono text-xs text-gc-text-subtitle opacity-50">
            © 2025 The Grey Compass · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}