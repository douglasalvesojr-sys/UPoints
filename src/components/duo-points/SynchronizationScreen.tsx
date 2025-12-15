"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Task } from "@/app/page"

interface SynchronizationScreenProps {
  onComplete: () => void
  userTasks: Task[]
}

export function SynchronizationScreen({ onComplete, userTasks }: SynchronizationScreenProps) {
  const [step, setStep] = useState<"detecting" | "merging" | "complete">("detecting")
  
  // Simula tarefas do parceiro (algumas duplicadas)
  const partnerTasks = [
    { id: "t1", name: "Caminhada juntos", description: "Façam uma caminhada de 20 minutos juntos", points: 15, category: "Saúde" },
    { id: "p1", name: "Preparar café da manhã", description: "Preparar café especial para o casal", points: 15, category: "Gestos positivos" },
    { id: "t3", name: "Conversa significativa", description: "10 minutos de conversa profunda sem distrações", points: 20, category: "Conexão" },
  ]

  // Detecta duplicatas
  const duplicates = userTasks.filter(ut => 
    partnerTasks.some(pt => pt.id === ut.id)
  )

  const handleUnify = () => {
    setStep("merging")
    setTimeout(() => {
      setStep("complete")
    }, 2000)
  }

  const handleComplete = () => {
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Sincronização</h1>
        <p className="text-sm text-purple-300 font-semibold mt-1">Unificando listas do casal</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {step === "detecting" && (
          <>
            {/* Suas tarefas */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">Suas Tarefas</h2>
              <div className="space-y-2">
                {userTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="p-3 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50"
                  >
                    <p className="font-semibold text-white text-sm">{task.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarefas do parceiro */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">Tarefas do Parceiro</h2>
              <div className="space-y-2">
                {partnerTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="p-3 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50"
                  >
                    <p className="font-semibold text-white text-sm">{task.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Duplicatas detectadas */}
            {duplicates.length > 0 && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-orange-500/10 border-2 border-dashed border-emerald-500/30">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-400 stroke-[2px] flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white">Itens duplicados detectados</h3>
                    <p className="text-sm text-purple-200 mt-1">
                      Encontramos {duplicates.length} {duplicates.length === 1 ? 'tarefa' : 'tarefas'} em comum
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {duplicates.map((task) => (
                    <div 
                      key={task.id}
                      className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-emerald-500/30"
                    >
                      <p className="font-semibold text-white text-sm">{task.name}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleUnify}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-purple-500 hover:opacity-90 text-white rounded-xl font-bold"
                  >
                    Unificar itens
                  </Button>
                  <Button
                    onClick={handleComplete}
                    variant="outline"
                    className="flex-1 rounded-xl border-slate-700 text-purple-300 hover:bg-slate-800"
                  >
                    Manter separado
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {step === "merging" && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 flex items-center justify-center mb-6 animate-pulse shadow-xl shadow-purple-500/50">
              <CheckCircle className="w-10 h-10 text-white stroke-[2px]" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent mb-2">Unificando listas...</h2>
            <p className="text-purple-300 text-center font-semibold">Criando lista compartilhada do casal</p>
          </div>
        )}

        {step === "complete" && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 flex items-center justify-center mb-6 shadow-xl shadow-purple-500/50">
              <CheckCircle className="w-10 h-10 text-white stroke-[2px]" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent mb-2">Sincronização completa!</h2>
            <p className="text-purple-300 text-center mb-8 font-semibold">Vocês estão prontos para começar</p>
            
            <Button
              onClick={handleComplete}
              className="px-8 h-12 bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold shadow-xl"
            >
              Ir para Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
