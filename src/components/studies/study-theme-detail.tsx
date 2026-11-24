"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StudyItemForm } from "./study-item-form"
import type { StudyItem, StudyTheme } from "./study-data"

type StudyThemeDetailProps = {
  theme: StudyTheme
  initialItems: StudyItem[]
}

export function StudyThemeDetail({
  theme,
  initialItems,
}: StudyThemeDetailProps) {
  const [items, setItems] = useState(initialItems)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <Link
        href="/themes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Todos os temas
      </Link>

      <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 className="font-heading text-xl font-semibold tracking-tight">
                {theme.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {theme.description}
              </p>
            </div>
          </div>
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => setFormOpen((current) => !current)}
          >
            <Plus className="size-4" aria-hidden="true" />
            Novo item
          </Button>
        </div>
      </section>

      {formOpen && (
        <StudyItemForm
          themeName={theme.name}
          onCancel={() => setFormOpen(false)}
          onSave={(draft) => {
            setItems((current) => [
              { id: crypto.randomUUID(), ...draft },
              ...current,
            ])
          }}
        />
      )}

      <section aria-labelledby="study-items-title" className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 px-1">
          <h3
            id="study-items-title"
            className="font-heading text-base font-semibold"
          >
            Itens de estudo
          </h3>
          <span className="text-xs text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "itens"}
          </span>
        </div>

        {items.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border bg-card p-4 shadow-sm"
              >
                <h4 className="font-medium">{item.name}</h4>
                {item.description ? (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                ) : (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Sem descrição.
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">
              Ainda não há itens neste tema. Adicione o primeiro para começar.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
