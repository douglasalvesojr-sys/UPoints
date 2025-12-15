"use client"

import { Users, Plus, ArrowRight, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Group {
  id: string
  name: string
  code: string
  members: Array<{ id: string; name: string; points: number; isOwner?: boolean }>
  tasks: any[]
  rewards: any[]
  totalPoints: number
}

interface GroupSelectorProps {
  groups: Group[]
  onSelectGroup: (groupId: string) => void
  onCreateNew: () => void
}

export function GroupSelector({ groups, onSelectGroup, onCreateNew }: GroupSelectorProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-xl shadow-purple-500/50">
            <Users className="w-7 h-7 text-white stroke-[2px]" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Meus Grupos
            </h1>
            <p className="text-sm text-purple-300 font-semibold">
              {groups.length} {groups.length === 1 ? "grupo ativo" : "grupos ativos"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Lista de Grupos */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {groups.map((group) => {
          const isOwner = group.members.some(m => m.isOwner)
          const memberCount = group.members.length
          
          return (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className="w-full p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-orange-500/10 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{group.name}</h3>
                    {isOwner && (
                      <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm text-purple-200 mb-3">
                    Código: <span className="font-mono font-bold text-emerald-400">{group.code}</span>
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>

              {/* Estatísticas do Grupo */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-xs text-purple-300 mb-1">Membros</p>
                  <p className="text-lg font-bold text-white">{memberCount}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-xs text-purple-300 mb-1">Tarefas</p>
                  <p className="text-lg font-bold text-white">{group.tasks.length}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-xs text-purple-300 mb-1">Pontos</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    {group.totalPoints}
                  </p>
                </div>
              </div>

              {/* Membros Preview */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {group.members.slice(0, 3).map((member, idx) => (
                    <div
                      key={member.id}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 border-2 border-slate-900 flex items-center justify-center"
                      title={member.name}
                    >
                      <span className="text-xs font-bold text-white">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {group.members.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-300">
                        +{group.members.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-purple-300">
                  {group.members.map(m => m.name).join(", ")}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Botão Criar Novo Grupo */}
      <div className="mt-6 space-y-3">
        <Button
          onClick={onCreateNew}
          className="w-full h-14 bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold shadow-xl text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Criar Novo Grupo
        </Button>

        <p className="text-xs text-center text-purple-400">
          💡 Cada grupo é independente e privado. Apenas você e os membros convidados têm acesso.
        </p>
      </div>
    </div>
  )
}
