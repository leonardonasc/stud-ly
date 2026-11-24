
export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-heading text-2xl font-semibold">
                    Meu perfil
                </h1>
                <p className="text-sm text-muted-foreground">
                    Gerencie suas informações pessoais e sua conta.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-xl font-semibold text-primary">
                        L
                    </div>

                    <div>
                        <h2 className="font-medium">Minha conta</h2>
                        <p className="text-sm text-muted-foreground">
                            Estudante
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
