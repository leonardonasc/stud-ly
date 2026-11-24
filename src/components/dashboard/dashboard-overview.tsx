"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CurrentDate } from "./current-date"
import {
  ArrowRight,
  Atom,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Coins,
  Flame,
  Goal,
  Medal,
  Sparkles,
  Star,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  activityDays,
  ranking,
  recentActivities,
  studyTopics,
} from "./dashboard-data"

const cardClass =
  "min-w-0 rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/20 sm:p-5"

const statCards: {
  title: string
  value: string
  description: string
  icon: LucideIcon
  detail: string
}[] = [
  {
    title: "XP total",
    value: "12.480",
    description: "Experiência acumulada",
    icon: Zap,
    detail: "+320 esta semana",
  },
  {
    title: "Elo atual",
    value: "Platina III",
    description: "Seu nível de estudos",
    icon: Medal,
    detail: "Próximo: Platina II",
  },
  {
    title: "Moedas",
    value: "840",
    description: "Disponíveis para resgatar",
    icon: Coins,
    detail: "+45 nos últimos 7 dias",
  },
  {
    title: "Sequência",
    value: "12 dias",
    description: "Estudando sem parar",
    icon: Flame,
    detail: "Seu recorde é 18 dias",
  },
]

function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.article
      initial={{ opacity: 1, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className={`${cardClass} ${className}`}
    >
      {children}
    </motion.article>
  )
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={false}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full bg-primary"
      />
    </div>
  )
}

function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="font-heading text-base font-semibold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}

function WelcomeCard() {
  return (
    <AnimatedCard className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="size-5" aria-hidden="true" />
        </div>
        <div>
          <CurrentDate />
          <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            Olá, Leonardo!
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cada sessão conta. Continue no seu ritmo e chegue mais perto dos
            seus objetivos.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 self-start rounded-xl border bg-background px-3 py-2 sm:self-center">
        <Flame className="size-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-medium">12 dias</span>
        <span className="text-xs text-muted-foreground">de sequência</span>
      </div>
    </AnimatedCard>
  )
}

function StatCard({
  card,
  index,
}: {
  card: (typeof statCards)[number]
  index: number
}) {
  const Icon = card.icon

  return (
    <AnimatedCard
      delay={0.04 * (index + 1)}
      className="flex min-w-0 flex-col justify-between gap-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {card.title}
        </span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <div>
        <p className="font-heading text-2xl font-semibold tracking-tight">
          {card.value}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {card.description}
        </p>
      </div>
      <p className="border-t pt-3 text-[11px] font-medium text-primary">
        {card.detail}
      </p>
    </AnimatedCard>
  )
}

function DailyGoalCard() {
  return (
    <AnimatedCard delay={0.12}>
      <SectionHeading
        title="Meta diária"
        subtitle="Um passo de cada vez faz diferença."
        action={
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Goal className="size-4" aria-hidden="true" />
          </span>
        }
      />
      <div className="mb-2 flex items-end justify-between gap-3">
        <p className="font-heading text-2xl font-semibold tracking-tight">
          1h 35min <span className="text-sm font-normal text-muted-foreground">/ 2h</span>
        </p>
        <span className="pb-1 font-mono text-sm font-medium text-primary">
          79%
        </span>
      </div>
      <ProgressBar value={79} label="Meta diária concluída" />
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
        <Star className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-xs text-muted-foreground">
          Só mais <span className="font-medium text-foreground">25 minutos</span>{" "}
          para fechar sua meta de hoje.
        </p>
      </div>
    </AnimatedCard>
  )
}

const levelClasses = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
]

