import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Grey Compass",
  description: "Global System Signals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className="font-body bg-gc-bg-primary text-gc-text-body"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}