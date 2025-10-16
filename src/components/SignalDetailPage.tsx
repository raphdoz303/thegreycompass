import Link from 'next/link';
import AdaptiveTitle from './AdaptiveTitle';

interface SignalDetailPageProps {
  signal: any;
}

// Helper function to parse line breaks and bold text
function parseText(text: string) {
  // Split by line breaks
  const paragraphs = text.split('\n');
  
  return paragraphs.map((paragraph, pIndex) => {
    // Parse bold within each paragraph
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
    
    const formattedParts = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={i} className="font-semibold text-gc-text-heading">
            {boldText}
          </strong>
        );
      }
      return part;
    });
    
    return (
      <span key={pIndex}>
        {formattedParts}
        {pIndex < paragraphs.length - 1 && <br />}
      </span>
    );
  });
}

export default function SignalDetailPage({ signal }: SignalDetailPageProps) {
  const mapsUrl = `https://www.google.com/maps?q=${signal.fieldLocation}`;

  return (
    <div className="min-h-screen bg-gc-bg-primary">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-8 pt-8">
        <Link 
          href="/signals" 
          className="font-mono text-xs text-gc-accent-blue hover:text-gc-text-heading transition-colors tracking-wide"
        >
          ← BACK TO ALL SIGNALS
        </Link>
      </div>

      {/* Signal Header */}
      <header className="max-w-4xl mx-auto px-8 py-12">
        <div className="border-t border-gc-border mb-6" />
        
        <div className="text-center mb-6 font-mono text-xs text-gc-text-subtitle tracking-wider">
          WEEKLY COMPASS · {signal.date}
        </div>
        
        <div className="border-t border-gc-border mb-8" />
        
        <div className="flex items-center gap-6 mb-8 ml-8">
          <img 
            src="/logo/logo.png" 
            alt="The Grey Compass" 
            width="96"
            height="96"
            className="flex-shrink-0 opacity-60"
          />
          <AdaptiveTitle title={signal.title} />
        </div>
        
        <div className="border-t border-gc-border mb-4" />
        
        <div className="text-center font-mono text-xs text-gc-text-subtitle tracking-widest">
          {signal.id.toUpperCase()}
        </div>
      </header>

      {/* 4-Block Structure */}
      <main className="max-w-4xl mx-auto px-8 py-12 space-y-12">
        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Observed Event:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {parseText(signal.observedIndicator)}
          </p>
          <p className="font-mono text-xs text-gc-text-subtitle mt-4 italic">
            Sources:{' '}
            {signal.sources.map((source: any, index: number) => (
              <span key={index}>
                {source.url ? (
                  <a 
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gc-accent-blue hover:text-gc-text-heading transition-colors underline"
                  >
                    {source.name}
                  </a>
                ) : (
                  <span>{source.name}</span>
                )}
                {index < signal.sources.length - 1 && ' / '}
              </span>
            ))}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Systemic Context:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {parseText(signal.systemicContext)}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Structural Signal:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {parseText(signal.structuralSignal)}
          </p>
        </section>

        <div className="border-t border-gc-border opacity-40" />

        <section>
          <h2 className="font-mono text-base text-gc-text-subtitle tracking-widest mb-4 uppercase">
            Projected Impact:
          </h2>
          <p className="text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {parseText(signal.projectedImpact)}
          </p>
        </section>
      </main>

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