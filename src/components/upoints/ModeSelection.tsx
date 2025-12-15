"use client"

import { User, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModeSelectionProps {
  onSelectMode: (mode: "individual" | "shared") => void
}

export function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Título */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-3">
            Escolha seu Modo
          </h1>
          <p className="text-purple-300 font-semibold">
            Como você quer usar o UPoints?
          </p>
        </div>

        {/* Opções */}
        <div className="w-full space-y-4">
          {/* Modo Individual */}
          <button
            onClick={() => onSelectMode("individual")}
            className="w-full p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-white stroke-[2px]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-1">Modo Individual</h3>
                <p className="text-sm text-purple-200">
                  Gerencie suas tarefas e recompensas sozinho
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Modo Compartilhado */}
          <button
            onClick={() => onSelectMode("shared")}
            className="w-full p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-orange-500/10 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white stroke-[2px]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-1">Modo Compartilhado</h3>
                <p className="text-sm text-purple-200">
                  Compartilhe tarefas e recompensas com outras pessoas
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-purple-200 text-center">
            💡 Você pode alternar entre os modos a qualquer momento nas configurações
          </p>
        </div>
      </div>
    </div>
  )
}
