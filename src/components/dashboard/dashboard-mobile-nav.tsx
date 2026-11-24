
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  UserRound,
} from "lucide-react"

const navigation = [
  { label: "Início", href: "/", icon: LayoutDashboard },
  { label: "Estudos", href: "/themes", icon: BookOpen },
  {
    label: "Estatísticas",
    href: "/statistics",
    icon: ChartNoAxesColumnIncreasing,
  },
  { label: "Perfil", href: "/profile", icon: UserRound },
]

export function DashboardMobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border/70 bg-background/85 p-2 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:hidden">
      <div className="flex h-14 items-center justify-around">
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
              className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl"
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              <Icon
                className={`relative z-10 size-5 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              />

              <span
                className={`relative z-10 text-[10px] font-medium ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
