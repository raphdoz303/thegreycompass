import HeroSection from '@/components/HeroSection';
import LatestSignalsSection from '@/components/LatestSignalsSection';
import WeeklySynthesisSection from '@/components/WeeklySynthesisSection';
import NewsletterSection from '@/components/NewsletterSection';
import FooterSection from '@/components/FooterSection';
import fs from 'fs';
import path from 'path';

// Load all signals from nested structure
function getAllSignals() {
  const signalsDirectory = path.join(process.cwd(), 'src/data/signals');
  const signals: any[] = [];
  
  try {
    const years = fs.readdirSync(signalsDirectory)
      .filter(item => {
        const fullPath = path.join(signalsDirectory, item);
        return fs.statSync(fullPath).isDirectory();
      });
    
    years.forEach(year => {
      const yearPath = path.join(signalsDirectory, year);
      const weeks = fs.readdirSync(yearPath)
        .filter(item => {
          const fullPath = path.join(yearPath, item);
          return fs.statSync(fullPath).isDirectory() && item.startsWith('week-');
        });
      
      weeks.forEach(week => {
        const weekPath = path.join(yearPath, week);
        const files = fs.readdirSync(weekPath)
          .filter(filename => 
            filename.endsWith('.json') && 
            !filename.includes('template') && 
            !filename.includes('week-meta')
          );
        
        files.forEach(filename => {
          const filePath = path.join(weekPath, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          
          if (fileContents.trim().length > 0) {
            try {
              signals.push(JSON.parse(fileContents));
            } catch (error) {
              console.error(`Failed to parse ${filename}:`, error);
            }
          }
        });
      });
    });
    
    return signals.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
  } catch (error) {
    console.error('Error loading signals:', error);
    return [];
  }
}

// Load week metadata for most recent week
function getMostRecentWeekMeta() {
  try {
    const signalsDirectory = path.join(process.cwd(), 'src/data/signals');
    const year = "2025"; // Hardcoded for now
    const yearPath = path.join(signalsDirectory, year);
    
    const weeks = fs.readdirSync(yearPath)
      .filter(item => {
        const fullPath = path.join(yearPath, item);
        return fs.statSync(fullPath).isDirectory() && item.startsWith('week-');
      })
      .sort()
      .reverse(); // Get most recent week
    
    if (weeks.length === 0) return null;
    
    const mostRecentWeek = weeks[0];
    const weekNumber = mostRecentWeek.replace('week-', '');
    const metaPath = path.join(yearPath, mostRecentWeek, 'week-meta.json');
    
    const fileContents = fs.readFileSync(metaPath, 'utf8');
    if (fileContents.trim().length > 0) {
      return {
        weekNumber,
        meta: JSON.parse(fileContents)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error loading week meta:', error);
    return null;
  }
}

export default function Home() {
  const signals = getAllSignals();
  const weekData = getMostRecentWeekMeta();

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <LatestSignalsSection signals={signals} />
      
      {weekData && (
        <WeeklySynthesisSection 
          weekNumber={weekData.weekNumber} 
          weekMeta={weekData.meta} 
        />
      )}
      
      <NewsletterSection />
      
      <FooterSection />
    </div>
  );
}