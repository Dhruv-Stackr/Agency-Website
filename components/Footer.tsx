import Link from "next/link";
import { site } from "@/lib/site";
export default function Footer() {
  const a = site.address;
  return (
    <footer className="foot">
      <div className="wrap">
        <ul className="ledger">
          <li><span>Email</span><span><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></span></li>
          <li><span>Address</span><span>{a.street}, {a.locality}, {a.region}, India</span></li>
        </ul>
        <p className="line">© 2026 Relay</p>
        <nav className="legal" aria-label="Legal and secondary">
          <Link href="/choose">Choose an agency</Link><Link href="/sources">Sources</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
