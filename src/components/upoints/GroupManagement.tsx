"use client"

import { ArrowLeft, Users, Plus, X, Crown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Member {
  id: string
  name: string
  points: number
  isOwner?: boolean
}

interface GroupManagementProps {
  onBack: () => void
  members: Member[]
  onAddMember: (name: string) => void
  onRemoveMember: (id: string) => void
}

export function GroupManagement({ onBack, members, onAddMember, onRemoveMember }: GroupManagementProps) {
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMemberName, setNewMemberName] = useState("")

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      onAddMember(newMemberName.trim())
      setNewMemberName("")
      setShowAddMember(false)
    }
  }

  const sortedMembers = [...members].sort((a, b) => b.points - a.points)

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
              Modo Grupo
            </h1>
            <p className="text-sm text-purple-300 font-semibold">
              {members.length} {members.length === 1 ? "membro" : "membros"} 👥
            </p>
          </div>
        </div>

        {/* Adicionar membro */}
        {!showAddMember ? (
          <Button
            onClick={() => setShowAddMember(true)}
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Membro
          </Button>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-purple-500/30 space-y-3">
            <Input
              type="text"
              placeholder="Nome do membro..."
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
              className="h-12 bg-slate-900/50 border-slate-700 text-white placeholder:text-purple-400 rounded-xl"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAddMember}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90 text-white rounded-xl font-bold"
              >
                Adicionar
              </Button>
              <Button
                onClick={() => {
                  setShowAddMember(false)
                  setNewMemberName("")
                }}
                variant="outline"
                className="flex-1 border-slate-700 text-purple-300 hover:bg-slate-800 rounded-xl"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Ranking de membros */}
      <div className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto">
        <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Ranking de Pontos
        </h2>

        {sortedMembers.map((member, index) => (
          <div
            key={member.id}
            className={`p-5 rounded-3xl backdrop-blur-sm transition-all ${
              index === 0
                ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                : "bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Posição */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0 ${
                  index === 0
                    ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg"
                    : index === 1
                    ? "bg-gradient-to-br from-slate-400 to-slate-500 text-white"
                    : index === 2
                    ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {index === 0 ? "🏆" : index + 1}
              </div>

              {/* Info do membro */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  {member.isOwner && (
                    <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
                <p className="text-purple-300 text-sm font-semibold">
                  {member.points} pontos
                </p>
              </div>

              {/* Remover (se não for owner) */}
              {!member.isOwner && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveMember(member.id)}
                  className="rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        ))}

        {members.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-purple-400 stroke-[1.5px]" />
            </div>
            <p className="text-purple-300 font-semibold text-center">
              Nenhum membro no grupo
            </p>
            <p className="text-sm text-purple-400 text-center mt-2">
              Adicione membros para começar a competir
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 border-t border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/20">
          <p className="text-sm text-purple-200 text-center font-semibold">
            💡 No modo grupo, todos competem pelos mesmos objetivos e podem ver o ranking em tempo real
          </p>
        </div>
      </div>
    </div>
  )
}
