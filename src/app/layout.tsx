import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "멘토링 뱅크 - AI 시대, 세대가 함께 성장하는 플랫폼",
  description: "시니어의 삶의 지혜와 청년의 디지털 역량을 교환하는 전국 단위 시민 멘토링 플랫폼. 스킬 교환을 넘어 고독 해소와 정서적 연결까지.",
  keywords: ["멘토링", "세대교류", "시간은행", "재능교환", "시니어", "청년", "시민사회", "공익활동", "AI", "고독해소"],
  authors: [{ name: "시민연결" }],
  openGraph: {
    title: "멘토링 뱅크 - AI 시대, 세대가 함께 성장하는 플랫폼",
    description: "스킬 교환을 넘어 고독 해소와 정서적 연결까지 - 전국 단위 세대 연결 멘토링 플랫폼",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
