import Link from 'next/link';

interface WeeklySynthesisSectionProps {
  weekNumber: string;
  weekMeta: any;
}

export default function WeeklySynthesisSection({ weekNumber, weekMeta }: WeeklySynthesisSectionProps) {
  if (!weekMeta?.weekSynthesis) {
    return null; // Don't render if no synthesis available
  }

  const { weekSynthesis } = weekMeta;
  
  // Get first paragraph as preview
  const preview = weekSynthesis.content.split('\n\n')[0];

  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="font-mono text-xs text-gc-text-subtitle tracking-widest mb-8 uppercase">
          Structural Shifts — Week {weekNumber}
        </h2>
        
        {/* Synthesis Card */}
        <div className="relative p-12 bg-gc-bg-secondary border-l-4 border-gc-accent-blue">
          {/* Optional: Faint compass watermark */}
          <div className="absolute top-8 right-8 opacity-5">
            <img 
              src="/logo/logo.png" 
              alt="" 
              width="120"
              height="120"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="font-heading text-2xl text-gc-text-heading mb-6">
              {weekSynthesis.title || "What This Week Reveals"}
            </h3>
            
            <p className="font-body text-base text-gc-text-body leading-relaxed mb-6 max-w-4xl">
              {preview}
            </p>
            
            <Link
              href={`/signals/week-${weekNumber}`}
              className="inline-flex items-center gap-2 font-mono text-sm text-gc-accent-blue hover:text-gc-text-heading transition-colors"
            >
              <span>From The Grey Compass Weekly Briefing (Week {weekNumber})</span>
              <span>→ Read Full Report</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}