"use client"

import { useState } from "react"
import { ArrowLeft, Users, Copy, Check, Link as LinkIcon, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SharedModeSetupProps {
  onBack: () => void
  onComplete: (inviteCode: string) => void
}

export function SharedModeSetup({ onBack, onComplete }: SharedModeSetupProps) {
  const [step, setStep] = useState<"create" | "join">("create")
  const [inviteCode, setInviteCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [joinCode, setJoinCode] = useState("")

  const generateCode = () => {
    // Gera código único de 6 caracteres
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setGeneratedCode(code)
    return code
  }

  const handleCreateGroup = () => {
    const code = generateCode()
    setInviteCode(code)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleJoinGroup = () => {
    if (joinCode.trim().length === 6) {
      onComplete(joinCode.toUpperCase())
    } else {
      alert("Código inválido. Digite um código de 6 caracteres.")
    }
  }

  const handleContinue = () => {
    if (generatedCode) {
      onComplete(generatedCode)
    }
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
              Modo Compartilhado
            </h1>
            <p className="text-sm text-purple-300 font-semibold">
              Configure seu grupo
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {/* Escolha: Criar ou Entrar */}
        {!generatedCode && !joinCode && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setStep("create")
                handleCreateGroup()
              }}
              className="w-full p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Users className="w-8 h-8 text-white stroke-[2px]" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Criar Grupo</h3>
                  <p className="text-sm text-purple-200">
                    Gere um código e convide outras pessoas
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setStep("join")}
              className="w-full p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <UserPlus className="w-8 h-8 text-white stroke-[2px]" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Entrar em Grupo</h3>
                  <p className="text-sm text-purple-200">
                    Digite o código de convite recebido
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Criar Grupo - Mostrar Código */}
        {step === "create" && generatedCode && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-orange-500/10 border border-purple-500/30">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <LinkIcon className="w-10 h-10 text-white stroke-[2px]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Seu Código de Convite</h3>
                <p className="text-purple-200 text-sm">
                  Compartilhe este código com as pessoas que você quer adicionar ao grupo
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-700 mb-4">
                <p className="text-5xl font-black text-center bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent tracking-wider">
                  {generatedCode}
                </p>
              </div>

              <Button
                onClick={handleCopyCode}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90 text-white rounded-xl font-bold"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Código Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copiar Código
                  </>
                )}
              </Button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-purple-200 text-center">
                💡 Quando alguém entrar com este código, vocês compartilharão as mesmas tarefas e recompensas
              </p>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full h-14 bg-gradient-to-r from-purple-500 to-orange-500 hover:opacity-90 text-white rounded-xl font-bold"
            >
              Continuar
            </Button>
          </div>
        )}

        {/* Entrar em Grupo */}
        {step === "join" && !generatedCode && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 border border-orange-500/30">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <UserPlus className="w-10 h-10 text-white stroke-[2px]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Entrar em Grupo</h3>
                <p className="text-purple-200 text-sm">
                  Digite o código de 6 caracteres que você recebeu
                </p>
              </div>

              <Input
                type="text"
                placeholder="Digite o código..."
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="h-16 text-center text-3xl font-bold bg-slate-900/50 border-slate-700 text-white placeholder:text-purple-400 rounded-xl tracking-wider mb-4"
              />

              <Button
                onClick={handleJoinGroup}
                disabled={joinCode.length !== 6}
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white rounded-xl font-bold disabled:opacity-50"
              >
                Entrar no Grupo
              </Button>
            </div>

            <Button
              onClick={() => {
                setStep("create")
                setJoinCode("")
              }}
              variant="outline"
              className="w-full h-12 border-slate-700 text-purple-300 hover:bg-slate-800 rounded-xl"
            >
              Voltar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
