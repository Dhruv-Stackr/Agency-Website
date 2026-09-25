import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
export default function NotFound() {
  return (<><Nav /><main id="main"><section className="nf"><div className="wrap"><h1>This page is not here.</h1><p className="lede">Either it moved or it never existed. The audit finds these on your site too.</p><p className="more"><Link href="/">Home</Link> <span className="sep">·</span> <Link href="/book">{site.cta}</Link></p></div></section></main><Footer /></>);
}
