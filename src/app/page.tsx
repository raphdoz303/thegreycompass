import SignalCard from '@/components/SignalCard';
import signalData from '@/data/signals/gc-w41-03-eu-eco.json';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="font-heading text-4xl text-gc-text-heading mb-2">
          The Grey Compass
        </h1>
        <p className="font-mono text-sm text-gc-text-subtitle tracking-wide">
          Global System Signals — updated weekly
        </p>
        <p className="font-body text-xs text-gc-text-body mt-1">
          No ideology, no emotion — only structure and signal.
        </p>
      </header>

      {/* Signals Grid */}
      <main className="max-w-6xl mx-auto">
        <h2 className="font-mono text-xs text-gc-text-subtitle tracking-widest mb-6">
          LATEST SIGNALS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SignalCard
            id={signalData.id}
            week={signalData.week}
            date={signalData.date}
            number={signalData.number}
            title={signalData.title}
            region={signalData.region}
            axes={signalData.axes}
            structuralSignal={signalData.structuralSignal}
          />
        </div>
      </main>
    </div>
  );
}