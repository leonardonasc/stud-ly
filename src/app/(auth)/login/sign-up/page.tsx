"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError("")

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    })

    if (error) {
      setError(error.message ?? "Não foi possível criar a conta.")
    }

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleRegister} className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="text-2xl font-bold">Criar conta</h1>

        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>
    </main>
  )
}