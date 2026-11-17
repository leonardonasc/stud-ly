import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  Caveat,
} from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "stud.ly — Tire suas ideias do papel",
  description: "Organize seus estudos e acompanhe sua evolução.",
}

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${caveat.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}