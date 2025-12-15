"use client"

import { X, Check, Star, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SUBSCRIPTION_PLANS, APP_REVIEWS } from "@/lib/upoints-data"
import { useState } from "react"

interface SubscriptionPaywallProps {
  onClose: () => void
  onSubscribe: (planId: string) => void
  onRestore: () => void
}

export function SubscriptionPaywall({ onClose, onSubscribe, onRestore }: SubscriptionPaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState("annual")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 rounded-3xl border border-purple-500/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6 pb-4 border-b border-purple-500/20 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full text-purple-300 hover:text-white hover:bg-purple-500/20"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 mb-4 shadow-xl shadow-purple-500/50">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Desbloqueie Todo o Potencial
            </h2>
            <p className="text-purple-200 text-sm">
              Crie tarefas e recompensas ilimitadas
            </p>
          </div>
        </div>

        {/* Benefícios */}
        <div className="p-6 space-y-3">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Benefícios Premium
          </h3>
          {[
            "Tarefas ilimitadas",
            "Recompensas ilimitadas",
            "Modo grupo com múltiplos membros",
            "Estatísticas avançadas e histórico completo",
            "Todas as conquistas e selos",
            "Categorias personalizadas",
            "Suporte prioritário",
            "Sem anúncios"
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/20">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white stroke-[3px]" />
              </div>
              <span className="text-white text-sm font-semibold">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Planos */}
        <div className="p-6 pt-0 space-y-3">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                selectedPlan === plan.id
                  ? "border-purple-500 bg-gradient-to-br from-purple-500/20 to-orange-500/20 shadow-lg shadow-purple-500/30"
                  : "border-slate-700 bg-slate-800/50 hover:border-purple-500/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-bold text-lg">{plan.name}</h4>
                    {plan.popular && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold">
                        MAIS POPULAR
                      </span>
                    )}
                    {plan.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                      R$ {plan.price.toFixed(2).replace(".", ",")}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-slate-400 text-sm line-through">
                        R$ {plan.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>
                  <p className="text-purple-300 text-sm">{plan.period}</p>
                  {plan.savings && (
                    <p className="text-emerald-400 text-xs font-bold mt-1">{plan.savings}</p>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id
                    ? "border-purple-500 bg-gradient-to-br from-purple-500 to-orange-500"
                    : "border-slate-600"
                }`}>
                  {selectedPlan === plan.id && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div className="space-y-1 mt-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-purple-200 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Reviews */}
        <div className="p-6 pt-0">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            Avaliações 5 Estrelas
          </h3>
          <div className="space-y-3">
            {APP_REVIEWS.slice(0, 3).map((review) => (
              <div key={review.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-bold text-sm">{review.author}</p>
                    <p className="text-purple-400 text-xs">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-white font-semibold text-sm mb-1">{review.title}</p>
                <p className="text-purple-200 text-xs">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 p-6 pt-4 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent border-t border-purple-500/20">
          <Button
            onClick={() => onSubscribe(selectedPlan)}
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-orange-500 hover:opacity-90 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/50"
          >
            Assinar Agora
          </Button>
          <Button
            onClick={onRestore}
            variant="ghost"
            className="w-full mt-3 text-purple-300 hover:text-white"
          >
            Restaurar Compra
          </Button>
        </div>
      </div>
    </div>
  )
}
