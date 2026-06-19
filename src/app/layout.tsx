import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";
import Header from "@/components/layout/Header";
import TrendingBar from "@/components/layout/TrendingBar";
import MobileMenu from "@/components/layout/MobileMenu";
import Footer from "@/components/layout/Footer";

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${notoSans.variable} ${notoSans.className}`}>
      <body className="font-sans antialiased min-h-screen bg-slate-50/20 text-slate-900 flex flex-col justify-between">
        <Providers>
          <div className="flex flex-col flex-grow">
            <Header />
            <TrendingBar />
            <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <MobileMenu />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
