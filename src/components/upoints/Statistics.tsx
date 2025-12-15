"use client"

import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Award, Gift, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CATEGORIES } from "@/lib/upoints-data"
import { useState } from "react"

interface PointHistory {
  id: string
  date: string
  points: number
  type: "earned" | "redeemed"
  description: string
  category: string
}

interface StatisticsProps {
  onBack: () => void
  pointsHistory: PointHistory[]
  totalPointsEarned: number
  totalPointsRedeemed: number
  currentPoints: number
}

export function Statistics({ onBack, pointsHistory, totalPointsEarned, totalPointsRedeemed, currentPoints }: StatisticsProps) {
  const [activeTab, setActiveTab] = useState<"history" | "categories">("history")

  // Calcular estatísticas por categoria
  const categoryStats = CATEGORIES.map(cat => {
    const earned = pointsHistory
      .filter(h => h.type === "earned" && h.category === cat.id)
      .reduce((sum, h) => sum + h.points, 0)
    
    const redeemed = pointsHistory
      .filter(h => h.type === "redeemed" && h.category === cat.id)
      .reduce((sum, h) => sum + h.points, 0)

    return {
      ...cat,
      earned,
      redeemed,
      total: earned - redeemed
    }
  }).filter(cat => cat.earned > 0 || cat.redeemed > 0)
    .sort((a, b) => b.earned - a.earned)

  const maxEarned = Math.max(...categoryStats.map(c => c.earned), 1)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full text-purple-300 hover:text-white hover:bg-purple-500/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Estatísticas
            </h1>
            <p className="text-sm text-purple-300 font-semibold">Acompanhe sua evolução 📊</p>
          </div>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <p className="text-xs text-purple-200 font-semibold">Ganhos</p>
            </div>
            <p className="text-2xl font-black text-white">{totalPointsEarned}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-orange-400" />
              <p className="text-xs text-purple-200 font-semibold">Resgates</p>
            </div>
            <p className="text-2xl font-black text-white">{totalPointsRedeemed}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-purple-400" />
              <p className="text-xs text-purple-200 font-semibold">Saldo</p>
            </div>
            <p className="text-2xl font-black text-white">{currentPoints}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab("history")}
            className={`flex-1 h-12 rounded-xl font-bold transition-all ${
              activeTab === "history"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "bg-slate-800/50 text-purple-300 hover:bg-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Histórico
          </Button>
          <Button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 h-12 rounded-xl font-bold transition-all ${
              activeTab === "categories"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-slate-800/50 text-purple-300 hover:bg-slate-800"
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Categorias
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {activeTab === "history" ? (
          <div className="space-y-3">
            {pointsHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center mb-4">
                  <Calendar className="w-12 h-12 text-purple-400 stroke-[1.5px]" />
                </div>
                <p className="text-purple-300 font-semibold">Nenhum histórico ainda</p>
              </div>
            ) : (
              pointsHistory.map((item) => {
                const category = CATEGORIES.find(c => c.id === item.category)
                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-3xl backdrop-blur-sm border ${
                      item.type === "earned"
                        ? "bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30"
                        : "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg ${
                          item.type === "earned"
                            ? "bg-gradient-to-br from-emerald-500 to-green-500"
                            : "bg-gradient-to-br from-orange-500 to-red-500"
                        }`}
                      >
                        {item.type === "earned" ? (
                          <TrendingUp className="w-6 h-6 text-white" />
                        ) : (
                          <Gift className="w-6 h-6 text-white" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-bold">{item.description}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {category && (
                            <span className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-purple-300 border border-slate-700">
                              {category.icon} {category.name}
                            </span>
                          )}
                          <span className="text-xs text-purple-400">{item.date}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-2xl font-black ${
                            item.type === "earned" ? "text-emerald-400" : "text-orange-400"
                          }`}
                        >
                          {item.type === "earned" ? "+" : "-"}
                          {item.points}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {categoryStats.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center mb-4">
                  <BarChart3 className="w-12 h-12 text-purple-400 stroke-[1.5px]" />
                </div>
                <p className="text-purple-300 font-semibold">Nenhuma estatística ainda</p>
              </div>
            ) : (
              categoryStats.map((cat) => {
                const percentage = (cat.earned / maxEarned) * 100

                return (
                  <div
                    key={cat.id}
                    className="p-5 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}
                      >
                        {cat.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{cat.name}</h3>
                        <p className="text-purple-300 text-sm">
                          {cat.earned} pontos ganhos
                        </p>
                      </div>
                    </div>

                    {/* Barra de progresso */}
                    <div className="mb-3">
                      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Detalhes */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <p className="text-xs text-purple-200 font-semibold mb-1">Ganhos</p>
                        <p className="text-lg font-black text-emerald-400">+{cat.earned}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <p className="text-xs text-purple-200 font-semibold mb-1">Resgates</p>
                        <p className="text-lg font-black text-orange-400">-{cat.redeemed}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