function ActivityHeatmap() {
  return (
    <AnimatedCard delay={0.16}>
      <SectionHeading
        title="Atividade de estudos"
        subtitle="Seus últimos 4 meses de consistência"
        action={
          <span className="rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground">
            16 semanas
          </span>
        }
      />
      <div className="overflow-x-auto pb-1">
        <div
          className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
          role="img"
          aria-label="Mapa de atividade de estudos dos últimos quatro meses"
        >
          {activityDays.map((day, index) => (
            <span
              key={index}
              title={`${day.minutes} min estudados`}
              className={`size-3 rounded-[3px] ${levelClasses[day.level]}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
        <span>Menos</span>
        <div className="flex items-center gap-[3px]" aria-hidden="true">
          {levelClasses.map((levelClass, index) => (
            <span
              key={index}
              className={`size-3 rounded-[3px] ${levelClass}`}
            />
          ))}
        </div>
        <span>Mais</span>
      </div>
    </AnimatedCard>
  )
}

function StudyTopicsCard() {
  return (
    <AnimatedCard delay={0.2}>
      <SectionHeading
        title="Meus estudos"
        subtitle="Retome de onde você parou"
        action={
          <Button asChild variant="ghost" size="sm">
            <Link href="/themes">
              Ver todos <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Button>
        }
      />
      <div className="space-y-3">
        {studyTopics.map((topic) => {
          const Icon =
            topic.icon === "math"
              ? Goal
              : topic.icon === "biology"
                ? Atom
                : Code2

          return (
            <Link
              key={topic.name}
              href="/themes"
              className="group flex min-w-0 items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                  <span className="truncate text-sm font-medium">
                    {topic.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {topic.completed}%
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {topic.description}
                </span>
                <span className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.span
                      initial={false}
                      animate={{ width: `${topic.completed}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="block h-full rounded-full bg-primary"
                    />
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {topic.studied}
                  </span>
                </span>
              </span>
              <ChevronRight
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>
    </AnimatedCard>
  )
}

function RankingCard() {
  return (
    <AnimatedCard delay={0.24}>
      <SectionHeading
        title="Ranking semanal"
        subtitle="Liga Platina · Semana 48"
        action={
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Trophy className="size-4" aria-hidden="true" />
          </span>
        }
      />
      <div className="mb-3 flex items-center justify-between rounded-xl bg-primary/10 px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            8
          </span>
          <span>
            <span className="block text-xs font-semibold">Sua posição</span>
            <span className="block text-[10px] text-muted-foreground">
              entre 128 estudantes
            </span>
          </span>
        </div>
        <span className="font-mono text-xs font-semibold text-primary">
          12.480 XP
        </span>
      </div>
      <ol className="space-y-1">
        {ranking.map((student) => (
          <li
            key={student.place}
            className={`flex items-center gap-2 rounded-lg px-2 py-2 ${
              student.current ? "bg-muted font-medium" : ""
            }`}
          >
            <span className="w-5 text-center font-mono text-[11px] text-muted-foreground">
              {student.place}
            </span>
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
                student.current
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {student.initials}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs">
              {student.name}
              {student.current && (
                <span className="ml-1 text-[10px] text-primary">(você)</span>
              )}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
              {student.xp}
            </span>
          </li>
        ))}
      </ol>
      <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
        <Link href="/statistics">
          Ver ranking completo{" "}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </Button>
    </AnimatedCard>
  )
}

const activityIcons: Record<(typeof recentActivities)[number]["type"], LucideIcon> =
  {
    session: BookOpen,
    item: Check,
    goal: Goal,
    review: Star,
  }

function RecentActivityCard() {
  return (
    <AnimatedCard delay={0.28} className="md:col-span-2 xl:col-span-3">
      <SectionHeading
        title="Atividade recente"
        subtitle="Suas últimas conquistas e sessões"
      />
      <ol className="grid gap-2 sm:grid-cols-2">
        {recentActivities.map((activity) => {
          const Icon = activityIcons[activity.type]

          return (
            <li
              key={activity.title}
              className="flex min-w-0 items-center gap-3 rounded-xl border p-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">
                  {activity.title}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                  {activity.detail} · {activity.time}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[10px] font-medium text-primary">
                {activity.xp}
              </span>
            </li>
          )
        })}
      </ol>
    </AnimatedCard>
  )
}

export function DashboardOverview() {
  return (
    <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5">
      <WelcomeCard />

      <section
        aria-label="Resumo de desempenho"
        className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
      >
        {statCards.map((card, index) => (
          <StatCard key={card.title} card={card} index={index} />
        ))}
      </section>

      <section
        aria-label="Meta e atividade de estudos"
        className="grid gap-3 sm:gap-4 lg:grid-cols-2"
      >
        <DailyGoalCard />
        <ActivityHeatmap />
      </section>

      <section
        aria-label="Estudos, ranking e atividade recente"
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
      >
        <StudyTopicsCard />
        <RankingCard />
        <RecentActivityCard />
      </section>
    </div>
  )
}
