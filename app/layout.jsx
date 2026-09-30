import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import { profile } from "@/lib/data";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = `${profile.name} | ${profile.role}`;
const description =
  "Solutions architect designing cloud platforms on Azure, AWS and Cloudflare: infrastructure as code, Kubernetes, GitOps delivery and cost-aware architecture.";

export const metadata = {
  title,
  icons: { icon: "/favicon.svg" },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
