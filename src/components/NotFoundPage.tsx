'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NotFoundPageProps {
  message?: string;
  subtitle?: string;
}

export default function NotFoundPage({ 
  message = "SIGNAL LOST",
  subtitle = "This frequency isn't transmitting yet. The page may still be under verification."
}: NotFoundPageProps) {
  const [coordinateOpacity, setCoordinateOpacity] = useState(1);

  // Blinking coordinate animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinateOpacity(prev => prev === 1 ? 0.3 : 1);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
      {/* Radial gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, #252A2E 0%, #1E242A 100%)'
        }}
      />
      
      {/* Faint grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(107, 147, 184, 0.1) 25%, rgba(107, 147, 184, 0.1) 26%, transparent 27%, transparent 74%, rgba(107, 147, 184, 0.1) 75%, rgba(107, 147, 184, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(107, 147, 184, 0.1) 25%, rgba(107, 147, 184, 0.1) 26%, transparent 27%, transparent 74%, rgba(107, 147, 184, 0.1) 75%, rgba(107, 147, 184, 0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-16 flex justify-center">
          <Link href="/" className="group">
            <img 
              src="/logo/logo.png" 
              alt="The Grey Compass" 
              width="48"
              height="48"
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                animation: 'rotate 8s linear infinite'
              }}
            />
          </Link>
        </div>

        {/* Signal Lost Title */}
        <h1 className="font-heading text-5xl text-gc-text-heading mb-4 tracking-wide">
          {message}
        </h1>

        {/* Divider */}
        <div className="w-48 h-px bg-gc-border opacity-30 mx-auto mb-6" />

        {/* Description */}
        <p className="font-body text-base text-gc-text-subtitle mb-10 leading-relaxed max-w-md mx-auto">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center mb-14">
          <Link
            href="/signals"
            className="px-6 py-3 border border-gc-accent-blue text-gc-accent-blue font-heading text-sm rounded-lg hover:bg-gc-accent-blue hover:text-gc-bg-primary transition-all duration-300 flex items-center gap-2"
          >
            <span>🧭</span>
            <span>Return to Signals</span>
          </Link>
          
          <Link
            href="/"
            className="px-6 py-3 border border-gc-border text-gc-text-subtitle font-heading text-sm rounded-lg hover:border-gc-accent-blue hover:text-gc-accent-blue transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Coordinates */}
        <div 
          className="inline-block"
          style={{ 
            opacity: coordinateOpacity,
            transition: 'opacity 1.2s ease-in-out'
          }}
        >
          <p className="font-mono text-xs text-gc-text-subtitle mb-1 uppercase tracking-wider">
            Field Location:
          </p>
          <a 
            href="https://www.google.com/maps/place/48%C2%B052'36.0%22S+123%C2%B023'36.0%22W/@-48.8874616,-123.3816979,13.12z/data=!4m4!3m3!8m2!3d-48.876667!4d-123.393333?hl=en&entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gc-text-subtitle hover:text-gc-accent-blue transition-colors no-underline cursor-default hover:cursor-pointer"
          >
            48°52′S · 123°23′W
          </a>
        </div>
      </div>

      {/* CSS for logo rotation */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}