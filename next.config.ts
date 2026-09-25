import type { NextConfig } from "next";

// Content-Security-Policy. Scripts and styles allow inline because Next.js and the html.js gate use inline
// snippets; every other origin is closed. When analytics is connected, add its hosts to script-src, connect-src and img-src.
const csp = [
  "default-src 'self'",
  // vercel.live is Vercel's preview toolbar, injected into preview deployments only; it never loads on the custom domain.
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' https://cdn.fontshare.com",
  "connect-src 'self' https://vercel.live",
  "frame-src https://vercel.live",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Content negotiation: a client that asks for text/markdown gets the page's Markdown twin
        // at the same URL. This is the agent-consumption mechanism, not a search signal.
        {
          source: "/:path*",
          has: [{ type: "header", key: "accept", value: "(.*text/markdown.*)" }],
          destination: "/md/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
