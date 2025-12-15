"use client"

import { Zap, TrendingUp, Target, Gift, Users, Settings, Flame, Trophy, CheckCircle, BarChart3, Crown, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

interface HomeDashboardProps {
  totalPoints: number
  onNavigate: (screen: string) => void
  userMode: "solo" | "group"
  onToggleMode: () => void
  isPremium: boolean
  tasksCount: number
  rewardsCount: number
  currentStreak: number
}

export function HomeDashboard({ 
  totalPoints, 
  onNavigate, 
  userMode, 
  onToggleMode, 
  isPremium,
  tasksCount,
  rewardsCount,
  currentStreak 
}: HomeDashboardProps) {
  const [activeTab, setActiveTab] = useState<"solo" | "group">(userMode)
  
  const userPoints = Math.floor(totalPoints * 0.6)
  const partnerPoints = totalPoints - userPoints
  const weeklyGoal = 200
  const progressPercent = (totalPoints / weeklyGoal) * 100

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header com tabs */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              UPoints
            </h1>
            <p className="text-sm text-purple-300 font-semibold flex items-center gap-2">
              Bem-vindo de volta! 🔥
              {isPremium && <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate("settings")}
            className="rounded-full text-purple-300 hover:text-white hover:bg-purple-500/20"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs Solo/Grupo */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => {
              setActiveTab("solo")
              if (userMode !== "solo") onToggleMode()
            }}
            className={`flex-1 h-12 rounded-xl font-bold transition-all ${
              activeTab === "solo"
                ? "bg-gradient-to-r from-emerald-500 to-purple-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-slate-800/50 text-purple-300 hover:bg-slate-800"
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Individual
          </Button>
          <Button
            onClick={() => {
              setActiveTab("group")
              onNavigate("group")
            }}
            className={`flex-1 h-12 rounded-xl font-bold transition-all ${
              activeTab === "group"
                ? "bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "bg-slate-800/50 text-purple-300 hover:bg-slate-800"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Compartilhado
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 pt-0 space-y-4 overflow-y-auto">
        {/* Pontos */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-emerald-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-purple-200 font-semibold">Seus Pontos</p>
              <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                {totalPoints}
              </h2>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-purple-500 flex items-center justify-center shadow-xl shadow-purple-500/50">
              <Zap className="w-10 h-10 text-white stroke-[2px] fill-white" />
            </div>
          </div>

          {/* Meta semanal */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-200 font-semibold">Meta Semanal</span>
              <span className="text-sm text-white font-bold">{totalPoints}/{weeklyGoal}</span>
            </div>
            <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-purple-500 transition-all duration-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sequência */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center shadow-xl shadow-orange-500/50">
              <Flame className="w-8 h-8 text-white stroke-[2px]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Sequência Atual</h3>
              <p className="text-3xl font-black bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                {currentStreak} dias 🔥
              </p>
            </div>
          </div>
        </div>

        {/* Limites gratuitos */}
        {!isPremium && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-5 h-5 text-yellow-400" />
              <p className="text-white font-bold text-sm">Plano Gratuito</p>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-purple-200">Tarefas</span>
                  <span className="text-xs text-white font-bold">{tasksCount}/3</span>
                </div>
                <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                    style={{ width: `${(tasksCount / 3) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-purple-200">Recompensas</span>
                  <span className="text-xs text-white font-bold">{rewardsCount}/3</span>
                </div>
                <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${(rewardsCount / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() => onNavigate("settings")}
              className="w-full mt-3 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white rounded-xl font-bold text-sm"
            >
              Assinar Premium
            </Button>
          </div>
        )}

        {/* Missão do dia */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            Missão do Dia
          </h3>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border border-emerald-500/20">
            <p className="font-bold text-white text-lg">Exercício matinal</p>
            <p className="text-sm text-purple-200 mt-2">Complete 20 minutos de atividade física</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-purple-500/30 text-white font-bold border border-emerald-500/30">
                +30 pontos
              </span>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-purple-500 hover:opacity-90 text-white rounded-xl font-bold shadow-lg"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Completar
              </Button>
            </div>
          </div>
        </div>

        {/* Ações rápidas - Grid 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate("tasks")}
            className="h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border border-emerald-500/30 hover:border-emerald-500/50 text-white rounded-3xl backdrop-blur-sm"
            variant="outline"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white stroke-[2px]" />
            </div>
            <span className="text-sm font-bold">Tarefas</span>
          </Button>

          <Button
            onClick={() => onNavigate("rewards")}
            className="h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-orange-500/30 hover:border-orange-500/50 text-white rounded-3xl backdrop-blur-sm"
            variant="outline"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Gift className="w-7 h-7 text-white stroke-[2px]" />
            </div>
            <span className="text-sm font-bold">Recompensas</span>
          </Button>

          <Button
            onClick={() => onNavigate("statistics")}
            className="h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/50 text-white rounded-3xl backdrop-blur-sm"
            variant="outline"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
              <BarChart3 className="w-7 h-7 text-white stroke-[2px]" />
            </div>
            <span className="text-sm font-bold">Estatísticas</span>
          </Button>

          <Button
            onClick={() => onNavigate("achievements")}
            className="h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 hover:border-yellow-500/50 text-white rounded-3xl backdrop-blur-sm"
            variant="outline"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Award className="w-7 h-7 text-white stroke-[2px]" />
            </div>
            <span className="text-sm font-bold">Conquistas</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
