"use client"

import { authClient } from "@/lib/auth-client"

export default function SessionTest() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) return <p>Carregando...</p>

  if (!session) return <p>Não autenticado</p>

  return (
    <div>
      <p>Olá, {session.user.name}!</p>
      <button onClick={() => authClient.signOut()}>
        Sair
      </button>
    </div>
  )
}