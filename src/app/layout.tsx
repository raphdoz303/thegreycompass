import type { Metadata } from "next";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import NavigationHeader from "@/components/NavigationHeader"; // ADD THIS
import { Analytics } from "@vercel/analytics/next";


export const metadata: Metadata = {
  title: "The Grey Compass",
  description: "Global System Signals",
  icons: {
    icon: '/logo/logo.png', // Uses existing logo as favicon
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-gc-bg-primary text-gc-text-body" suppressHydrationWarning>
        <NoiseOverlay />
        <NavigationHeader /> {/* ADD THIS */}
        <div className="pt-16"> {/* ADD padding-top to account for fixed header */}
          {children}
        </div>
      </body>
    </html>
  );
}