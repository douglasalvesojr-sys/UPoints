"use client"

import { useState, useRef } from "react"
import { ArrowLeft, CheckCircle, Circle, Zap, Sparkles, ChevronLeft, ChevronRight, Camera, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Task } from "@/app/page"
import { CATEGORIES } from "@/lib/upoints-data"

interface TaskListScreenProps {
  tasks: Task[]
  onBack: () => void
  onCompleteTask: (points: number, taskName: string, category: string) => void
  userMode: "solo" | "group"
}

export function TaskListScreen({ tasks, onBack, onCompleteTask, userMode }: TaskListScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState<string | null>(null)
  const [showPhotoModal, setShowPhotoModal] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [taskPhotos, setTaskPhotos] = useState<Record<string, string[]>>({})
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    { id: "all", name: "Todas", color: "from-emerald-500 to-purple-500" },
    ...CATEGORIES.slice(0, 10).map(cat => ({
      id: cat.id,
      name: cat.name,
      color: cat.color
    }))
  ]

  const filteredTasks = selectedCategory === "all" 
    ? tasks 
    : tasks.filter(t => t.category === selectedCategory)

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleConfirmPhoto = (taskId: string) => {
    if (photoPreview && showPhotoModal) {
      const currentPhotos = taskPhotos[taskId] || []
      setTaskPhotos({
        ...taskPhotos,
        [taskId]: [...currentPhotos, photoPreview]
      })
      setPhotoPreview(null)
      setShowPhotoModal(null)
    }
  }

  const handleCompleteTask = (task: Task) => {
    // No modo compartilhado, exigir foto de validação
    if (userMode === "group") {
      const photos = taskPhotos[task.id] || []
      if (photos.length === 0) {
        setShowPhotoModal(task.id)
        return
      }
    }

    if (!completedTasks.includes(task.id)) {
      setCompletedTasks([...completedTasks, task.id])
      setShowConfetti(task.id)
      onCompleteTask(task.points, task.name, task.category)
      
      setTimeout(() => {
        setShowConfetti(null)
      }, 2000)
    }
  }

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId)
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const removePhoto = (taskId: string, photoIndex: number) => {
    const currentPhotos = taskPhotos[taskId] || []
    const updatedPhotos = currentPhotos.filter((_, index) => index !== photoIndex)
    setTaskPhotos({
      ...taskPhotos,
      [taskId]: updatedPhotos
    })
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
            <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Tarefas
            </h1>
            <p className="text-sm text-purple-300 font-semibold">
              {userMode === "group" ? "Complete com foto de validação 📸" : "Complete e ganhe pontos 🎯"}
            </p>
          </div>
        </div>

        {/* Filtros de categoria com navegação */}
        <div className="relative flex items-center gap-2">
          {/* Botão esquerda */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-all z-10"
          >
            <ChevronLeft className="w-4 h-4 text-purple-300" />
          </button>

          {/* Container de categorias */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                className={`rounded-xl whitespace-nowrap font-bold transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white border-0 shadow-lg`
                    : "bg-slate-800/50 text-purple-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Botão direita */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-all z-10"
          >
            <ChevronRight className="w-4 h-4 text-purple-300" />
          </button>
        </div>
      </div>

      {/* Lista de tarefas */}
      <div className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center mb-4">
              <Circle className="w-12 h-12 text-purple-400 stroke-[1.5px]" />
            </div>
            <p className="text-purple-300 font-semibold">Nenhuma tarefa nesta categoria</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id)
            const isAnimating = showConfetti === task.id
            const categoryInfo = getCategoryInfo(task.category)
            const photos = taskPhotos[task.id] || []
            const needsPhoto = userMode === "group" && photos.length === 0

            return (
              <div 
                key={task.id}
                className={`relative p-5 rounded-3xl backdrop-blur-sm transition-all ${
                  isCompleted 
                    ? "bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-emerald-500/30" 
                    : "bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 hover:border-purple-500/50"
                }`}
              >
                {/* Confetti animation */}
                {isAnimating && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="text-5xl font-black animate-bounce bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                      +{task.points} 🎉
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleCompleteTask(task)}
                    disabled={isCompleted}
                    className={`flex-shrink-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-gradient-to-br from-emerald-500 to-purple-500 border-transparent shadow-lg"
                        : needsPhoto
                        ? "border-orange-500 hover:border-orange-400 hover:bg-orange-500/10"
                        : "border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white stroke-[2px]" />
                    ) : needsPhoto ? (
                      <Camera className="w-5 h-5 text-orange-400" />
                    ) : null}
                  </button>

                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${isCompleted ? "text-purple-300 line-through" : "text-white"}`}>
                      {task.name}
                    </h3>
                    <p className={`text-sm mt-1 ${isCompleted ? "text-purple-400" : "text-purple-200"}`}>
                      {task.description}
                    </p>
                    
                    {/* Fotos de validação */}
                    {userMode === "group" && photos.length > 0 && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={photo} 
                              alt={`Validação ${index + 1}`}
                              className="w-16 h-16 rounded-lg object-cover border-2 border-emerald-500/50"
                            />
                            {!isCompleted && (
                              <button
                                onClick={() => removePhoto(task.id, index)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            )}
                          </div>
                        ))}
                        {!isCompleted && (
                          <button
                            onClick={() => setShowPhotoModal(task.id)}
                            className="w-16 h-16 rounded-lg border-2 border-dashed border-purple-500/50 flex items-center justify-center hover:bg-purple-500/10 transition-all"
                          >
                            <Camera className="w-6 h-6 text-purple-400" />
                          </button>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 ${
                        isCompleted
                          ? "bg-gradient-to-r from-emerald-500/30 to-purple-500/30 text-purple-200 border border-emerald-500/30"
                          : "bg-gradient-to-r from-emerald-500/20 to-purple-500/20 text-white border border-emerald-500/20"
                      }`}>
                        <Zap className="w-3 h-3" />
                        {task.points} pontos
                      </span>
                      {categoryInfo && (
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-purple-300 border border-slate-700 font-semibold">
                          {categoryInfo.icon} {categoryInfo.name}
                        </span>
                      )}
                      {task.isShared && userMode === "group" && (
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                          Compartilhada
                        </span>
                      )}
                      {userMode === "group" && needsPhoto && !isCompleted && (
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-semibold flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          Foto obrigatória
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Footer com resumo */}
      <div className="p-6 border-t border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-300 font-semibold">Concluídas</p>
            <p className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              {completedTasks.length}/{tasks.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-300 font-semibold">Pontos Ganhos</p>
            <p className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2 justify-end">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              {completedTasks.reduce((sum, id) => {
                const task = tasks.find(t => t.id === id)
                return sum + (task?.points || 0)
              }, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Modal de captura de foto */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 max-w-md w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Foto de Validação</h3>
              <button
                onClick={() => {
                  setShowPhotoModal(null)
                  setPhotoPreview(null)
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-purple-300" />
              </button>
            </div>

            {photoPreview ? (
              <div className="space-y-4">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-2xl border-2 border-purple-500/50"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={() => setPhotoPreview(null)}
                    variant="outline"
                    className="flex-1 rounded-xl border-slate-700 text-purple-300 hover:bg-slate-800"
                  >
                    Tirar outra
                  </Button>
                  <Button
                    onClick={() => handleConfirmPhoto(showPhotoModal)}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-purple-500 hover:opacity-90 text-white rounded-xl font-bold"
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-purple-300 text-center">
                  Tire uma foto para validar a conclusão desta tarefa
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoCapture}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 bg-gradient-to-br from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border-2 border-dashed border-purple-500/50 rounded-2xl flex flex-col items-center justify-center gap-3"
                >
                  <Camera className="w-12 h-12 text-purple-400" />
                  <span className="text-white font-bold">Tirar Foto</span>
                </Button>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full rounded-xl border-slate-700 text-purple-300 hover:bg-slate-800 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Escolher da Galeria
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
