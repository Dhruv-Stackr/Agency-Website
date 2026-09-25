import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Reveal from "@/components/Reveal";
import Smooth from "@/components/Smooth";
import { JsonLd, orgJsonLd } from "@/components/Page";
import { site } from "@/lib/site";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Relay" },
  description: site.description,
  openGraph: { siteName: "Relay", type: "website", locale: "en_IN" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        {/* Switzer stays on the Fontshare CDN: the ITF licence needs written consent to self-host (decision, 16 Sep 2026).
            The @font-face rules are inlined (fetched from api.fontshare.com on 16 Sep 2026) so the text LCP does not wait on a CSS round trip. */}
        <link rel="preload" as="font" type="font/woff2" href="https://cdn.fontshare.com/wf/OYB4CXKJQXKTNSLJMTDQOIVUL2V5EL7S/WYO2P7DQVV5RNXGMCUO2HL4RJP4VFUAS/6XPIMU23OJVRY676OG5YVJMWEHWICATX.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="https://cdn.fontshare.com/wf/BLNB4FAQFNK56DWWNF7PMGTCOTZHOEII/ST3WKSSDMBK2MIQQO3MAVYWLF4FTOLFV/6IN5WOLRCYP4G4MOCOHOMXNON6Q7MDAR.woff2" crossOrigin="" />
        <style dangerouslySetInnerHTML={{ __html: "@font-face { font-family: 'Switzer'; src: url('https://cdn.fontshare.com/wf/BLNB4FAQFNK56DWWNF7PMGTCOTZHOEII/ST3WKSSDMBK2MIQQO3MAVYWLF4FTOLFV/6IN5WOLRCYP4G4MOCOHOMXNON6Q7MDAR.woff2') format('woff2'); font-weight: 400; font-display: swap; font-style: normal; }\n@font-face { font-family: 'Switzer'; src: url('https://cdn.fontshare.com/wf/OYB4CXKJQXKTNSLJMTDQOIVUL2V5EL7S/WYO2P7DQVV5RNXGMCUO2HL4RJP4VFUAS/6XPIMU23OJVRY676OG5YVJMWEHWICATX.woff2') format('woff2'); font-weight: 500; font-display: swap; font-style: normal; }\n@font-face { font-family: 'Switzer'; src: url('https://cdn.fontshare.com/wf/5SZVFDB7V52TI6ULVC6J3WQZQCIZVDV5/ODYPSTCUDMKSTYIPTV4CLQ7URIK7XYBJ/YS3VPNVO4B3TOJMEXDGFZQ4TLZGGSRZC.woff2') format('woff2'); font-weight: 600; font-display: swap; font-style: normal; }" }} />
        <JsonLd data={orgJsonLd} />
      </head>
      <body>
        {children}
        <Reveal />
        <Smooth />
      </body>
    </html>
  );
}
