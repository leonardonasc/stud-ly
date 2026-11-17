
"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import { Monitor, Moon, Sun, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

const themes = [
  { value: "dark", label: "Escuro", icon: Moon },
  { value: "light", label: "Claro", icon: Sun },
  { value: "system", label: "Sistema", icon: Monitor },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const CurrentIcon =
    themes.find((item) => item.value === theme)?.icon ?? Moon

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Alterar tema"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <CurrentIcon className="size-4" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border bg-popover p-1.5 shadow-xl"
            >
              <p className="px-2.5 py-2 text-xs font-medium text-muted-foreground">
                Aparência
              </p>

              {themes.map((item) => {
                const Icon = item.icon
                const active = theme === item.value

                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      setTheme(item.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="size-4" />

                    <span className="flex-1 text-left">
                      {item.label}
                    </span>

                    {active && <Check className="size-3.5 text-primary" />}
                  </button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
