"use client"
import { useSession } from "next-auth/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const finishedLoading = (session.status !== "loading");
  return (
    <div>
      {finishedLoading ? children : (<h1 className="text-center">Loading...</h1>)}
    </div>

  )
}
