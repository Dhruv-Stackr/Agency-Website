import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LogoWall from "@/components/LogoWall";
import IntakeForm from "@/components/IntakeForm";
import LiveCheck from "@/components/LiveCheck";
import ChatDemo from "@/components/ChatDemo";
import DashboardScene from "@/components/DashboardScene";
import Benefits from "@/components/Benefits";
import { Hero, Sections, JsonLd } from "@/components/Page";
import { Spotlight } from "@/components/effects";
import { WhoCards } from "@/components/creative";
import { MonthCalendar, CallScene, AuditPages, MondayNotes, ProposalPage } from "@/components/processScenes";
import { ModuleCards, ThreeChannels, TargetsScene, WorkLog, MapCard, PhoneDash, DecisionFlow, AccountsScene } from "@/components/dashScenes";
import { IconCards, ServiceScenes, Terminal, ComplaintCards, OwnersVsAgencies, Findings, StepsWithIcons, AddressCard, Roles, ServiceLedger, SocialScene, TeamScene, TwinProof } from "@/components/inner";
import { loadDoc, listSlugs, routeFor } from "@/lib/content";
import { renderDoc } from "@/lib/markdown";
import { site } from "@/lib/site";
import { readServices, readSteps, readBullets, readItems, readFindings } from "@/lib/parse";
import { allSources } from "@/lib/sources";

export const dynamicParams = false;
export function generateStaticParams() { return listSlugs("page").filter((s) => s !== "home").map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const doc = loadDoc("page", slug); if (!doc) return {};
  const route = routeFor(doc);
  return {
    title: { absolute: doc.fm.title }, description: doc.fm.description,
    alternates: { canonical: route, ...(slug === "india" ? { languages: { "en-IN": "/india", "en-US": "/dev-tools" } } : slug === "dev-tools" ? { languages: { "en-US": "/dev-tools", "en-IN": "/india" } } : {}) },
    openGraph: { title: doc.fm.title, description: doc.fm.description, url: route, images: [{ url: `/og?t=${encodeURIComponent(doc.fm.title.split(" · ")[0])}`, width: 1200, height: 630 }] },
  };
}

