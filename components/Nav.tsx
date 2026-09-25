import Link from "next/link";
import { site } from "@/lib/site";
export default function Nav({ current }: { current?: string }) {
  const links = site.nav.map((n) => (
    <li key={n.href}><Link className="link" href={n.href} aria-current={current === n.href ? "page" : undefined}>{n.label}</Link></li>
  ));
  return (
    <header className="nav">
      <a className="skip" href="#main">Skip to content</a>
      <div className="wrap">
        <Link className="logo" href="/" aria-label="Relay, home"><img src="/relay-logo.svg" alt="Relay" width="962" height="278" /></Link>
        <ul className="desktop">{links}</ul>
        <a className="btn sm cta-desktop" href={site.bookingUrl}>{site.cta}</a>
        <details className="navmenu">
          <summary>Menu</summary>
          <div className="panel"><ul>{links}</ul><a className="btn" href={site.bookingUrl}>{site.cta}</a></div>
        </details>
      </div>
    </header>
  );
}
