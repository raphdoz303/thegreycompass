import { notFound } from 'next/navigation';
import Link from 'next/link';

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
      <header className="max-w-4xl mx-auto px-8 py-12 border-b border-gc-border">
        <div className="flex items-center justify-between mb-6 font-mono text-xs text-gc-text-subtitle tracking-wider">
          <span>WEEKLY COMPASS · {signal.date}</span>
          <span className="text-4xl font-heading text-gc-text-heading">{signal.number}</span>
        </div>
        
        <h1 className="font-heading text-5xl text-gc-text-heading mb-6 leading-tight">
          {signal.title}
        </h1>
        
        <div className="font-mono text-xs text-gc-text-subtitle tracking-widest">
          {signal.id.toUpperCase()}
        </div>
      </header>

      {/* 4-Block Structure */}
      <main className="max-w-4xl mx-auto px-8 py-12 space-y-12">
        {/* Block 1: Observed Indicator */}
        <section>
          <h2 className="font-mono text-sm text-gc-text-subtitle tracking-widest mb-4">
            OBSERVED INDICATOR:
          </h2>
          <p className="font-body text-base text-gc-text-body leading-relaxed">
            {signal.observedIndicator}
          </p>
          <p className="font-mono text-xs text-gc-text-subtitle mt-4 italic">
            Sources: {signal.sources.join(' / ')}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        {/* Block 2: Systemic Context */}
        <section>
          <h2 className="font-mono text-sm text-gc-text-subtitle tracking-widest mb-4">
            SYSTEMIC CONTEXT:
          </h2>
          <p className="font-body text-base text-gc-text-body leading-relaxed">
            {signal.systemicContext}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        {/* Block 3: Structural Signal */}
        <section>
          <h2 className="font-mono text-sm text-gc-accent-blue tracking-widest mb-4">
            STRUCTURAL SIGNAL:
          </h2>
          <p className="font-body text-base text-gc-text-body leading-relaxed">
            {signal.structuralSignal}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        {/* Block 4: Projected Impact */}
        <section>
          <h2 className="font-mono text-sm text-gc-text-subtitle tracking-widest mb-4">
            PROJECTED IMPACT:
          </h2>
          <p className="font-body text-base text-gc-text-body leading-relaxed">
            {signal.projectedImpact}
          </p>
        </section>
      </main>

      {/* Footer metadata */}
      <footer className="max-w-4xl mx-auto px-8 py-12 border-t border-gc-border">
        <div className="flex flex-wrap gap-4 font-mono text-xs text-gc-text-subtitle">
          {signal.axes.map((axis: string) => (
            <span key={axis} className="uppercase tracking-wider">
              {axis}
            </span>
          ))}
          <span>·</span>
          <span className="italic">{signal.region}</span>
        </div>
        
        <p className="font-mono text-xs text-gc-text-subtitle mt-6 opacity-60">
          Field Location: {signal.fieldLocation}
        </p>
      </footer>
    </div>
  );
}