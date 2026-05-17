import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "AI SaaS Builder — Turn Ideas Into Startups",
  description:
    "Input your startup idea and get instant AI-generated business analysis, MVP roadmaps, and technical architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
