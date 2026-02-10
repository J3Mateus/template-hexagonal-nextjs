import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextAuthProvider } from "@/providers/SessionProvider";
import Protected from "./protected";
import { AppConfigSetup } from "@/@code/core/config/Appconfig/AppConfig";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Template",
  description: "Template frontend project with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          <AntdRegistry>
          <AppConfigSetup>
            <Protected>
              {children}
            </Protected>
            </AppConfigSetup>
          </AntdRegistry>
        </body>
      </html>
    </NextAuthProvider>
  );
}
