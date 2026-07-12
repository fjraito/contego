import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Contego — AI UGC that doesn't look like AI",
  description:
    "Contego makes hyper-realistic AI UGC video for paid social. No plastic faces, no robotic voices. Just creator-style content that earns trust and converts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable}`}
    >
      <body className="font-body bg-[#0B0D0C] text-[#F4F1EA] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
