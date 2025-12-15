"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Heart, Sparkles, Coffee, MessageCircle, Dumbbell, Gift, Film, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Task, Reward } from "@/app/page"

interface SuggestionsLibraryProps {
  onBack: () => void
  onAddTask: (task: Task) => void
  onAddReward: (reward: Reward) => void
  onContinue: () => void
}

const suggestedTasks = [
  {
    id: "t1",
    name: "Caminhada juntos",
    description: "Façam uma caminhada de 20 minutos juntos",
    points: 15,
    category: "Saúde",
    icon: Dumbbell
  },
  {
    id: "t2",
    name: "Beber água",
    description: "Ambos bebam 2 litros de água hoje",
    points: 10,
    category: "Saúde",
    icon: Coffee
  },
  {
    id: "t3",
    name: "Conversa significativa",
    description: "10 minutos de conversa profunda sem distrações",
    points: 20,
    category: "Conexão",
    icon: MessageCircle
  },
  {
    id: "t4",
    name: "Elogio do dia",
    description: "Façam um elogio sincero um ao outro",
    points: 10,
    category: "Gestos positivos",
    icon: Heart
  },
  {
    id: "t5",
    name: "Fazer massagem",
    description: "Ofereça uma massagem relaxante ao parceiro",
    points: 25,
    category: "Bem-estar",
    icon: Sparkles
  },
  {
    id: "t6",
    name: "Atividade saudável juntos",
    description: "Pratiquem algum exercício ou atividade física",
    points: 20,
    category: "Saúde",
    icon: Dumbbell
  }
]

const suggestedRewards = [
  {
    id: "r1",
    name: "Jantar especial",
    description: "Um jantar romântico no restaurante favorito",
    points: 100,
    icon: UtensilsCrossed
  },
  {
    id: "r2",
    name: "Filme escolhido",
    description: "Escolha do filme da noite",
    points: 30,
    icon: Film
  },
  {
    id: "r3",
    name: "Massagem de 20min",
    description: "Receba uma massagem relaxante de 20 minutos",
    points: 50,
    icon: Sparkles
  },
  {
    id: "r4",
    name: "Pedido de comida",
    description: "Peça sua comida favorita",
    points: 40,
    icon: UtensilsCrossed
  },
  {
    id: "r5",
    name: "Surpresa especial",
    description: "Uma surpresa planejada pelo parceiro",
    points: 80,
    icon: Gift
  },
  {
    id: "r6",
    name: "Dia livre de tarefas",
    description: "Um dia sem responsabilidades domésticas",
    points: 60,
    icon: Heart
  }
]

export function SuggestionsLibrary({ onBack, onAddTask, onAddReward, onContinue }: SuggestionsLibraryProps) {
  const [addedTasks, setAddedTasks] = useState<string[]>([])
  const [addedRewards, setAddedRewards] = useState<string[]>([])

  const handleAddTask = (task: typeof suggestedTasks[0]) => {
    onAddTask({
      id: task.id,
      name: task.name,
      description: task.description,
      points: task.points,
      category: task.category
    })
    setAddedTasks([...addedTasks, task.id])
  }

  const handleAddReward = (reward: typeof suggestedRewards[0]) => {
    onAddReward({
      id: reward.id,
      name: reward.name,
      description: reward.description,
      points: reward.points
    })
    setAddedRewards([...addedRewards, reward.id])
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="rounded-full text-purple-300 hover:text-white hover:bg-purple-500/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Biblioteca de Sugestões
            </h1>
            <p className="text-sm text-purple-300 font-semibold">Adicione tarefas e recompensas prontas</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tasks" className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b border-slate-800 bg-transparent h-14 p-0">
          <TabsTrigger 
            value="tasks" 
            className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-purple-300 data-[state=active]:text-white"
          >
            Tarefas Sugeridas
          </TabsTrigger>
          <TabsTrigger 
            value="rewards"
            className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent text-purple-300 data-[state=active]:text-white"
          >
            Recompensas Sugeridas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="flex-1 p-6 space-y-3 overflow-y-auto mt-0">
          {suggestedTasks.map((task) => {
            const Icon = task.icon
            const isAdded = addedTasks.includes(task.id)
            
            return (
              <div 
                key={task.id}
                className="p-5 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-emerald-400 stroke-[2px]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{task.name}</h3>
                    <p className="text-sm text-purple-200 mt-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-purple-500/20 text-white font-bold border border-emerald-500/20">
                        {task.points} pontos
                      </span>
                      <span className="text-xs text-purple-300 font-semibold">{task.category}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddTask(task)}
                    disabled={isAdded}
                    className={`rounded-xl ${
                      isAdded 
                        ? "bg-slate-700 text-slate-400" 
                        : "bg-gradient-to-r from-emerald-500 to-purple-500 text-white hover:opacity-90"
                    }`}
                  >
                    {isAdded ? "Adicionado" : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )
          })}
        </TabsContent>

        <TabsContent value="rewards" className="flex-1 p-6 space-y-3 overflow-y-auto mt-0">
          {suggestedRewards.map((reward) => {
            const Icon = reward.icon
            const isAdded = addedRewards.includes(reward.id)
            
            return (
              <div 
                key={reward.id}
                className="p-5 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-orange-400 stroke-[2px]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{reward.name}</h3>
                    <p className="text-sm text-purple-200 mt-1">{reward.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-white font-bold border border-purple-500/20">
                        {reward.points} pontos
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddReward(reward)}
                    disabled={isAdded}
                    className={`rounded-xl ${
                      isAdded 
                        ? "bg-slate-700 text-slate-400" 
                        : "bg-gradient-to-r from-purple-500 to-orange-500 text-white hover:opacity-90"
                    }`}
                  >
                    {isAdded ? "Adicionado" : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )
          })}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800">
        <Button 
          onClick={onContinue}
          className="w-full h-12 bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold shadow-xl"
        >
          Continuar para Conexão
        </Button>
      </div>
    </div>
  )
}
