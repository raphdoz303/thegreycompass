'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationHeader() {
  const pathname = usePathname();
  
  // Check if link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gc-bg-primary/90 backdrop-blur-sm border-b border-gc-border">
      <nav className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/logo/logo.png" 
              alt="The Grey Compass" 
              width="32"
              height="32"
              className="opacity-80"
            />
            <span className="font-heading text-sm text-gc-text-heading tracking-wide uppercase">
              The Grey Compass
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link 
              href="/signals"
              className={`font-mono text-xs tracking-wide transition-colors ${
                isActive('/signals') 
                  ? 'text-gc-accent-blue' 
                  : 'text-gc-text-subtitle hover:text-gc-text-heading'
              }`}
            >
              Signals
            </Link>
            
            <Link 
              href="/deep-lens"
              className={`font-mono text-xs tracking-wide transition-colors ${
                isActive('/deep-lens') 
                  ? 'text-gc-accent-blue' 
                  : 'text-gc-text-subtitle hover:text-gc-text-heading'
              }`}
            >
              Deep Lens
            </Link>
            
            <Link 
              href="/meta-reports"
              className={`font-mono text-xs tracking-wide transition-colors ${
                isActive('/meta-reports') 
                  ? 'text-gc-accent-blue' 
                  : 'text-gc-text-subtitle hover:text-gc-text-heading'
              }`}
            >
              Meta Reports
            </Link>
            
            <Link 
              href="/constructive-dossiers"
              className={`font-mono text-xs tracking-wide transition-colors ${
                isActive('/constructive-dossiers') 
                  ? 'text-gc-accent-blue' 
                  : 'text-gc-text-subtitle hover:text-gc-text-heading'
              }`}
            >
              Constructive Dossiers
            </Link>
            
            <Link 
              href="/newsletter"
              className={`font-mono text-xs tracking-wide transition-colors ${
                isActive('/newsletter') 
                  ? 'text-gc-accent-blue' 
                  : 'text-gc-text-subtitle hover:text-gc-text-heading'
              }`}
            >
              Newsletter
            </Link>
            
            <Link 
              href="/about"
              className={`font-mono text-xs tracking-wide transition-colors ${
                isActive('/about') 
                  ? 'text-gc-accent-blue' 
                  : 'text-gc-text-subtitle hover:text-gc-text-heading'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}