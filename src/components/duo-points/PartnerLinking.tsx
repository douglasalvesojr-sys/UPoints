"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Copy, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PartnerLinkingProps {
  onConnected: () => void
  onBack: () => void
}

export function PartnerLinking({ onConnected, onBack }: PartnerLinkingProps) {
  const [inviteCode] = useState("DUO-" + Math.random().toString(36).substring(2, 8).toUpperCase())
  const [partnerEmail, setPartnerEmail] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    setShowAnimation(true)
    
    // Simula conexão
    setTimeout(() => {
      onConnected()
    }, 3000)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode)
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
            disabled={isConnecting}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Conectar com Parceiro
            </h1>
            <p className="text-sm text-purple-300 font-semibold">Compartilhe o código ou envie um convite</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        {!isConnecting ? (
          <div className="w-full max-w-md space-y-8">
            {/* Ilustração */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/50">
                <Heart className="w-10 h-10 text-white stroke-[2px]" />
              </div>
              <div className="text-4xl text-purple-500">+</div>
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center border-2 border-dashed border-purple-500/30">
                <Heart className="w-10 h-10 text-purple-400 stroke-[2px]" />
              </div>
            </div>

            {/* Código de convite */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/30">
              <h3 className="font-bold text-white mb-3">Seu código de convite</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 font-mono text-xl font-bold text-center text-white">
                  {inviteCode}
                </div>
                <Button
                  size="icon"
                  onClick={copyCode}
                  className="bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-xl h-14 w-14"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-purple-300 mt-3 font-semibold">
                Compartilhe este código com seu parceiro
              </p>
            </div>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-950 text-purple-400 font-semibold">ou</span>
              </div>
            </div>

            {/* Convite por email */}
            <div className="space-y-3">
              <h3 className="font-bold text-white">Enviar convite por email</h3>
              <Input
                type="email"
                placeholder="email@parceiro.com"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                className="h-12 rounded-xl bg-slate-800/50 border-slate-700 text-white placeholder:text-purple-400"
              />
              <Button 
                onClick={handleConnect}
                disabled={!partnerEmail}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold shadow-xl"
              >
                Enviar Convite
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            {/* Animação de conexão */}
            <div className="mb-8 relative">
              <div className="flex items-center justify-center gap-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center transition-all duration-1000 shadow-xl shadow-purple-500/50 ${showAnimation ? 'translate-x-8' : ''}`}>
                  <Heart className="w-10 h-10 text-white stroke-[2px]" />
                </div>
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center transition-all duration-1000 shadow-xl shadow-orange-500/50 ${showAnimation ? '-translate-x-8' : ''}`}>
                  <Heart className="w-10 h-10 text-white stroke-[2px]" />
                </div>
              </div>
              
              {/* Efeito de pulso */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 opacity-20 animate-ping" />
              </div>
            </div>

            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Conectando...
            </h2>
            <p className="text-purple-300 font-semibold">Aguardando confirmação do parceiro</p>
          </div>
        )}
      </div>
    </div>
  )
}
