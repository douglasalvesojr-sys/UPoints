"use client"

import { Plus, Lightbulb, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Task, Reward } from "@/app/page"

interface PreCoupleSetupProps {
  onContinue: () => void
  tasks: Task[]
  rewards: Reward[]
  onAddTask: (task: Task) => void
  onAddReward: (reward: Reward) => void
  onSkipToSolo: () => void
  userMode: "individual" | "shared"
  hasStarted: boolean
}

export function PreCoupleSetup({ 
  onContinue, 
  tasks, 
  rewards, 
  onAddTask, 
  onAddReward, 
  onSkipToSolo,
  userMode,
  hasStarted
}: PreCoupleSetupProps) {
  // Adicionar tarefas padrão se não houver nenhuma
  const addDefaultTasks = () => {
    const defaultTasks: Task[] = [
      { id: "1", name: "Exercício matinal", description: "20 minutos de atividade física", points: 30, category: "Saúde" },
      { id: "2", name: "Beber 2L de água", description: "Mantenha-se hidratado durante o dia", points: 20, category: "Saúde" },
      { id: "3", name: "Meditação", description: "10 minutos de mindfulness", points: 25, category: "Bem-estar" },
      { id: "4", name: "Leitura", description: "Ler 30 minutos", points: 20, category: "Bem-estar" },
      { id: "5", name: "Gratidão diária", description: "Escrever 3 coisas pelas quais é grato", points: 15, category: "Gestos positivos" },
    ]
    defaultTasks.forEach(task => onAddTask(task))
  }

  const addDefaultRewards = () => {
    const defaultRewards: Reward[] = [
      { id: "1", name: "Filme especial", description: "Assistir seu filme favorito", points: 50, icon: "🎬", category: "Lazer" },
      { id: "2", name: "Pedido de comida", description: "Pedir sua comida favorita", points: 80, icon: "🍕", category: "Alimentação" },
      { id: "3", name: "Dia de descanso", description: "Um dia livre de tarefas", points: 100, icon: "🛋️", category: "Bem-estar" },
      { id: "4", name: "Compra especial", description: "Algo que você queira", points: 150, icon: "🎁", category: "Compras" },
    ]
    defaultRewards.forEach(reward => onAddReward(reward))
  }

  // Determinar texto do botão baseado no modo e estado
  const getButtonText = () => {
    if (userMode === "individual") {
      return hasStarted ? "Continuar Modo Individual" : "Começar Modo Individual"
    } else {
      return "Começar Modo Compartilhado"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
          Configure seu perfil
        </h1>
        <p className="text-sm text-purple-300 font-semibold mt-1">Adicione suas tarefas e recompensas pessoais</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Tarefas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Minhas Tarefas</h2>
            <Button 
              onClick={addDefaultTasks}
              variant="ghost" 
              size="sm"
              className="text-sm text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Padrões
            </Button>
          </div>

          {tasks.length === 0 ? (
            <div className="p-8 rounded-3xl border-2 border-dashed border-slate-700 text-center bg-slate-800/30">
              <p className="text-purple-300 text-sm font-semibold">Nenhuma tarefa adicionada ainda</p>
              <Button 
                onClick={addDefaultTasks}
                className="mt-4 bg-gradient-to-r from-emerald-500 to-purple-500 hover:opacity-90 text-white rounded-xl font-bold"
                size="sm"
              >
                Adicionar Tarefas Padrão
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-5 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50"
                >
                  <h3 className="font-bold text-white text-lg">{task.name}</h3>
                  <p className="text-sm text-purple-200 mt-1">{task.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-purple-500/20 text-white font-bold border border-emerald-500/20 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {task.points} pontos
                    </span>
                    <span className="text-xs text-purple-300 font-semibold">{task.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recompensas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Minhas Recompensas</h2>
            <Button 
              onClick={addDefaultRewards}
              variant="ghost" 
              size="sm"
              className="text-sm text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Padrões
            </Button>
          </div>

          {rewards.length === 0 ? (
            <div className="p-8 rounded-3xl border-2 border-dashed border-slate-700 text-center bg-slate-800/30">
              <p className="text-purple-300 text-sm font-semibold">Nenhuma recompensa adicionada ainda</p>
              <Button 
                onClick={addDefaultRewards}
                className="mt-4 bg-gradient-to-r from-purple-500 to-orange-500 hover:opacity-90 text-white rounded-xl font-bold"
                size="sm"
              >
                Adicionar Recompensas Padrão
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div 
                  key={reward.id}
                  className="p-5 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50"
                >
                  <div className="flex items-start gap-3">
                    {reward.icon && (
                      <span className="text-3xl">{reward.icon}</span>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{reward.name}</h3>
                      <p className="text-sm text-purple-200 mt-1">{reward.description}</p>
                      <span className="inline-block mt-3 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-white font-bold border border-purple-500/20">
                        {reward.points} pontos
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sugestões CTA */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-emerald-400 stroke-[2px] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white text-lg">Precisa de inspiração?</h3>
              <p className="text-sm text-purple-200 mt-1">
                Explore nossa biblioteca com sugestões de tarefas e recompensas
              </p>
              <Button 
                onClick={onContinue}
                variant="ghost"
                className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 px-0 font-bold"
              >
                Ver sugestões →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800">
        <Button 
          onClick={onSkipToSolo}
          className="w-full h-14 bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold shadow-xl text-lg"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  )
}
