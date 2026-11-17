"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)
        setError("")

        const { error } = await authClient.signIn.email({
            email,
            password,
        })

        if (error) {
            setError(error.message ?? "Não foi possível entrar.")
        }

        setLoading(false)
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <form onSubmit={handleSignIn} className="flex w-full max-w-sm flex-col gap-4">
                <h1 className="text-2xl font-bold">Entrar</h1>

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
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </main>
    )
}