"use client"

import { useState, type FormEvent } from "react"
import { z } from "zod"
import { LoaderCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"

const studyItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o nome do item.")
    .max(100, "O nome deve ter até 100 caracteres."),
  description: z
    .string()
    .trim()
    .max(500, "A descrição deve ter até 500 caracteres."),
})

export type StudyItemDraft = z.infer<typeof studyItemSchema>

type StudyItemFormProps = {
  themeName: string
  onSave: (item: StudyItemDraft) => void
  onCancel: () => void
}

type FieldErrors = Partial<Record<keyof StudyItemDraft, string>>

const fieldClassName =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"

export function StudyItemForm({
  themeName,
  onSave,
  onCancel,
}: StudyItemFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = studyItemSchema.safeParse({ name, description })

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0],
        description: fieldErrors.description?.[0],
      })
      setStatus("error")
      return
    }

    setErrors({})
    setStatus("idle")
    setLoading(true)
    await new Promise<void>((resolve) => window.setTimeout(resolve, 250))
    onSave(result.data)
    setName("")
    setDescription("")
    setLoading(false)
    setStatus("success")
  }

  return (
    <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-semibold">Novo item</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Este item será adicionado a {themeName}.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Fechar formulário"
          onClick={onCancel}
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="study-item-name" className="text-sm font-medium">
            Nome do item <span className="text-destructive">*</span>
          </label>
          <input
            id="study-item-name"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setErrors((current) => ({ ...current, name: undefined }))
              setStatus("idle")
            }}
            placeholder="Ex.: Função afim"
            maxLength={100}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "study-item-name-error" : undefined}
            className={fieldClassName}
          />
          {errors.name && (
            <p
              id="study-item-name-error"
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="study-item-description"
            className="text-sm font-medium"
          >
            Descrição <span className="text-xs text-muted-foreground">(opcional)</span>
          </label>
          <textarea
            id="study-item-description"
            name="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
              setErrors((current) => ({ ...current, description: undefined }))
              setStatus("idle")
            }}
            placeholder="Adicione um breve contexto para este item."
            rows={3}
            maxLength={500}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "study-item-description-error" : undefined
            }
            className={`${fieldClassName} resize-y`}
          />
          {errors.description && (
            <p
              id="study-item-description-error"
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.description}
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Dados demonstrativos: os itens são mantidos apenas nesta tela.
        </p>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            disabled={loading}
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && (
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {loading ? "Adicionando..." : "Adicionar item"}
          </Button>
        </div>
      </form>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          Revise os campos indicados para continuar.
        </p>
      )}
      {status === "success" && (
        <p role="status" className="mt-3 text-sm text-primary">
          Item adicionado a {themeName}.
        </p>
      )}
    </section>
  )
}
