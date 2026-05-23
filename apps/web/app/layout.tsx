import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Assistente de Redes Sociais",
    template: "%s | Assistente de Redes Sociais"
  },
  description:
    "Fundacao para promocao de nome profissional com site, templates multicanal, compliance e mensuracao.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Assistente de Redes Sociais",
    description: "Presenca profissional com autoridade, compliance e governanca.",
    url: siteUrl,
    siteName: "Assistente de Redes Sociais",
    locale: "pt_BR",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GA_MEASUREMENT_ID;
  const gtmId = process.env.GTM_CONTAINER_ID;
  const metaPixelId = process.env.META_PIXEL_ID;

  return (
    <html lang="pt-BR">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
        <CookieConsent gaId={gaId} gtmId={gtmId} metaPixelId={metaPixelId} />
      </body>
    </html>
  );
}
