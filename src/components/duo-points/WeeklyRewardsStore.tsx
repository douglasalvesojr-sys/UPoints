"use client"

import { ArrowLeft, Gift, Sparkles, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reward } from "@/app/page"
import { useState } from "react"
import { CATEGORIES } from "@/lib/upoints-data"

interface WeeklyRewardsStoreProps {
  rewards: Reward[]
  totalPoints: number
  onBack: () => void
  onRedeem: (points: number, rewardName: string, category: string) => void
  userMode: "solo" | "group"
}

export function WeeklyRewardsStore({ rewards, totalPoints, onBack, onRedeem, userMode }: WeeklyRewardsStoreProps) {
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([])

  const handleRedeem = (reward: Reward) => {
    if (totalPoints >= reward.points && !redeemedRewards.includes(reward.id)) {
      onRedeem(reward.points, reward.name, reward.category)
      setRedeemedRewards([...redeemedRewards, reward.id])
    }
  }

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId)
  }

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
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Recompensas
            </h1>
            <p className="text-sm text-purple-300 font-semibold">Troque seus pontos 🎁</p>
          </div>
        </div>

        {/* Pontos disponíveis */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 border border-purple-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-200 font-semibold">Pontos Disponíveis</p>
              <p className="text-5xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                {totalPoints}
              </p>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/50">
              <Sparkles className="w-10 h-10 text-white stroke-[2px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de recompensas */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {rewards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center mb-4">
              <Gift className="w-12 h-12 text-purple-400 stroke-[1.5px]" />
            </div>
            <p className="text-purple-300 font-semibold text-center">Nenhuma recompensa disponível</p>
            <p className="text-sm text-purple-400 text-center mt-2">
              Adicione recompensas nas configurações
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {rewards.map((reward) => {
              const canRedeem = totalPoints >= reward.points
              const isRedeemed = redeemedRewards.includes(reward.id)
              const pointsNeeded = reward.points - totalPoints
              const categoryInfo = getCategoryInfo(reward.category)

              return (
                <div 
                  key={reward.id}
                  className={`p-6 rounded-3xl backdrop-blur-sm transition-all ${
                    isRedeemed
                      ? "bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-emerald-500/30"
                      : canRedeem
                      ? "bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/30 hover:border-purple-500/50"
                      : "bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      isRedeemed
                        ? "bg-gradient-to-br from-emerald-500 to-purple-500"
                        : canRedeem
                        ? "bg-gradient-to-br from-purple-500 to-orange-500"
                        : "bg-gradient-to-br from-slate-700 to-slate-600"
                    }`}>
                      {!canRedeem && !isRedeemed ? (
                        <Lock className="w-8 h-8 text-slate-400 stroke-[1.5px]" />
                      ) : (
                        <Gift className="w-8 h-8 text-white stroke-[2px]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${isRedeemed ? "text-purple-300 line-through" : "text-white"}`}>
                        {reward.name}
                      </h3>
                      <p className={`text-sm mt-1 ${isRedeemed ? "text-purple-400" : "text-purple-200"}`}>
                        {reward.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className={`px-3 py-1.5 rounded-full ${
                            isRedeemed
                              ? "bg-gradient-to-r from-emerald-500/30 to-purple-500/30 border border-emerald-500/30"
                              : canRedeem
                              ? "bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/20"
                              : "bg-slate-700/50 border border-slate-600"
                          }`}>
                            <span className={`text-sm font-bold ${
                              isRedeemed ? "text-purple-200" : canRedeem ? "text-white" : "text-slate-400"
                            }`}>
                              {reward.points} pontos
                            </span>
                          </div>

                          {categoryInfo && (
                            <span className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-purple-300 border border-slate-700 font-semibold">
                              {categoryInfo.icon} {categoryInfo.name}
                            </span>
                          )}
                        </div>

                        {isRedeemed ? (
                          <span className="text-sm text-emerald-400 font-bold">✓ Resgatado</span>
                        ) : canRedeem ? (
                          <Button
                            onClick={() => handleRedeem(reward)}
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-orange-500 hover:opacity-90 text-white rounded-xl font-bold shadow-lg"
                          >
                            Resgatar
                          </Button>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold">
                            Faltam {pointsNeeded} pts
                          </span>
                        )}
                      </div>

                      {reward.isShared && userMode === "group" && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                          Compartilhada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Dica */}
      <div className="p-6 border-t border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/20">
          <p className="text-sm text-purple-200 text-center font-semibold">
            💡 Complete tarefas para ganhar mais pontos e desbloquear recompensas
          </p>
        </div>
      </div>
    </div>
  )
}
