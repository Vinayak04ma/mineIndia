import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI LCA Tool - Life Cycle Assessment for Metallurgy",
  description:
    "AI-powered Life Cycle Assessment tool for advancing circularity and sustainability in metallurgy and mining",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen w-full overflow-x-hidden`}>
        <div className="flex min-h-screen w-full flex-col items-center">
          <div className="w-full max-w-[2000px] px-4 sm:px-6 lg:px-22">
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
          </div>
        </div>
      </body>
    </html>
  )
}
