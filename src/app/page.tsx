"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/duo-points/SplashScreen"
import { AuthScreen } from "@/components/upoints/AuthScreen"
import { ModeSelection } from "@/components/upoints/ModeSelection"
import { SharedModeSetup } from "@/components/upoints/SharedModeSetup"
import { PreCoupleSetup } from "@/components/duo-points/PreCoupleSetup"
import { SuggestionsLibrary } from "@/components/duo-points/SuggestionsLibrary"
import { HomeDashboard } from "@/components/duo-points/HomeDashboard"
import { TaskListScreen } from "@/components/duo-points/TaskListScreen"
import { WeeklyRewardsStore } from "@/components/duo-points/WeeklyRewardsStore"
import { CoupleTimeline } from "@/components/duo-points/CoupleTimeline"
import { SettingsScreen } from "@/components/duo-points/SettingsScreen"
import { SubscriptionPaywall } from "@/components/upoints/SubscriptionPaywall"
import { GroupManagement } from "@/components/upoints/GroupManagement"
import { Statistics } from "@/components/upoints/Statistics"
import { Achievements } from "@/components/upoints/Achievements"
import { OwnerPanel } from "@/components/upoints/OwnerPanel"
import { GroupSelector } from "@/components/upoints/GroupSelector"
import { FREE_LIMITS, OWNER_CODE } from "@/lib/upoints-data"

export type Task = {
  id: string
  name: string
  description: string
  points: number
  category: string
  completed?: boolean
  isShared?: boolean
}

export type Reward = {
  id: string
  name: string
  description: string
  points: number
  icon?: string
  category: string
  isShared?: boolean
}

interface Member {
  id: string
  name: string
  points: number
  isOwner?: boolean
}

interface PointHistory {
  id: string
  date: string
  points: number
  type: "earned" | "redeemed"
  description: string
  category: string
}

