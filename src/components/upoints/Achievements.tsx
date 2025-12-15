"use client"

import { ArrowLeft, Trophy, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ACHIEVEMENTS } from "@/lib/upoints-data"

interface AchievementsProps {
  onBack: () => void
  userStats: {
    pointsEarned: number
    pointsRedeemed: number
    currentStreak: number
    tasksCompleted: number
    rewardsRedeemed: number
  }
}

export function Achievements({ onBack, userStats }: AchievementsProps) {
  const checkAchievement = (achievement: typeof ACHIEVEMENTS[0]) => {
    switch (achievement.type) {
      case "points_earned":
        return userStats.pointsEarned >= achievement.requirement
      case "points_redeemed":
        return userStats.pointsRedeemed >= achievement.requirement
      case "streak":
        return userStats.currentStreak >= achievement.requirement
      case "tasks_completed":
        return userStats.tasksCompleted >= achievement.requirement
      case "rewards_redeemed":
        return userStats.rewardsRedeemed >= achievement.requirement
      default:
        return false
    }
  }

  const getProgress = (achievement: typeof ACHIEVEMENTS[0]) => {
    let current = 0
    switch (achievement.type) {
      case "points_earned":
        current = userStats.pointsEarned
        break
      case "points_redeemed":
        current = userStats.pointsRedeemed
        break
      case "streak":
        current = userStats.currentStreak
        break
      case "tasks_completed":
        current = userStats.tasksCompleted
        break
      case "rewards_redeemed":
        current = userStats.rewardsRedeemed
        break
    }
    return Math.min((current / achievement.requirement) * 100, 100)
  }

  const unlockedCount = ACHIEVEMENTS.filter(checkAchievement).length

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
            <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Conquistas
            </h1>
            <p className="text-sm text-purple-300 font-semibold">
              {unlockedCount}/{ACHIEVEMENTS.length} desbloqueadas 🏆
            </p>
          </div>
        </div>

        {/* Progresso geral */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-purple-200 font-semibold">Progresso Total</p>
              <h2 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%
              </h2>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/50">
              <Trophy className="w-10 h-10 text-white stroke-[2px]" />
            </div>
          </div>
          <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
              style={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de conquistas */}
      <div className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto">
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = checkAchievement(achievement)
          const progress = getProgress(achievement)

          return (
            <div
              key={achievement.id}
              className={`p-5 rounded-3xl backdrop-blur-sm transition-all ${
                isUnlocked
                  ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                  : "bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0 ${
                    isUnlocked
                      ? `bg-gradient-to-br ${achievement.color}`
                      : "bg-gradient-to-br from-slate-700 to-slate-600"
                  }`}
                >
                  {isUnlocked ? achievement.icon : <Lock className="w-8 h-8 text-slate-400" />}
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isUnlocked ? "text-white" : "text-slate-400"}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm mt-1 ${isUnlocked ? "text-purple-200" : "text-slate-500"}`}>
                    {achievement.description}
                  </p>

                  {!isUnlocked && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400 font-semibold">
                          Progresso: {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${achievement.color} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {isUnlocked && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-white border border-yellow-500/30 font-bold">
                        ✓ Desbloqueada
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
