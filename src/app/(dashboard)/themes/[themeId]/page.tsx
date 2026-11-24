import { Suspense } from "react"
import { notFound } from "next/navigation"

import { StudyThemeDetail } from "@/components/studies/study-theme-detail"
import {
  initialItemsByTheme,
  studyThemes,
} from "@/components/studies/study-data"

type ThemePageProps = {
  params: Promise<{ themeId: string }>
}

export function generateStaticParams() {
  return studyThemes.map((theme) => ({ themeId: theme.id }))
}

async function ThemePageContent({ params }: ThemePageProps) {
  const { themeId } = await params
  const theme = studyThemes.find((item) => item.id === themeId)

  if (!theme) notFound()

  return (
    <StudyThemeDetail
      theme={theme}
      initialItems={initialItemsByTheme[theme.id]}
    />
  )
}

export default function ThemePage({ params }: ThemePageProps) {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          className="rounded-2xl border bg-card p-5 text-sm text-muted-foreground shadow-sm"
        >
          Carregando tema...
        </div>
      }
    >
      <ThemePageContent params={params} />
    </Suspense>
  )
}
