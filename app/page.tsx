import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LogoWall from "@/components/LogoWall";
import LiveCheck from "@/components/LiveCheck";
import Magnetic from "@/components/Magnetic";
import { Story } from "@/components/Story";
import HundredCustomers from "@/components/HundredCustomers";
import { Sections, JsonLd } from "@/components/Page";
import { HeroText, Rise } from "@/components/motion";
import DashboardScene from "@/components/DashboardScene";
import { SplitHeading, HorizontalPan, StickyStack, Spotlight, MarginIndex } from "@/components/effects";
import Benefits from "@/components/Benefits";
import ChatDemo from "@/components/ChatDemo";
import { AnswerOverResults, ClicksFall, LeverFound, LeverChosen, LeverConverted, LeverRemembered, MonthScene, WhoCards } from "@/components/creative";
import { loadDoc } from "@/lib/content";
import { renderDoc } from "@/lib/markdown";
import { readSteps, readStats } from "@/lib/parse";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Relay · Be the business your customers find first" }, description: site.description, alternates: { canonical: "/" },
  openGraph: { title: "Be the business your customers find first.", description: site.description, url: "/", images: [{ url: `/og?t=${encodeURIComponent("Be the business your customers find first.")}`, width: 1200, height: 630 }] },
};

export const DECK = [
  { src: "/figures/audit-elevator.jpg", alt: "Audit page: the thirty-second view, with the numbers panel", name: "The thirty-second view", caption: "One assertion, what it costs, the work, and the numbers. An owner who reads only this page has the whole audit." },
  { src: "/figures/audit-scorecard.jpg", alt: "Audit page: the scorecard of six checks", name: "The scorecard", caption: "Every check, colour-coded by what it costs: red today, ochre soon, ink hygiene, and what is working, kept." },
  { src: "/figures/audit-work.jpg", alt: "Audit page: the work, three fixes in order", name: "The work", caption: "Three fixes in order, each with its exact setting and the measurement before the next starts." },
  { src: "/figures/audit-plain.jpg", alt: "Audit page: everything in plain English", name: "In plain English", caption: "The whole audit in the words you would use to your co-founder. Always the second-last page." },
];


