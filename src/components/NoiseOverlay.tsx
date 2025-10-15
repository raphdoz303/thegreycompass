'use client';

import { useEffect, useState } from 'react';

export default function NoiseOverlay() {
  const [noisePattern, setNoisePattern] = useState('');

  useEffect(() => {
    // Generate random noise pattern on mount
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Generate random grayscale noise
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;     // Red
        data[i + 1] = noise; // Green
        data[i + 2] = noise; // Blue
        data[i + 3] = 255;   // Alpha (fully opaque)
      }

      ctx.putImageData(imageData, 0, 0);
      setNoisePattern(canvas.toDataURL());
    }
  }, []);

  if (!noisePattern) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `url(${noisePattern})`,
        backgroundRepeat: 'repeat',
        opacity: 0.1,
        mixBlendMode: 'overlay',
      }}
    />
  );
}