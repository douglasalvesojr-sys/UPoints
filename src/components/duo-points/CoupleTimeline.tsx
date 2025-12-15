"use client"

import { ArrowLeft, Heart, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoupleTimelineProps {
  onBack: () => void
}

const memories = [
  {
    id: "1",
    date: "15 Jan 2025",
    title: "Primeira caminhada juntos",
    description: "Completamos nossa primeira caminhada matinal juntos. Foi incrível!",
    points: 15,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    date: "12 Jan 2025",
    title: "Meta semanal alcançada",
    description: "Conseguimos 200 pontos esta semana! 🎉",
    points: 200,
    image: null
  },
  {
    id: "3",
    date: "10 Jan 2025",
    title: "Jantar especial",
    description: "Resgatamos nossa primeira recompensa - jantar romântico",
    points: -100,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    date: "08 Jan 2025",
    title: "Início da jornada",
    description: "Começamos nossa jornada no Duo Points juntos ❤️",
    points: 0,
    image: null
  }
]

export function CoupleTimeline({ onBack }: CoupleTimelineProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nossa Linha do Tempo</h1>
            <p className="text-sm text-gray-600">Memórias e conquistas</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6 relative">
          {/* Linha vertical */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#98D8A8] to-[#F2A4A4]" />

          {memories.map((memory, index) => (
            <div key={memory.id} className="relative pl-14">
              {/* Ponto na linha */}
              <div className="absolute left-4 top-4 w-5 h-5 rounded-full bg-gradient-to-br from-[#98D8A8] to-[#F2A4A4] border-4 border-white shadow-lg" />

              {/* Card de memória */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                {memory.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={memory.image} 
                      alt={memory.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400 stroke-[1.5px]" />
                      <span className="text-xs text-gray-500">{memory.date}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">{memory.title}</h3>
                    <p className="text-sm text-gray-600">{memory.description}</p>

                    {memory.points !== 0 && (
                      <div className="mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          memory.points > 0
                            ? "bg-gradient-to-r from-[#98D8A8]/20 to-[#F2A4A4]/20 text-[#98D8A8]"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {memory.points > 0 ? "+" : ""}{memory.points} pontos
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botão de comentário */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-gray-500 hover:text-gray-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2 stroke-[1.5px]" />
                  Adicionar comentário
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem final */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#98D8A8]/10 to-[#F2A4A4]/10 border border-gray-100 text-center">
          <Heart className="w-12 h-12 mx-auto mb-3 text-[#F2A4A4] stroke-[1.5px]" />
          <p className="text-sm text-gray-700">
            Cada momento juntos é uma conquista especial ❤️
          </p>
        </div>
      </div>
    </div>
  )
}
