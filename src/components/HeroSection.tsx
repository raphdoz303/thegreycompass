import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Mission */}
          <div>
            <h1 className="font-heading text-5xl text-gc-text-heading mb-4 leading-tight">
              Global System Signals
            </h1>
            <p className="font-mono text-sm text-gc-text-subtitle mb-6 tracking-wide">
              Updated Weekly
            </p>
            
            <p className="font-body text-base text-gc-text-body mb-8 leading-relaxed">
              The Grey Compass decodes the world's structural shifts — verified, multipolar, factual.
            </p>
            
            <p className="font-mono text-xs text-gc-text-subtitle mb-8 italic">
              No ideology, no emotion — only structure and signal.
            </p>
            
            <div className="flex gap-4">
              <Link
                href="/signals"
                className="px-6 py-3 bg-gc-accent-blue text-gc-bg-primary font-heading text-sm hover:bg-gc-text-heading transition-colors"
              >
                View Latest Signals
              </Link>
              
              <Link
                href="#newsletter"
                className="px-6 py-3 border border-gc-border text-gc-text-heading font-heading text-sm hover:border-gc-accent-blue transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </div>
          
          {/* Right Column: Visual Element */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <img 
                src="/logo/logo.png" 
                alt="The Grey Compass" 
                width="192"
                height="192"
                className="opacity-40"
              />
              <p className="font-mono text-xs text-gc-text-subtitle text-center mt-4 opacity-40">
                48°52'36.0"S 123°23'36.0"W
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="border-t border-gc-border opacity-30" />
      </div>
    </section>
  );
}