import "./globals.css";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Muhammad Ahmad | DevOps Portfolio",
  description:
    "DevOps engineer focused on cloud-native delivery, GitHub Actions CI/CD, Kubernetes, and Terraform on Azure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
