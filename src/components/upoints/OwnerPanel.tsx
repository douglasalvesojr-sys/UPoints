"use client"

import { useState } from "react"
import { ArrowLeft, Crown, Plus, Calendar, Infinity, Copy, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PromoCode {
  id: string
  code: string
  type: "monthly" | "annual" | "lifetime"
  createdAt: string
  usedBy: string | null
  deviceId: string | null
}

interface OwnerPanelProps {
  onBack: () => void
}

export function OwnerPanel({ onBack }: OwnerPanelProps) {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const generatePromoCode = (type: "monthly" | "annual" | "lifetime") => {
    const prefix = type === "monthly" ? "M" : type === "annual" ? "A" : "L"
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase()
    const code = `UP-${prefix}-${randomPart}`

    const newCode: PromoCode = {
      id: Date.now().toString(),
      code,
      type,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      usedBy: null,
      deviceId: null
    }

    setPromoCodes([newCode, ...promoCodes])
    return code
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDeleteCode = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este código?")) {
      setPromoCodes(promoCodes.filter(c => c.id !== id))
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "monthly": return "Mensal"
      case "annual": return "Anual"
      case "lifetime": return "Vitalício"
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "monthly": return "from-blue-500 to-blue-600"
      case "annual": return "from-purple-500 to-purple-600"
      case "lifetime": return "from-yellow-500 to-orange-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "monthly": return <Calendar className="w-5 h-5" />
      case "annual": return <Calendar className="w-5 h-5" />
      case "lifetime": return <Infinity className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full text-purple-300 hover:text-white hover:bg-purple-500/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Painel do Owner
              </h1>
            </div>
            <p className="text-sm text-purple-300 font-semibold">
              Gerencie códigos promocionais
            </p>
          </div>
        </div>
      </div>

      {/* Gerar Códigos */}
      <div className="p-6 space-y-4">
        <h2 className="text-white font-bold text-lg mb-3">Gerar Novo Código</h2>

        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={() => generatePromoCode("monthly")}
            className="h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-white rounded-xl font-bold"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Gerar Código Mensal
          </Button>

          <Button
            onClick={() => generatePromoCode("annual")}
            className="h-14 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 text-white rounded-xl font-bold"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Gerar Código Anual
          </Button>

          <Button
            onClick={() => generatePromoCode("lifetime")}
            className="h-14 bg-gradient-to-r from-yellow-500 to-orange-600 hover:opacity-90 text-white rounded-xl font-bold"
          >
            <Infinity className="w-5 h-5 mr-2" />
            Gerar Código Vitalício
          </Button>
        </div>
      </div>

      {/* Lista de Códigos */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <h2 className="text-white font-bold text-lg mb-3">
          Códigos Gerados ({promoCodes.length})
        </h2>

        {promoCodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center mb-4">
              <Plus className="w-12 h-12 text-purple-400 stroke-[1.5px]" />
            </div>
            <p className="text-purple-300 font-semibold text-center">
              Nenhum código gerado ainda
            </p>
            <p className="text-sm text-purple-400 text-center mt-2">
              Gere códigos promocionais acima
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {promoCodes.map((promo) => (
              <div
                key={promo.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(promo.type)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    {getTypeIcon(promo.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(promo.type)}`}>
                        {getTypeLabel(promo.type)}
                      </span>
                      {promo.usedBy && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-green-500 to-green-600">
                          Usado
                        </span>
                      )}
                    </div>
                    <p className="text-white font-mono font-bold text-lg break-all">
                      {promo.code}
                    </p>
                    <p className="text-sm text-purple-300 mt-1">
                      Criado em: {promo.createdAt}
                    </p>
                    {promo.usedBy && (
                      <p className="text-sm text-green-400 mt-1">
                        Usado por: {promo.usedBy}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopyCode(promo.code)}
                    className="flex-1 h-10 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold"
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                  {!promo.usedBy && (
                    <Button
                      onClick={() => handleDeleteCode(promo.id)}
                      variant="outline"
                      className="h-10 border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 border-t border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
          <p className="text-sm text-purple-200 text-center font-semibold">
            ⚠️ Códigos são de uso único e ficam vinculados ao dispositivo que os ativou
          </p>
        </div>
      </div>
    </div>
  )
}