export default function Home() {
  const doc = loadDoc("page", "home")!;
  const r = renderDoc(doc.body);
  const sec = (re: RegExp) => r.sections.find((s) => re.test(s.heading))!;
  const storySec = sec(/end in an answer/);
  const hundredSec = sec(/100 of your customers/);
  const leversSec = sec(/where each one comes from/);
  const dashSec = sec(/own dashboard/);
  const processSec = sec(/twenty minutes on your own numbers/);
  const benefitsSec = sec(/changes for your business/);
  const stats = readStats("home", /end in an answer/).stats;
  const steps = readSteps("home", /twenty minutes on your own numbers/);
  const heroLede = r.heroHtml.replace(/<p>/, '<p class="lede">').replace(/<p class="cta">[^]*?<\/p>/, "").replace(/<p class="more">[^]*?<\/p>/, "");
  const beats = [
    { k: "answer", title: "Half of their searches now end in an answer, not a click.", body: "The businesses named in the answer get the call. The rest were never in the search.", figure: "51.5%", label: "of real searches now show an AI answer first.", source: stats[0].source, vis: <AnswerOverResults /> },
    { k: "clicks", title: "When the answer appears, clicks on the results under it fall from 15% to 8%.", body: "The traffic has not gone to a competitor's site. It has gone into the answer, and the answer names three or four businesses.", figure: "", label: "share of people who click a normal result: without an AI answer on the page, and with one.", source: stats[1].source, vis: <ClicksFall /> },
    { k: "ladder", title: "Small brands are named in one answer in nine.", body: "Household names, three in four. Mid-sized brands, nearly half. Every step between 11% and 44% is a customer question answered with your name instead of someone else's.", figure: "11%", label: "of relevant AI answers name a small brand. Household names: 73%.", source: stats[2].source },
  ];
  const levers = [...leversSec.html.matchAll(/<li><strong>([^<]+)<\/strong>: ([^]*?)<\/li>/g)].map((m) => { const [what, see] = m[2].split(/ You see it as /); return { name: m[1], what, see }; });
  const leverTail = leversSec.html.replace(/<ul>[^]*?<\/ul>/, "");
  const whoSec = sec(/any business that wants to be found/);
  const skip = [storySec.id, hundredSec.id, leversSec.id, dashSec.id, processSec.id, benefitsSec.id, whoSec.id];
  return (
    <>
      <Nav current="/" />
      <main id="main">
        <MarginIndex darkIds={[storySec.id]} items={[{ id: "check", label: "Check" }, { id: storySec.id, label: "The search" }, { id: hundredSec.id, label: "100 customers" }, { id: leversSec.id, label: "The levers" }, { id: dashSec.id, label: "Your dashboard" }, { id: processSec.id, label: "The month" }, { id: benefitsSec.id, label: "What you get" }]} />
        <section className="hero hero-v3"><div className="wrap">
          <HeroText h1={r.h1} ledeHtml={heroLede} cta="" ctaHref="#check" />
          <ChatDemo />
          <Spotlight><LiveCheck /></Spotlight>
        </div></section>
        <LogoWall />

        <section className="sec sec-story" id={storySec.id}>
          <h2 className="sr-only">{storySec.heading}</h2>
          <Story beats={beats} />
        </section>
        <section className="sec sec-hundred" id={hundredSec.id}><div className="wrap">
          <SplitHeading text={hundredSec.heading} />
          <p className="lede-sm">Say 100 people search for what you sell this week. Watch where they go.</p>
          <HundredCustomers />
        </div></section>

        <section className="sec sec-levers-h" id={leversSec.id}>
          <div className="wrap"><SplitHeading text={leversSec.heading} /></div>
          <HorizontalPan>
            {levers.map((l, i) => (
              <div className="hpan-panel" key={l.name}>
                <div><div className="hp-n">{String(i + 1).padStart(2, "0")} of {levers.length}</div><h3>{l.name}</h3><p>{l.what.split(". ")[0]}.</p>{[<LeverFound key="f" />, <LeverChosen key="c" />, <LeverConverted key="v" />, <LeverRemembered key="r" />][i]}</div>
                {l.see && <div className="see">You see it as {l.see}</div>}
              </div>
            ))}
          </HorizontalPan>
          <div className="wrap"><div className="body" dangerouslySetInnerHTML={{ __html: leverTail }} /></div>
        </section>

        <section className="sec sec-dash" id={dashSec.id}><div className="wrap">
          <SplitHeading text={dashSec.heading} />
          <p className="lede-sm">Everything we do for you lands on one page that is yours: the enquiries that came in this week against last week, what each campaign cost, the work done and what it changed, and what needs your decision. A sample week of it, below.</p>
          <DashboardScene />
          <p className="lede-sm">Every Monday a five-line note lands there too, and on WhatsApp and by email. A call whenever you ask.</p>
          <p className="more"><a href="/dashboard">What the dashboard shows</a></p>
        </div></section>

        <section className="sec sec-process-s" id={processSec.id}><div className="wrap">
          <SplitHeading text={processSec.heading} />
          <StickyStack cards={steps.map((s, i) => ({ k: String(i), title: s.title, body: s.body, scene: <MonthScene k={i} /> }))} />
          <div className="body" dangerouslySetInnerHTML={{ __html: processSec.html.replace(/<ol>[^]*?<\/ol>/, "") }} />
        </div></section>

        <section className="sec sec-benefits" id={benefitsSec.id}><div className="wrap">
          <SplitHeading text={benefitsSec.heading} />
          <Benefits />
        </div></section>

        <section className="sec sec-who" id="fit"><div className="wrap">
          <SplitHeading text={whoSec.heading} />
          <WhoCards />
          <div className="hold" dangerouslySetInnerHTML={{ __html: whoSec.html }} />
        </div></section>

        <Sections r={r} skip={skip} />
      </main>
      <Footer />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Relay", url: site.url }} />
    </>
  );
}
