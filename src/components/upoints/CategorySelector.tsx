"use client"

import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CATEGORIES } from "@/lib/upoints-data"
import { useState } from "react"

interface CategorySelectorProps {
  onSelect: (categoryId: string) => void
  onClose: () => void
  selectedCategory?: string
  type: "task" | "reward"
}

export function CategorySelector({ onSelect, onClose, selectedCategory, type }: CategorySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSuggestion = (cat: typeof CATEGORIES[0]) => {
    if (type === "task") {
      return `Sugestão: ${cat.suggestedPoints} pontos`
    } else {
      return `Sugestão: ${cat.suggestedRewardCost} pontos`
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[80vh] bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 rounded-3xl border border-purple-500/30 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Selecione a Categoria
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full text-purple-300 hover:text-white hover:bg-purple-500/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <Input
              type="text"
              placeholder="Buscar categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-purple-400 rounded-xl focus:border-purple-500"
            />
          </div>
        </div>

        {/* Lista de categorias */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-purple-300">Nenhuma categoria encontrada</p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelect(cat.id)
                  onClose()
                }}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                  selectedCategory === cat.id
                    ? "border-purple-500 bg-gradient-to-br from-purple-500/20 to-orange-500/20"
                    : "border-slate-700 bg-slate-800/50 hover:border-purple-500/50"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                  <p className="text-purple-300 text-sm">{getSuggestion(cat)}</p>
                </div>
                {selectedCategory === cat.id && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
