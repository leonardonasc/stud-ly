
"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeSelector } from "./theme-selector"
import { DashboardUserMenu } from "./dashboard-user-menu"

const pageInfo = [
    {
        match: "/",
        title: "Dashboard",
        description: "Acompanhe sua evolução nos estudos.",
    },
    {
        match: "/themes",
        title: "Meus estudos",
        description: "Organize seus temas e conteúdos.",
    },
    {
        match: "/statistics",
        title: "Estatísticas",
        description: "Visualize seu progresso e desempenho.",
    },
    {
        match: "/profile",
        title: "Meu perfil",
        description: "Gerencie suas informações pessoais.",
    },
    {
        match: "/settings",
        title: "Configurações",
        description: "Personalize sua experiência.",
    },
]

export function DashboardHeader() {
    const pathname = usePathname()

    const currentPage =
        pageInfo.find((page) =>
            page.match === "/"
                ? pathname === "/"
                : pathname.startsWith(page.match),
        ) ?? pageInfo[0]

    return (
        <header className="flex min-h-12 items-center justify-between gap-4 px-1 md:px-2">
            <div className="min-w-0">
                <h1 className="font-heading text-lg font-semibold tracking-tight">
                    {currentPage.title}
                </h1>

                <p className="hidden text-xs text-muted-foreground sm:block">
                    {currentPage.description}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
                <ThemeSelector />

                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Notificações"
                >
                    <Bell className="size-4" />
                </Button>

                <div className="mx-1 h-6 w-px bg-border" />

                <DashboardUserMenu />
            </div>
        </header>
    )
}
