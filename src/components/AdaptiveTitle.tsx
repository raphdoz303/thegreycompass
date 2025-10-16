'use client';

import { useEffect, useRef, useState } from 'react';

interface AdaptiveTitleProps {
  title: string;
}

export default function AdaptiveTitle({ title }: AdaptiveTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(36); // Start at 36px (text-4xl)

  useEffect(() => {
    const adjustFontSize = () => {
      const element = titleRef.current;
      if (!element) return;

      let currentSize = 36; // Start size
      const minSize = 20; // Minimum font size
      const maxLines = 2;

      // Function to check if text fits in 2 lines
      const checkFit = (size: number) => {
        element.style.fontSize = `${size}px`;
        const lineHeight = size * 1.2; // line-height: 1.2
        const maxHeight = lineHeight * maxLines;
        return element.scrollHeight <= maxHeight + 2; // +2px tolerance
      };

      // Binary search for optimal font size
      while (currentSize > minSize && !checkFit(currentSize)) {
        currentSize -= 1;
      }

      setFontSize(currentSize);
    };

    adjustFontSize();
    
    // Re-adjust on window resize
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [title]);

  return (
    <h1
      ref={titleRef}
      className="font-heading text-gc-text-heading leading-tight flex-1"
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: '1.2',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {title}
    </h1>
  );
}