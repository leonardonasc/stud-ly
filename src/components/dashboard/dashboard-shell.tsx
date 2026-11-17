
"use client"

import { useState, type ReactNode } from "react"

import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { DashboardMobileNav } from "./dashboard-mobile-nav"

type DashboardShellProps = {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-dvh gap-4 bg-background p-3 md:p-4">
      <DashboardSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />

        <main className="flex-1 px-1 pb-24 pt-6 md:px-2 md:pb-6">
          {children}
        </main>
      </div>

      <DashboardMobileNav />
    </div>
  )
}