const stripList = (html: string) => html.replace(/<(ul|ol)>[^]*?<\/\1>/, "");
const stripFindings = (html: string) => html.replace(/<p class="(item|verify|fair)">[^]*?<\/p>\n?/g, "").replace(/<pre[^]*?<\/pre>\n?/g, "");

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const doc = loadDoc("page", slug); if (!doc) notFound();
  const r = renderDoc(doc.body);
  const route = routeFor(doc);
  const isNotes = slug === "notes";
  const email = /\{CONTACT_EMAIL\}/.test(site.contactEmail) ? undefined : site.contactEmail;

  let scene: ReactNode = undefined; let body: ReactNode;
  switch (slug) {
    case "services":
      scene = <div className="hero-card"><ServiceLedger /></div>;
      body = <>
        <section className="sec sec-services"><div className="wrap"><ServiceScenes services={readServices()} /></div></section>
        <Sections r={r} skip={r.sections.filter((x) => !/fit together/i.test(x.heading)).map((x) => x.id)} />
      </>;
      break;
    case "dashboard":
      scene = <PhoneDash />;
      body = <>
        <section className="sec sec-dash" id="module"><div className="wrap"><DashboardScene /></div></section>
        <Sections r={r}
          replace={{ "/What you see": <ModuleCards items={readItems("dashboard", /What you see/)} /> }}
          before={{ "/Why every Monday": <OwnersVsAgencies /> }}
          after={{ "/without opening it": <ThreeChannels />, "/A decision takes one tap": <DecisionFlow />, "/Only numbers with a target": <TargetsScene /> }} />
      </>;
      break;
    case "process":
      scene = <div className="hero-card"><MonthCalendar /></div>;
      body = <Sections r={r}
        before={{ "/The call": <CallScene /> }}
        replace={{ "/The call": <StepsWithIcons steps={readSteps("process", /The call/)} icons={["chat", "eye", "flag", "doc"]} /> }}
        transform={{ "/Month one": stripList, "/Three findings": stripFindings }}
        after={{ "/The proposal is one page": <ProposalPage />, "/Month one": <AuditPages items={readBullets("process", /Month one/)} />, "/Then the plan runs": <MondayNotes />, "/Three findings": <Findings items={readFindings("process", /Three findings/)} /> }} />;
      break;
    case "india":
      scene = <ChatDemo />;
      body = <Sections r={r}
        replace={{ "/owners tell us": <ComplaintCards items={readItems("india", /owners tell us/)} />, "/What changes for your business": <Benefits />, "/Where we are": <AddressCard email={email} /> }}
        transform={{ "/Month one is the audit": stripList }}
        before={{ "/any business that wants to be found": <WhoCards />, "/Month one is the audit": <StepsWithIcons steps={readSteps("india", /Month one is the audit/)} icons={["phone", "doc", "bolt", "eye"]} /> }}
        after={{ "/introduce you": <Spotlight><LiveCheck /></Spotlight> }} />;
      break;
    case "dev-tools":
      scene = <Terminal />;
      body = <Sections r={r}
        replace={{ "/audit checks first": <IconCards items={readBullets("dev-tools", /audit checks first/)} icons={["code", "search", "layers", "doc", "bolt", "sparkle"]} cols={3} /> }}
        transform={{ "/rest of the stack": stripList, "/Who this is for": stripList }}
        before={{ "/rest of the stack": <IconCards items={readBullets("dev-tools", /rest of the stack/)} icons={["doc", "target", "layers", "chat"]} cols={4} /> }}
        after={{ "/does what it asks": <TwinProof />, "/Who this is for": <StepsWithIcons steps={readSteps("dev-tools", /Who this is for/)} icons={["phone", "code", "bolt", "eye"]} /> }} />;
      break;
    case "about":
      scene = <div className="hero-card"><TeamScene /></div>;
      body = <>
        <LogoWall />
        <Sections r={r}
          replace={{ "/Where he has worked": <Roles items={readBullets("about", /Where he has worked/)} />, "/^Where\\.$": <MapCard email={email} /> }}
          after={{ "/What Relay is": <WorkLog />, "/accounts stay yours": <AccountsScene /> }} />
      </>;
      break;
    case "sources":
      body = <section className="sec sec-sources" id="list"><div className="wrap"><div className="sources">{allSources().map((g) => (<div className="src-group" key={g.page}><div className="mono">{g.page}</div><ul>{g.items.map((s: string) => <li key={s}>{s}</li>)}</ul></div>))}</div></div></section>;
      break;
    case "book":
      scene = <CallScene compact />;
      body = <>
        <Sections r={r} skip={["before-the-calendar"]} replace={{ "/What happens on the call": <><IconCards items={[{ title: "Your words first", text: "What made you take the call, and what working looks like, in a number." }, { title: "Live, on your data", text: "Search Console and the ad accounts you open, one live AI query for your category, the source of your homepage." }, { title: "The three biggest gaps", text: "The uncomfortable one first, each with what it costs you and the fair reason it might exist." }, { title: "The proposal, next business day", text: "One page: what we would do first, what we would measure before the second step, the fee said once, and the terms." }]} icons={["chat", "eye", "flag", "doc"]} cols={4} /><p className="lede-sm" style={{ marginTop: 18 }}>Nothing on the call touches your accounts. We only look at what you open.</p></> }} />
        <section className="sec sec-form" id="before-the-calendar"><div className="wrap"><h2>Before the calendar.</h2><IntakeForm /></div></section>
      </>;
      break;
    default:
      body = <Sections r={r} />;
  }

  return (
    <>
      <Nav current={isNotes ? "/notes" : route} />
      <main id="main">
        <Hero r={r} scene={scene} />
        {body}
      </main>
      <Footer />
      {slug === "about" && <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: "Dhruv Sharma", jobTitle: "Founder", worksFor: { "@type": "Organization", name: "Relay", url: site.url }, url: `${site.url}/about` }} />}
    </>
  );
}
