"use client"

import { useEffect, useState } from "react"

export function CurrentDate() {
  const [date, setDate] = useState("")

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDate(
        new Intl.DateTimeFormat("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          timeZone: "America/Sao_Paulo",
        }).format(new Date()),
      )
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
      {date || "Jornada de hoje"}
    </p>
  )
}
