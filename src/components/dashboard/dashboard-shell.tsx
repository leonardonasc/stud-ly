
"use client"

import {
  Suspense,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { DashboardMobileNav } from "./dashboard-mobile-nav"

type DashboardShellProps = {
  children: ReactNode
}

const SIDEBAR_STORAGE_KEY = "studly-sidebar-collapsed"
const sidebarPreferenceListeners = new Set<() => void>()

function subscribeToSidebarPreference(listener: () => void) {
  sidebarPreferenceListeners.add(listener)

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SIDEBAR_STORAGE_KEY || event.key === null) {
      listener()
    }
  }

  window.addEventListener("storage", handleStorage)

  return () => {
    sidebarPreferenceListeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function getSidebarCollapsedSnapshot() {
  return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true"
}

function getSidebarCollapsedServerSnapshot() {
  return false
}

function saveSidebarPreference(collapsed: boolean) {
  window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed))
  sidebarPreferenceListeners.forEach((listener) => listener())
}

export function DashboardShell({ children }: DashboardShellProps) {
  const collapsed = useSyncExternalStore(
    subscribeToSidebarPreference,
    getSidebarCollapsedSnapshot,
    getSidebarCollapsedServerSnapshot,
  )
  const [sidebarAnimationsReady, setSidebarAnimationsReady] = useState(false)

  useEffect(() => {
    const root = document.documentElement

    if (root.hasAttribute("data-sidebar-collapsed")) {
      const savedPreference = root.dataset.sidebarCollapsed === "true"
      if (savedPreference !== collapsed) return

      root.removeAttribute("data-sidebar-collapsed")
    }

    const frame = requestAnimationFrame(() => {
      setSidebarAnimationsReady(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [collapsed])

  return (
    <div className="min-h-dvh bg-background p-3 md:p-4">
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="fixed inset-y-4 left-4 z-40 hidden h-[calc(100dvh-2rem)] rounded-2xl border bg-sidebar shadow-sm lg:block"
            style={{ width: collapsed ? 76 : 256 }}
          />
        }
      >
        <DashboardSidebar
          collapsed={collapsed}
          animationsReady={sidebarAnimationsReady}
          onToggle={() => saveSidebarPreference(!collapsed)}
        />
      </Suspense>

      <div
        data-sidebar-content
        className={`flex min-w-0 flex-col ${
          sidebarAnimationsReady
            ? "transition-[margin-left] duration-300 ease-in-out"
            : ""
        } ${collapsed ? "lg:ml-[92px]" : "lg:ml-[272px]"}`}
      >
        <Suspense fallback={<div aria-hidden="true" className="h-12" />}>
          <DashboardHeader />
        </Suspense>

        <main className="flex-1 px-1 pb-24 pt-6 md:px-2 lg:pb-6">
          {children}
        </main>
      </div>

      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="fixed bottom-5 left-1/2 z-50 h-[4.5rem] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border/70 bg-background/85 p-2 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:hidden"
          />
        }
      >
        <DashboardMobileNav />
      </Suspense>
    </div>
  )
}
