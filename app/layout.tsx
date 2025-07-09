import { Roboto } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"], // також підтримка української кирилиці
  weight: ["400", "500", "700"], // потрібні товщини
  variable: "--font-roboto", // змінна CSS
  display: "swap", // рекомендація для швидкого рендеру
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Application for creating and viewing notes",
  icons: {
    icon: "/notehub.svg",
  },
  openGraph: {
    title: "NoteHub",
    description: "Application for creating and viewing notes",
    url: "https://08-zustand-puce.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main className="layout-main">{children}</main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
