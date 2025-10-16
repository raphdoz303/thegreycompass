import React from 'react';
import Link from 'next/link';

interface WeekSynthesisPageProps {
  weekNumber: string;
  weekMeta: any;
  signals: any[];
}

// Parse markdown-style content with inline formatting support
function parseMarkdown(content: string) {
  const sections = content.split('\n\n');
  
  // Helper function to parse inline bold formatting
  const parseInline = (text: string) => {
    // Split by bold markers **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, i) => {
      // If it's a bold section
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2); // Remove ** markers
        return (
          <strong key={i} className="font-semibold text-gc-text-heading">
            {boldText}
          </strong>
        );
      }
      // Regular text
      return part;
    });
  };
  
  return sections.map((section, index) => {
    // Heading level 2 (##)
    if (section.startsWith('## ')) {
      const headingText = section.replace('## ', '');
      return (
        <h2 key={index} className="font-heading text-2xl text-gc-text-heading mt-8 mb-4">
          {parseInline(headingText)}
        </h2>
      );
    }
    
    // Heading level 3 (###)
    if (section.startsWith('### ')) {
      const headingText = section.replace('### ', '');
      return (
        <h3 key={index} className="font-heading text-xl text-gc-text-subtitle mt-6 mb-3">
          {parseInline(headingText)}
        </h3>
      );
    }
    
    // Bullet list
    if (section.includes('\n- ')) {
      const items = section.split('\n').filter(line => line.startsWith('- '));
      return (
        <ul key={index} className="list-disc list-inside space-y-2 my-4 text-sm text-gc-text-body leading-relaxed" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
          {items.map((item, i) => (
            <li key={i}>{parseInline(item.replace('- ', ''))}</li>
          ))}
        </ul>
      );
    }
    
    // Regular paragraph
    return (
      <p key={index} className="text-sm text-gc-text-body leading-relaxed mb-4" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
        {parseInline(section)}
      </p>
    );
  });
}

export default function WeekSynthesisPage({ weekNumber, weekMeta, signals }: WeekSynthesisPageProps) {
  const { weekSynthesis, dateRange } = weekMeta;

  return (
    <div className="min-h-screen bg-gc-bg-primary">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-8 pt-8">
        <Link 
          href="/signals" 
          className="font-mono text-xs text-gc-accent-blue hover:text-gc-text-heading transition-colors tracking-wide"
        >
          ← BACK TO ALL SIGNALS
        </Link>
      </div>

      {/* Week Header */}
      <header className="max-w-5xl mx-auto px-8 py-12">
        <div className="border-t border-gc-border mb-6" />
        
        <div className="text-center mb-6 font-mono text-xs text-gc-text-subtitle tracking-wider">
          WEEK {weekNumber} · 2025
          {dateRange && (
            <span className="ml-3">
              {new Date(dateRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(dateRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        
        <div className="border-t border-gc-border mb-8" />
        
        <h1 className="font-heading text-4xl text-gc-text-heading text-center mb-2">
          {weekSynthesis.title}
        </h1>
        {weekSynthesis.subtitle && (
          <p className="font-mono text-sm text-gc-text-subtitle text-center">
            {weekSynthesis.subtitle}
          </p>
        )}
        
        <div className="border-t border-gc-border mt-8" />
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="prose prose-invert max-w-none">
          {parseMarkdown(weekSynthesis.content)}
        </div>
      </main>

      {/* Signals This Week */}
      <section className="max-w-5xl mx-auto px-8 py-12">
        <div className="border-t border-gc-border mb-8" />
        
        <h2 className="font-heading text-2xl text-gc-text-heading mb-6">
          Signals This Week
        </h2>
        
        <div className="space-y-4">
          {signals.map((signal: any) => (
            <Link
              key={signal.id}
              href={`/signals/${signal.id}`}
              className="block p-6 bg-gc-bg-secondary border border-gc-border hover:border-gc-accent-blue transition-colors rounded"
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="font-heading text-lg text-gc-text-heading flex-1">
                  {signal.title}
                </h3>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-xs text-gc-text-subtitle">
                    {signal.id.toUpperCase()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-8 py-12">
        <div className="border-t border-gc-border" />
      </footer>
    </div>
  );
}