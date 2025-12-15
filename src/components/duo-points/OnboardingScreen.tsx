"use client"

import { Zap, Target, Trophy, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  onLogin: () => void
}

export function OnboardingScreen({ onLogin }: OnboardingScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <Zap className="w-12 h-12 text-white stroke-[2px] fill-white" />
          </div>
          <h1 className="text-5xl font-black text-center bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
            GRIT
          </h1>
          <p className="text-center text-purple-300 font-semibold">
            Transforme sua vida, um hábito por vez
          </p>
        </div>

        {/* Benefícios */}
        <div className="w-full space-y-4 mb-12">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
              <Target className="w-6 h-6 text-white stroke-[2px]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Hábitos Diários</h3>
              <p className="text-sm text-purple-200">Complete tarefas e construa rotinas poderosas</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
              <Flame className="w-6 h-6 text-white stroke-[2px]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Sistema de Pontos</h3>
              <p className="text-sm text-purple-200">Ganhe pontos e mantenha sua sequência ativa</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
              <Trophy className="w-6 h-6 text-white stroke-[2px]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Recompensas</h3>
              <p className="text-sm text-purple-200">Troque pontos por conquistas e prêmios especiais</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={onLogin}
          className="w-full h-16 text-lg font-bold bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 hover:opacity-90 transition-all text-white border-0 rounded-2xl shadow-2xl shadow-purple-500/50 hover:scale-105"
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Começar com Google
        </Button>

        <p className="mt-6 text-xs text-center text-purple-400">
          Ao continuar, você concorda com nossos Termos de Uso
        </p>
      </div>
    </div>
  )
}
