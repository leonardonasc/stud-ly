
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  Settings,
  UserRound,
  LogOut,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"

export function DashboardUserMenu() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignOut() {
    setLoading(true)

    try {
      await authClient.signOut()
      router.replace("/login/sign-in")
      router.refresh()
    } catch (error) {
      console.error("Erro ao sair da conta:", error)
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Abrir menu do perfil"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-accent"
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
          L
        </div>

        <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border bg-popover p-2 shadow-xl"
            >
              <div className="flex items-center gap-3 border-b px-2 py-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  L
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    Minha conta
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Estudante
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <UserRound className="size-4" />
                  Meu perfil
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="size-4" />
                  Configurações
                </Link>
              </div>

              <div className="mt-2 border-t pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                >
                  <LogOut className="size-4" />
                  {loading ? "Saindo..." : "Sair da conta"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
