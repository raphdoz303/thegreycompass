import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import SignalDetailPage from '@/components/SignalDetailPage';
import WeekSynthesisPage from '@/components/WeekSynthesisPage';

// Load single signal by ID from nested year/week structure
function getSignalById(id: string) {
  try {
    const parts = id.split('-');
    const weekNum = parts[1].replace('W', '');
    const year = "2025";
    
    const filePath = path.join(
      process.cwd(), 
      'src/data/signals', 
      year,
      `week-${weekNum}`,
      `${id}.json`
    );
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to load signal ${id}:`, error);
    return null;
  }
}

// Load week metadata
function getWeekMeta(weekNumber: string) {
  try {
    const year = "2025";
    const filePath = path.join(
      process.cwd(),
      'src/data/signals',
      year,
      `week-${weekNumber}`,
      'week-meta.json'
    );
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to load week meta for week-${weekNumber}:`, error);
    return null;
  }
}

// Get all signals for a specific week
function getSignalsForWeek(weekNumber: string) {
  try {
    const year = "2025";
    const weekPath = path.join(
      process.cwd(),
      'src/data/signals',
      year,
      `week-${weekNumber}`
    );
    
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
    }).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return signals;
  } catch (error) {
    console.error(`Failed to load signals for week-${weekNumber}:`, error);
    return [];
  }
}

export default async function SignalPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  // Check if this is a week synthesis page
  const isWeekSynthesis = id.startsWith('week-');
  
  if (isWeekSynthesis) {
    // WEEK SYNTHESIS: Load week meta and signals
    const weekNumber = id.replace('week-', '');
    const weekMeta = getWeekMeta(weekNumber);
    const signals = getSignalsForWeek(weekNumber);
    
    if (!weekMeta) {
      notFound();
    }
    
    return <WeekSynthesisPage weekNumber={weekNumber} weekMeta={weekMeta} signals={signals} />;
  }
  
  // SIGNAL DETAIL: Load individual signal
  const signal = getSignalById(id);
  
  if (!signal) {
    notFound();
  }

  return <SignalDetailPage signal={signal} />;
}