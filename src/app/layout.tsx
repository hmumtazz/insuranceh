import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RateNextDoor",
  description: "See what your Neighbors Pay for Home Insurance, then Pay Less",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://api.fontshare.com/v2/css?f[]=glacial-indifference@400,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased" style={{ backgroundColor: '#e9e9e9' }}>
        {children}
      </body>
    </html>
  );
}
