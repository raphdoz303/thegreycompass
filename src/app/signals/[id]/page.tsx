import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Import all signal JSON files
import signal1 from '@/data/signals/gc-w41-03-eu-eco.json';

// Create a map of all signals (we'll expand this as you add more)
const signals: { [key: string]: any } = {
  'gc-w41-03-eu-eco': signal1,
};

export default async function SignalPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const signal = signals[id];
  
  // If signal doesn't exist, show 404
  if (!signal) {
    notFound();
  }

  // Convert field location to Google Maps URL
  const mapsUrl = `https://www.google.com/maps?q=${signal.fieldLocation}`;

  return (
    <div className="min-h-screen bg-gc-bg-primary">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-8 pt-8">
        <Link 
          href="/" 
          className="font-mono text-xs text-gc-accent-blue hover:text-gc-text-heading transition-colors tracking-wide"
        >
          ← BACK TO SIGNALS
        </Link>
      </div>

      {/* Signal Header */}
      <header className="max-w-4xl mx-auto px-8 py-12">
        {/* Top divider */}
        <div className="border-t border-gc-border mb-6" />
        
        {/* Centered metadata */}
        <div className="text-center mb-6 font-mono text-xs text-gc-text-subtitle tracking-wider">
          WEEKLY COMPASS · {signal.date}
        </div>
        
        {/* Divider */}
        <div className="border-t border-gc-border mb-8" />
        
        {/* Logo + Title */}
        <div className="flex items-center gap-6 mb-8 ml-8">
          <img 
            src="/logo/logo.png" 
            alt="The Grey Compass" 
            width="96"
            height="96"
            className="flex-shrink-0 opacity-60"
          />
          <h1 className="font-heading text-4xl text-gc-text-heading leading-tight flex-1 line-clamp-2" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {signal.title}
          </h1>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gc-border mb-4" />
        
        {/* ID Code - centered */}
        <div className="text-center font-mono text-xs text-gc-text-subtitle tracking-widest">
          {signal.id.toUpperCase()}
        </div>
      </header>

      {/* 4-Block Structure */}
      <main className="max-w-4xl mx-auto px-8 py-12 space-y-12">
        {/* Block 1: Observed Indicator */}
        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Observed Indicator:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {signal.observedIndicator}
          </p>
          <p className="font-mono text-xs text-gc-text-subtitle mt-4 italic">
            Sources: {signal.sources.join(' / ')}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        {/* Block 2: Systemic Context */}
        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Systemic Context:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {signal.systemicContext}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        {/* Block 3: Structural Signal */}
        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Structural Signal:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {signal.structuralSignal}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        {/* Block 4: Projected Impact */}
        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Projected Impact:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {signal.projectedImpact}
          </p>
        </section>
      </main>

      {/* Footer metadata */}
      <footer className="max-w-4xl mx-auto px-8 py-12">
        <div className="border-t border-gc-border mb-6" />
        
        <div className="flex justify-between items-start font-mono text-xs text-gc-text-subtitle">
          <div className="flex flex-wrap gap-4">
            {signal.axes.map((axis: string) => (
              <span key={axis} className="uppercase tracking-wider">
                {axis}
              </span>
            ))}
          </div>
          <span className="italic">{signal.region}</span>
        </div>
        
        <div className="text-center mt-6">
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gc-text-body opacity-60 hover:opacity-100 hover:text-gc-accent-blue transition-all"
          >
            Field Location: {signal.fieldLocation}
          </a>
        </div>
      </footer>
    </div>
  );
}