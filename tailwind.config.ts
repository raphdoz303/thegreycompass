import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Grey Compass color system
        'gc-bg-primary': '#1E242A',      // matte graphite
        'gc-bg-secondary': '#252A2E',    // slightly lighter
        'gc-text-body': '#F3F5F7',       // soft white
        'gc-text-heading': '#EDF1F7',    // bright neutral white
        'gc-text-subtitle': '#F0F2F4',   // intermediary grey
        'gc-accent-blue': '#6B93B8',     // cold signal blue
        'gc-accent-red': '#B45A4A',      // declassified red
        'gc-border': '#3B4148',          // low-contrast graphite
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['IBM Plex Mono', 'monospace'],
        'mono': ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;