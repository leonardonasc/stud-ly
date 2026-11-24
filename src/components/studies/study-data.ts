export const studyThemes = [
  {
    id: "matematica",
    name: "Matemática",
    description: "Funções, geometria e preparação para o ENEM",
    icon: "calculator",
  },
  {
    id: "biologia",
    name: "Biologia",
    description: "Citologia, genética e ecologia",
    icon: "biology",
  },
  {
    id: "programacao",
    name: "Programação",
    description: "Lógica, TypeScript e desenvolvimento web",
    icon: "code",
  },
] as const

export type StudyTheme = (typeof studyThemes)[number]

export type StudyItem = {
  id: string
  name: string
  description: string
}

export const initialItemsByTheme: Record<StudyTheme["id"], StudyItem[]> = {
  matematica: [
    {
      id: "math-linear-functions",
      name: "Função afim",
      description: "Gráficos, coeficientes e interpretação de problemas.",
    },
    {
      id: "math-quadratic-equations",
      name: "Equação do segundo grau",
      description: "Fórmula de Bhaskara e relações entre raízes.",
    },
  ],
  biologia: [
    {
      id: "biology-cell-structure",
      name: "Estrutura celular",
      description: "Organelas e diferenças entre células eucariontes.",
    },
    {
      id: "biology-genetics",
      name: "Genética mendeliana",
      description: "Leis de Mendel e cruzamentos genéticos.",
    },
  ],
  programacao: [
    {
      id: "programming-typescript-types",
      name: "Tipos e interfaces",
      description: "Modelagem de dados com TypeScript.",
    },
    {
      id: "programming-react-state",
      name: "Estado em React",
      description: "Fundamentos de estado e atualização de componentes.",
    },
  ],
}