interface Group {
  id: string
  name: string
  code: string
  members: Member[]
  tasks: Task[]
  rewards: Reward[]
  totalPoints: number
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<string>("splash")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userTasks, setUserTasks] = useState<Task[]>([])
  const [userRewards, setUserRewards] = useState<Reward[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [userMode, setUserMode] = useState<"individual" | "shared">("individual")
  const [isPremium, setIsPremium] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [showOwnerPanel, setShowOwnerPanel] = useState(false)
  const [sharedGroupCode, setSharedGroupCode] = useState<string>("")
  const [hasStartedIndividual, setHasStartedIndividual] = useState(false)
  
  // Grupos compartilhados
  const [userGroups, setUserGroups] = useState<Group[]>([])
  const [currentGroupId, setCurrentGroupId] = useState<string>("")

  // Grupo
  const [groupMembers, setGroupMembers] = useState<Member[]>([
    { id: "1", name: "Você", points: 0, isOwner: true }
  ])

  // Estatísticas
  const [pointsHistory, setPointsHistory] = useState<PointHistory[]>([])
  const [totalPointsEarned, setTotalPointsEarned] = useState(0)
  const [totalPointsRedeemed, setTotalPointsRedeemed] = useState(0)
  const [tasksCompleted, setTasksCompleted] = useState(0)
  const [rewardsRedeemed, setRewardsRedeemed] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedAuth = localStorage.getItem("upoints_authenticated")
    const savedMode = localStorage.getItem("upoints_mode")
    const savedHasStarted = localStorage.getItem("upoints_has_started_individual")
    const savedGroups = localStorage.getItem("upoints_groups")
    const savedTasks = localStorage.getItem("upoints_individual_tasks")
    const savedRewards = localStorage.getItem("upoints_individual_rewards")
    const savedPoints = localStorage.getItem("upoints_individual_points")
    const savedPremium = localStorage.getItem("upoints_premium")

    if (savedAuth === "true") {
      setIsAuthenticated(true)
      
      if (savedPremium === "true") {
        setIsPremium(true)
      }

      // Carregar grupos se existirem
      if (savedGroups) {
        const groups = JSON.parse(savedGroups)
        setUserGroups(groups)
      }

      // Restaurar modo individual se já iniciado
      if (savedHasStarted === "true") {
        setHasStartedIndividual(true)
        setUserMode("individual")
        if (savedTasks) setUserTasks(JSON.parse(savedTasks))
        if (savedRewards) setUserRewards(JSON.parse(savedRewards))
        if (savedPoints) setTotalPoints(JSON.parse(savedPoints))
        
        // Ir direto para o dashboard individual
        setTimeout(() => setCurrentScreen("dashboard"), 1500)
      } else if (savedGroups) {
        // Tem grupos mas não tem modo individual iniciado
        const groups = JSON.parse(savedGroups)
        if (groups.length > 0) {
          setTimeout(() => setCurrentScreen("groupSelection"), 1500)
        } else {
          setTimeout(() => setCurrentScreen("modeSelection"), 1500)
        }
      } else {
        // Não tem nada iniciado, ir para seleção de modo
        setTimeout(() => setCurrentScreen("modeSelection"), 1500)
      }
    }
  }, [])

  // Salvar autenticação
  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem("upoints_authenticated", "true")
    navigateTo("modeSelection")
  }

  // Simula navegação entre telas
  const navigateTo = (screen: string) => {
    setCurrentScreen(screen)
  }

  // Verificar limites gratuitos
  const canAddTask = () => {
    if (isPremium) return true
    return userTasks.length < FREE_LIMITS.tasks
  }

  const canAddReward = () => {
    if (isPremium) return true
    return userRewards.length < FREE_LIMITS.rewards
  }

  // Adicionar tarefa
  const handleAddTask = (task: Task) => {
    if (!canAddTask()) {
      setShowPaywall(true)
      return
    }
    const newTasks = [...userTasks, task]
    setUserTasks(newTasks)
    
    if (userMode === "individual") {
      localStorage.setItem("upoints_individual_tasks", JSON.stringify(newTasks))
    }
  }

  // Adicionar recompensa
  const handleAddReward = (reward: Reward) => {
    if (!canAddReward()) {
      setShowPaywall(true)
      return
    }
    const newRewards = [...userRewards, reward]
    setUserRewards(newRewards)
    
    if (userMode === "individual") {
      localStorage.setItem("upoints_individual_rewards", JSON.stringify(newRewards))
    }
  }

  // Completar tarefa
  const handleCompleteTask = (points: number, taskName: string, category: string) => {
    const newPoints = totalPoints + points
    setTotalPoints(newPoints)
    setTotalPointsEarned(totalPointsEarned + points)
    setTasksCompleted(tasksCompleted + 1)

    // Salvar pontos
    if (userMode === "individual") {
      localStorage.setItem("upoints_individual_points", JSON.stringify(newPoints))
    } else {
      // Atualizar pontos do grupo
      const updatedGroups = userGroups.map(g => {
        if (g.id === currentGroupId) {
          return { ...g, totalPoints: newPoints }
        }
        return g
      })
      setUserGroups(updatedGroups)
      localStorage.setItem("upoints_groups", JSON.stringify(updatedGroups))
    }

    // Adicionar ao histórico
    const historyItem: PointHistory = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR"),
      points,
      type: "earned",
      description: taskName,
      category
    }
    setPointsHistory([historyItem, ...pointsHistory])

    // Atualizar pontos do membro atual (modo compartilhado)
    if (userMode === "shared") {
      setGroupMembers(members =>
        members.map(m =>
          m.isOwner ? { ...m, points: m.points + points } : m
        )
      )
    }
  }

  // Resgatar recompensa
  const handleRedeemReward = (points: number, rewardName: string, category: string) => {
    if (totalPoints >= points) {
      const newPoints = totalPoints - points
      setTotalPoints(newPoints)
      setTotalPointsRedeemed(totalPointsRedeemed + points)
      setRewardsRedeemed(rewardsRedeemed + 1)

      // Salvar pontos
      if (userMode === "individual") {
        localStorage.setItem("upoints_individual_points", JSON.stringify(newPoints))
      } else {
        // Atualizar pontos do grupo
        const updatedGroups = userGroups.map(g => {
          if (g.id === currentGroupId) {
            return { ...g, totalPoints: newPoints }
          }
          return g
        })
        setUserGroups(updatedGroups)
        localStorage.setItem("upoints_groups", JSON.stringify(updatedGroups))
      }

      // Adicionar ao histórico
      const historyItem: PointHistory = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("pt-BR"),
        points,
        type: "redeemed",
        description: rewardName,
        category
      }
      setPointsHistory([historyItem, ...pointsHistory])

      // Atualizar pontos do membro atual (modo compartilhado)
      if (userMode === "shared") {
        setGroupMembers(members =>
          members.map(m =>
            m.isOwner ? { ...m, points: Math.max(0, m.points - points) } : m
          )
        )
      }
    }
  }

  // Gerenciar grupo
  const handleAddMember = (name: string) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name,
      points: 0,
      isOwner: false
    }
    setGroupMembers([...groupMembers, newMember])
  }

  const handleRemoveMember = (id: string) => {
    setGroupMembers(groupMembers.filter(m => m.id !== id))
  }

  // Assinatura
  const handleSubscribe = (planId: string) => {
    // Aqui você implementaria a lógica de pagamento real
    console.log("Assinando plano:", planId)
    setIsPremium(true)
    setShowPaywall(false)
    localStorage.setItem("upoints_premium", "true")
    alert("Assinatura realizada com sucesso! 🎉")
  }

  const handleRestorePurchase = () => {
    const code = prompt("Digite o código de restauração:")
    if (code === OWNER_CODE) {
      setIsPremium(true)
      setShowPaywall(false)
      setShowOwnerPanel(true)
      localStorage.setItem("upoints_premium", "true")
    } else if (code) {
      // Aqui você implementaria a lógica de restauração real com códigos promocionais
      // Verificar se o código é válido e não foi usado
      const isValidPromoCode = code.startsWith("UP-")
      if (isValidPromoCode) {
        setIsPremium(true)
        setShowPaywall(false)
        localStorage.setItem("upoints_premium", "true")
        alert("Código promocional ativado com sucesso! 🎉")
      } else {
        alert("Código inválido. Tente novamente.")
      }
    }
  }

  // Modo compartilhado
  const handleModeSelection = (mode: "individual" | "shared") => {
    setUserMode(mode)
    localStorage.setItem("upoints_mode", mode)
    
    if (mode === "shared") {
      navigateTo("sharedSetup")
    } else {
      navigateTo("setup")
    }
  }

  const handleSharedSetupComplete = (inviteCode: string) => {
    setSharedGroupCode(inviteCode)
    
    // Criar novo grupo
    const newGroup: Group = {
      id: Date.now().toString(),
      name: `Grupo ${inviteCode}`,
      code: inviteCode,
      members: [{ id: "1", name: "Você", points: 0, isOwner: true }],
      tasks: [],
      rewards: [],
      totalPoints: 0
    }
    
    const updatedGroups = [...userGroups, newGroup]
    setUserGroups(updatedGroups)
    setCurrentGroupId(newGroup.id)
    setUserMode("shared")
    localStorage.setItem("upoints_groups", JSON.stringify(updatedGroups))
    localStorage.setItem("upoints_mode", "shared")
    
    navigateTo("setup")
  }

  // Iniciar modo individual
  const handleStartIndividual = () => {
    if (userMode === "individual") {
      setHasStartedIndividual(true)
      localStorage.setItem("upoints_has_started_individual", "true")
      localStorage.setItem("upoints_individual_tasks", JSON.stringify(userTasks))
      localStorage.setItem("upoints_individual_rewards", JSON.stringify(userRewards))
      navigateTo("dashboard")
    } else {
      // Modo compartilhado - salvar no grupo atual
      const updatedGroups = userGroups.map(g => {
        if (g.id === currentGroupId) {
          return {
            ...g,
            tasks: userTasks,
            rewards: userRewards
          }
        }
        return g
      })
      setUserGroups(updatedGroups)
      localStorage.setItem("upoints_groups", JSON.stringify(updatedGroups))
      navigateTo("dashboard")
    }
  }

  // Selecionar grupo
  const handleSelectGroup = (groupId: string) => {
    const group = userGroups.find(g => g.id === groupId)
    if (group) {
      setCurrentGroupId(groupId)
      setUserMode("shared")
      setUserTasks(group.tasks)
      setUserRewards(group.rewards)
      setTotalPoints(group.totalPoints)
      setGroupMembers(group.members)
      localStorage.setItem("upoints_mode", "shared")
      navigateTo("dashboard")
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={() => navigateTo(isAuthenticated ? "modeSelection" : "auth")} />
      case "auth":
        return <AuthScreen onLogin={handleLogin} />
      case "modeSelection":
        return <ModeSelection onSelectMode={handleModeSelection} />
      case "sharedSetup":
        return (
          <SharedModeSetup
            onBack={() => navigateTo("modeSelection")}
            onComplete={handleSharedSetupComplete}
          />
        )
      case "groupSelection":
        return (
          <GroupSelector
            groups={userGroups}
            onSelectGroup={handleSelectGroup}
            onCreateNew={() => navigateTo("modeSelection")}
          />
        )
      case "setup":
        return (
          <PreCoupleSetup
            onContinue={() => navigateTo("suggestions")}
            tasks={userTasks}
            rewards={userRewards}
            onAddTask={handleAddTask}
            onAddReward={handleAddReward}
            onSkipToSolo={handleStartIndividual}
            userMode={userMode}
            hasStarted={hasStartedIndividual}
          />
        )
      case "suggestions":
        return (
          <SuggestionsLibrary
            onBack={() => navigateTo("setup")}
            onAddTask={handleAddTask}
            onAddReward={handleAddReward}
            onContinue={() => navigateTo("dashboard")}
          />
        )
      case "dashboard":
        return (
          <HomeDashboard
            totalPoints={totalPoints}
            onNavigate={navigateTo}
            userMode={userMode === "shared" ? "group" : "solo"}
            onToggleMode={() => {
              if (userMode === "individual") {
                if (userGroups.length > 0) {
                  navigateTo("groupSelection")
                } else {
                  navigateTo("modeSelection")
                }
              } else {
                setUserMode("individual")
              }
            }}
            isPremium={isPremium}
            tasksCount={userTasks.length}
            rewardsCount={userRewards.length}
            currentStreak={currentStreak}
          />
        )
      case "tasks":
        return (
          <TaskListScreen
            tasks={userTasks}
            onBack={() => navigateTo("dashboard")}
            onCompleteTask={handleCompleteTask}
            userMode={userMode === "shared" ? "group" : "solo"}
          />
        )
      case "rewards":
        return (
          <WeeklyRewardsStore
            rewards={userRewards}
            totalPoints={totalPoints}
            onBack={() => navigateTo("dashboard")}
            onRedeem={handleRedeemReward}
            userMode={userMode === "shared" ? "group" : "solo"}
          />
        )
      case "group":
        return (
          <GroupManagement
            onBack={() => navigateTo("dashboard")}
            members={groupMembers}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
          />
        )
      case "statistics":
        return (
          <Statistics
            onBack={() => navigateTo("dashboard")}
            pointsHistory={pointsHistory}
            totalPointsEarned={totalPointsEarned}
            totalPointsRedeemed={totalPointsRedeemed}
            currentPoints={totalPoints}
          />
        )
      case "achievements":
        return (
          <Achievements
            onBack={() => navigateTo("dashboard")}
            userStats={{
              pointsEarned: totalPointsEarned,
              pointsRedeemed: totalPointsRedeemed,
              currentStreak,
              tasksCompleted,
              rewardsRedeemed
            }}
          />
        )
      case "timeline":
        return <CoupleTimeline onBack={() => navigateTo("dashboard")} />
      case "settings":
        return (
          <SettingsScreen
            onBack={() => navigateTo("dashboard")}
            onRestorePurchase={handleRestorePurchase}
          />
        )
      default:
        return <SplashScreen onComplete={() => navigateTo("auth")} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {renderScreen()}
      
      {/* Paywall */}
      {showPaywall && (
        <SubscriptionPaywall
          onClose={() => setShowPaywall(false)}
          onSubscribe={handleSubscribe}
          onRestore={handleRestorePurchase}
        />
      )}

      {/* Owner Panel */}
      {showOwnerPanel && (
        <div className="fixed inset-0 z-50">
          <OwnerPanel onBack={() => setShowOwnerPanel(false)} />
        </div>
      )}
    </div>
  )
}
