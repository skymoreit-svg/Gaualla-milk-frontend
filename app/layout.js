import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import TopBar from "./components/TopBar";
import MyNav from "./components/MyNav";
import BottomfixLinks from "./components/BottomfixLinks";
import NextLayout from "./NextLayout";

import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: " Gaualla Purity At It's Best",
  description:
    "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Toaster position="top-right" reverseOrder={false} />

        <Providers>
          <NextLayout>

            {children}
          </NextLayout>
        </Providers>

      </body>
    </html>
  );
}
