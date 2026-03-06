import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relay | Sprint-based marketing for Web3 and AI teams",
  description: "Relay embeds with early-stage Web3 and AI infra teams for 10–20 day sprints to lock your narrative, ship core assets, and set up a content engine you can run yourselves. Fixed price. No retainer.",
  icons: {
    icon: "/Favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
