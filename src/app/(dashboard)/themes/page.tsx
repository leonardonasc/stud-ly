import Link from "next/link"
import {
  ArrowRight,
  Atom,
  Calculator,
  Code2,
  type LucideIcon,
} from "lucide-react"

import { studyThemes, initialItemsByTheme } from "@/components/studies/study-data"

const themeIcons: Record<(typeof studyThemes)[number]["icon"], LucideIcon> = {
  calculator: Calculator,
  biology: Atom,
  code: Code2,
}

export default function ThemesPage() {
  return (
    <section aria-labelledby="themes-title" className="mx-auto max-w-7xl">
      <div className="mb-4">
        <h2 id="themes-title" className="font-heading text-lg font-semibold">
          Seus temas
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Escolha um tema para ver e organizar seus itens de estudo.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {studyThemes.map((theme) => {
          const Icon = themeIcons[theme.icon]
          const itemCount = initialItemsByTheme[theme.id].length

          return (
            <li key={theme.id}>
              <Link
                href={`/themes/${theme.id}`}
                className="group flex h-full flex-col rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/30 sm:p-5"
              >
                <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-base font-semibold">
                  {theme.name}
                </h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  {theme.description}
                </p>
                <span className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                  <span>
                    {itemCount} {itemCount === 1 ? "item" : "itens"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-primary">
                    Abrir tema
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
