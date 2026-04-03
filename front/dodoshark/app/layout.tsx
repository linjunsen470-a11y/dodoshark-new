import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { fetchSanityData } from "@/lib/sanity.live";
import { buildPageMetadata } from "@/lib/seo";
import { SanityImage } from "@/lib/types/sanity";
import { type GlobalSettingsData } from "@/lib/global-settings";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await fetchSanityData<GlobalSettingsData | null>({ query: `*[_id == "globalSettings"][0]` });
  return buildPageMetadata({
    seo: globalSettings?.seo,
    fallbackTitle: 'DoDoShark - Professional Crushing & Grinding Equipment Manufacturer',
    fallbackDescription: 'DoDoShark Machinery, 20 years of focus on industrial crushing, grinding, and mixing equipment, serving 100+ countries.'
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSettings = await fetchSanityData<GlobalSettingsData | null>({ query: `*[_id == "globalSettings"][0]{..., logo{..., asset->}}` });
  const { isEnabled: isDraftMode } = await draftMode();

  const faviconUrl = globalSettings?.logo
    ? (globalSettings.logo as SanityImage).asset?.url || "/favicon.ico"
    : "/favicon.ico";

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href={faviconUrl} sizes="any" />
      </head>
      <body className="antialiased selection:bg-orange-100 selection:text-orange-900">
        <Header />
        <main id="main-content" className="relative min-h-[60vh] overflow-hidden">
          {children}
        </main>
        <Footer />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
