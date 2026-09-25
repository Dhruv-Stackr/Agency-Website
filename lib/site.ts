// Site configuration. Email and booking link supplied by Dhruv on 24 Sep 2026.
// Analytics: none at launch by decision (24 Sep 2026); the privacy page says so. Add the GA4 id here when he supplies one.
// scripts/check-config.mjs warns while anything is unresolved and fails when RELAY_LAUNCH=1.
export const site = {
  name: "Relay",
  url: "https://we-relay.studio",
  title: "Relay, an agency you can watch working",
  description:
    "SEO and AI search, paid campaigns, web, social and creative, done by one team and visible to you in your own dashboard, any hour, without asking. Gurugram. Month-to-month.",
  bookingUrl: "https://cal.com/dhruv-sharma-xjz5mg/30min",
  contactEmail: "hello@we-relay.studio",
  address: { street: "WeWork Forum", locality: "Gurugram", region: "Haryana", country: "IN" },
  ga4MeasurementId: "",
  analyticsStatement:
    "This site runs no analytics today: no Google Analytics, no cookies set by us, no visitor tracking. If we add measurement, this page will say what is collected and why.",
  cta: "Book the free 20-minute audit call",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
  ],
} as const;

export const isPlaceholder = (v: string) => /^\{[A-Z_]+\}$/.test(v);
