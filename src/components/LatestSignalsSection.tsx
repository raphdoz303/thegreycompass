import Link from 'next/link';

interface Signal {
  id: string;
  title: string;
  region: string;
  axes: string[];
  structuralSignal: string;
  projectedImpact: string;
  number: string;
  week: string;
}

interface LatestSignalsSectionProps {
  signals: Signal[];
}

export default function LatestSignalsSection({ signals }: LatestSignalsSectionProps) {
  // Get the latest 3 signals
  const latestSignals = signals.slice(0, 3);
  
  // Extract week info from first signal (assuming all from same week)
  const weekInfo = latestSignals[0]?.week || 'Week 41';

  return (
    <section className="py-20 px-8 bg-gc-bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="font-mono text-xs text-gc-text-subtitle tracking-widest mb-8 uppercase">
          {weekInfo} · 2025 — CURRENT SIGNALS
        </h2>
        
        {/* Signal Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {latestSignals.map((signal) => (
            <Link
              key={signal.id}
              href={`/signals/${signal.id}`}
              className="block p-6 bg-gc-bg-primary border border-gc-border hover:border-gc-accent-blue transition-colors"
            >
              {/* Header */}
              <div className="mb-4">
                <p className="font-mono text-xs text-gc-text-subtitle mb-2">
                  {signal.number} {signal.region.toUpperCase()} · {signal.axes[0].toUpperCase()}
                </p>
                <h3 className="font-heading text-lg text-gc-text-heading leading-tight">
                  {signal.title}
                </h3>
              </div>
              
              {/* Structural Signal Preview */}
              <div className="mb-4">
                <p className="font-mono text-xs text-gc-text-subtitle uppercase mb-2">
                  Structural Signal:
                </p>
                <p className="font-body text-xs text-gc-text-body leading-relaxed line-clamp-3">
                  {signal.structuralSignal}
                </p>
              </div>
              
              {/* Projected Impact Preview */}
              <div className="mb-4">
                <p className="font-mono text-xs text-gc-text-subtitle uppercase mb-2">
                  Projected Impact:
                </p>
                <p className="font-body text-xs text-gc-text-body leading-relaxed line-clamp-2">
                  {signal.projectedImpact}
                </p>
              </div>
              
              {/* Read more */}
              <div className="border-t border-gc-border pt-3 mt-4">
                <span className="font-mono text-xs text-gc-accent-blue">
                  Read full brief →
                </span>
              </div>
              
              {/* ID Code */}
              <p className="font-mono text-xs text-gc-text-subtitle opacity-50 mt-3">
                {signal.id.toUpperCase()}
              </p>
            </Link>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/signals"
            className="inline-block px-8 py-3 border border-gc-border text-gc-text-heading font-heading text-sm hover:border-gc-accent-blue hover:text-gc-accent-blue transition-colors"
          >
            View All Signals
          </Link>
        </div>
      </div>
    </section>
  );
}