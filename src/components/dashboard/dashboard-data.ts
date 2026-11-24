export const studyTopics = [
  {
    name: "Matemática",
    description: "Funções, geometria e preparação para o ENEM",
    items: 32,
    completed: 68,
    studied: "18 de 32 itens",
    icon: "math",
  },
  {
    name: "Biologia",
    description: "Citologia, genética e ecologia",
    items: 24,
    completed: 42,
    studied: "10 de 24 itens",
    icon: "biology",
  },
  {
    name: "Programação",
    description: "Lógica, TypeScript e desenvolvimento web",
    items: 18,
    completed: 83,
    studied: "15 de 18 itens",
    icon: "programming",
  },
] as const

export const ranking = [
  { place: 6, name: "Marina Costa", initials: "MC", xp: "13.240", current: false },
  { place: 7, name: "Pedro Alves", initials: "PA", xp: "12.860", current: false },
  { place: 8, name: "Leonardo Silva", initials: "LS", xp: "12.480", current: true },
  { place: 9, name: "Ana Beatriz", initials: "AB", xp: "12.110", current: false },
]

export const recentActivities = [
  {
    title: "Sessão de História concluída",
    detail: "Brasil República · 35 min",
    time: "Hoje, 17:42",
    xp: "+120 XP",
    type: "session",
  },
  {
    title: "Questão de trigonometria resolvida",
    detail: "Matemática · Exercícios",
    time: "Hoje, 16:10",
    xp: "+35 XP",
    type: "item",
  },
  {
    title: "Meta diária alcançada",
    detail: "2 horas de estudo",
    time: "Ontem, 20:18",
    xp: "+50 XP",
    type: "goal",
  },
  {
    title: "Revisão de genética finalizada",
    detail: "Biologia · Revisão",
    time: "Ontem, 18:05",
    xp: "+80 XP",
    type: "review",
  },
] as const

export function getActivityLevel(minutes: number) {
  if (minutes === 0) return 0
  if (minutes < 20) return 1
  if (minutes < 45) return 2
  if (minutes < 75) return 3
  return 4
}

export const activityDays = Array.from({ length: 16 * 7 }, (_, index) => {
  const week = Math.floor(index / 7)
  const day = index % 7
  const minutes =
    (week + day) % 5 === 0
      ? 0
      : ((week * 17 + day * 23 + week * day * 3) % 100) + 10

  return { minutes, level: getActivityLevel(minutes) }
})
