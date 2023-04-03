"use client"
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { getSession, SessionProvider } from "next-auth/react"


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
        </body>
    </html>
  )
}
