import Link from 'next/link';

// TypeScript interface for our Signal data structure
interface SignalCardProps {
  id: string;           // e.g., "gc-w41-03-eu-eco"
  week: string;         // e.g., "Week 41"
  date: string;         // e.g., "2025-10-12"
  number: string;       // e.g., "#3"
  title: string;
  region: string;       // e.g., "Europe"
  axes: string[];       // e.g., ["Economy", "Sanctions", "Governance"]
  structuralSignal: string;  // The one-line key insight
}

export default function SignalCard({ 
  id, 
  week, 
  date, 
  number, 
  title, 
  region, 
  axes, 
  structuralSignal 
}: SignalCardProps) {
  return (
    <Link href={`/signals/${id}`}>
      <div className="bg-gc-bg-secondary border border-gc-border p-6 hover:border-gc-accent-blue transition-colors cursor-pointer">
        {/* Top metadata bar */}
        <div className="flex items-center justify-between mb-4 font-mono text-xs text-gc-text-subtitle tracking-wider">
          <span>WEEKLY COMPASS · {date}</span>
          <span className="flex items-center gap-2">
            <span className="text-2xl">{number}</span>
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-heading text-2xl text-gc-text-heading mb-4 leading-tight">
          {title}
        </h3>
        
        {/* ID Code */}
        <div className="font-mono text-xs text-gc-text-subtitle mb-4 tracking-widest">
          {id.toUpperCase()}
        </div>
        
        {/* Structural Signal preview */}
        <p className="font-body text-sm text-gc-text-body mb-4 line-clamp-2">
          <span className="text-gc-accent-blue">STRUCTURAL SIGNAL:</span> {structuralSignal}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {axes.map((axis) => (
            <span key={axis} className="text-gc-text-subtitle uppercase tracking-wider">
              {axis}
            </span>
          ))}
          <span className="text-gc-text-subtitle">·</span>
          <span className="italic text-gc-text-subtitle">{region}</span>
        </div>
      </div>
    </Link>
  );
}