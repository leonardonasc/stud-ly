
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
    LayoutDashboard,
    BookOpen,
    ChartNoAxesColumnIncreasing,
    Settings,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"

type DashboardSidebarProps = {
    collapsed: boolean
    animationsReady: boolean
    onToggle: () => void
}

const navigation = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Meus estudos", href: "/themes", icon: BookOpen },
    {
        label: "Estatísticas",
        href: "/statistics",
        icon: ChartNoAxesColumnIncreasing,
    },
]

export function DashboardSidebar({
    collapsed,
    animationsReady,
    onToggle,
}: DashboardSidebarProps) {
    const pathname = usePathname()

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 76 : 256 }}
            transition={{
                duration: animationsReady ? 0.32 : 0,
                ease: [0.22, 1, 0.36, 1],
            }}
            data-sidebar-panel
            className="fixed inset-y-4 left-4 z-40 hidden h-[calc(100dvh-2rem)] shrink-0 flex-col rounded-2xl border bg-sidebar p-3 shadow-sm lg:flex"
        >
            <div className="flex h-12 items-center justify-between px-2">
                {!collapsed && (
                    <Link
                        href="/"
                        data-sidebar-collapsed-hidden
                        className="font-heading text-xl font-bold"
                    >
                        stud<span className="text-primary">.ly</span>
                    </Link>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={onToggle}
                    aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
                >
                    {collapsed ? (
                        <PanelLeftOpen className="size-4" />
                    ) : (
                        <PanelLeftClose className="size-4" />
                    )}
                </Button>
            </div>

            <div className="mt-8 flex-1 space-y-1">
                {!collapsed && (
                    <p
                        data-sidebar-collapsed-hidden
                        className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                        Workspace
                    </p>
                )}

                {navigation.map((item) => {
                    const Icon = item.icon
                    const active =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={`relative flex h-10 items-center justify-start gap-3 overflow-hidden rounded-lg px-3 text-sm transition-colors ${active
                                    ? "text-primary"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                }`}
                        >
                            {active && (
                                <motion.div
                                    layoutId="desktop-sidebar-active"
                                    className="absolute inset-0 rounded-lg bg-sidebar-accent"
                                    transition={{ duration: 0.2 }}
                                />
                            )}

                            <Icon className="relative z-10 size-4 shrink-0" />

                            {!collapsed && (
                                <span
                                    data-sidebar-collapsed-hidden
                                    className="relative z-10 whitespace-nowrap"
                                >
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </div>

            <div className="border-t border-sidebar-border pt-3">
                <Link
                    href="/settings"
                    title={collapsed ? "Configurações" : undefined}
                    className="flex h-10 items-center justify-start gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    <Settings className="size-4 shrink-0" />
                    {!collapsed && (
                        <span data-sidebar-collapsed-hidden>Configurações</span>
                    )}
                </Link>
            </div>
        </motion.aside>
    )
}
