import Link from 'next/link';
import fs from 'fs';
import path from 'path';

// Load all signals grouped by week
function getSignalsByWeek() {
  const signalsDirectory = path.join(process.cwd(), 'src/data/signals');
  const weekGroups: Record<string, any> = {};
  
  try {
    // Read all year folders
    const years = fs.readdirSync(signalsDirectory)
      .filter(item => {
        const fullPath = path.join(signalsDirectory, item);
        return fs.statSync(fullPath).isDirectory();
      });
    
    // For each year, read weeks
    years.forEach(year => {
      const yearPath = path.join(signalsDirectory, year);
      const weeks = fs.readdirSync(yearPath)
        .filter(item => {
          const fullPath = path.join(yearPath, item);
          return fs.statSync(fullPath).isDirectory() && item.startsWith('week-');
        });
      
      weeks.forEach(week => {
        const weekPath = path.join(yearPath, week);
        
        // Try to load week metadata
        let weekMeta = null;
        try {
          const metaPath = path.join(weekPath, 'week-meta.json');
          const metaContents = fs.readFileSync(metaPath, 'utf8');
          if (metaContents.trim().length > 0) {
            weekMeta = JSON.parse(metaContents);
          }
        } catch (error) {
          // Week meta doesn't exist yet, that's ok
        }
        
        // Load all signals for this week
        const files = fs.readdirSync(weekPath)
          .filter(filename => 
            filename.endsWith('.json') && 
            !filename.includes('template') && 
            !filename.includes('week-meta')
          );
        
        const signals = files.map(filename => {
          const filePath = path.join(weekPath, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(fileContents);
        });
        
        // Create week key for grouping
        const weekKey = `${year}-${week}`;
        weekGroups[weekKey] = {
          meta: weekMeta,
          signals: signals.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
          year,
          weekNumber: week.replace('week-', '')
        };
      });
    });
    
    return weekGroups;
  } catch (error) {
    console.error('Error loading signals by week:', error);
    return {};
  }
}

export default function SignalsPage() {
  const weekGroups = getSignalsByWeek();
  
  // Sort weeks (newest first)
  const sortedWeeks = Object.keys(weekGroups).sort().reverse();

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-12">
        <Link 
          href="/" 
          className="font-mono text-xs text-gc-accent-blue hover:text-gc-text-heading transition-colors tracking-wide inline-block mb-6"
        >
          ← HOME
        </Link>
        
        <h1 className="font-heading text-4xl text-gc-text-heading mb-2">
          All Signals
        </h1>
        <p className="font-mono text-sm text-gc-text-subtitle tracking-wide">
          Structural shifts decoded — by week
        </p>
      </header>

      {/* Signals grouped by week */}
      <main className="max-w-5xl mx-auto space-y-16">
        {sortedWeeks.map(weekKey => {
          const group = weekGroups[weekKey];
          const { meta, signals, year, weekNumber } = group;
          
          return (
            <section key={weekKey}>
              {/* Week Header */}
              <div className="mb-8">
                <h2 className="font-heading text-2xl text-gc-text-heading mb-2">
                  Week {weekNumber} • {year}
                  {meta?.dateRange && (
                    <span className="font-mono text-sm text-gc-text-subtitle ml-3">
                      {new Date(meta.dateRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(meta.dateRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </h2>
                
                {/* Week Synthesis - Enhanced and Clickable */}
                {meta?.weekSynthesis && (
                  <Link 
                    href={`/signals/week-${weekNumber}`}
                    className="block mt-6 p-8 bg-gc-bg-primary border-l-4 border-gc-accent-blue rounded-lg shadow-lg hover:bg-gc-bg-secondary transition-colors"
                  >
                    <h3 className="font-heading text-base text-gc-accent-blue tracking-wide mb-4 uppercase">
                      {meta.weekSynthesis.title}
                    </h3>
                    <p className="font-body text-base text-gc-text-body leading-relaxed mb-4">
                      {meta.weekSynthesis.content.split('\n\n')[0]}
                    </p>
                    <span className="font-mono text-xs text-gc-accent-blue hover:text-gc-text-heading">
                      READ FULL SYNTHESIS →
                    </span>
                  </Link>
                )}
              </div>

              {/* Signal Cards - Minimal Design */}
              <div className="space-y-4">
                {signals.map((signal: any) => (
                  <Link 
                    key={signal.id}
                    href={`/signals/${signal.id}`}
                    className="block p-6 bg-gc-bg-secondary border border-gc-border hover:border-gc-accent-blue transition-colors rounded"
                  >
                    <div className="flex items-start justify-between gap-6">
                      {/* Left: Title */}
                      <h3 className="font-heading text-lg text-gc-text-heading flex-1">
                        {signal.title}
                      </h3>
                      
                      {/* Right: Metadata */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-mono text-xs text-gc-text-subtitle mb-2">
                          {signal.id.toUpperCase()}
                        </p>
                        <p className="font-mono text-xs text-gc-text-subtitle italic">
                          {signal.region}
                        </p>
                      </div>
                    </div>
                    
                    {/* Axes/Topics */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {signal.axes.map((axis: string) => (
                        <span 
                          key={axis}
                          className="font-mono text-xs text-gc-text-subtitle px-2 py-1 border border-gc-border rounded"
                        >
                          {axis}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Week Divider */}
              <div className="border-t border-gc-border opacity-40 mt-12" />
            </section>
          );
        })}
      </main>
    </div>
  );
}