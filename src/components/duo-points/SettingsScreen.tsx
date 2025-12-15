"use client"

import { ArrowLeft, User, Bell, CreditCard, Mail, HelpCircle, LogOut, Edit, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface SettingsScreenProps {
  onBack: () => void
  onRestorePurchase?: () => void
}

export function SettingsScreen({ onBack, onRestorePurchase }: SettingsScreenProps) {
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
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Perfil */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Perfil</h2>
          <div className="space-y-2">
            <button className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#98D8A8] transition-colors flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#98D8A8] to-[#F2A4A4] flex items-center justify-center">
                <User className="w-6 h-6 text-white stroke-[1.5px]" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Meu Perfil</p>
                <p className="text-sm text-gray-600">Editar informações pessoais</p>
              </div>
              <Edit className="w-5 h-5 text-gray-400 stroke-[1.5px]" />
            </button>
          </div>
        </div>

        {/* Tarefas e Recompensas */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Personalização</h2>
          <div className="space-y-2">
            <button className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#98D8A8] transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#98D8A8]/10 flex items-center justify-center">
                  <Edit className="w-5 h-5 text-[#98D8A8] stroke-[1.5px]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Editar Tarefas</p>
                  <p className="text-sm text-gray-600">Gerenciar lista de tarefas</p>
                </div>
              </div>
            </button>

            <button className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#F2A4A4] transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F2A4A4]/10 flex items-center justify-center">
                  <Edit className="w-5 h-5 text-[#F2A4A4] stroke-[1.5px]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Editar Recompensas</p>
                  <p className="text-sm text-gray-600">Gerenciar recompensas</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Notificações */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Notificações</h2>
          <div className="space-y-2">
            <div className="p-4 rounded-2xl bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#98D8A8]/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#98D8A8] stroke-[1.5px]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lembretes Diários</p>
                    <p className="text-sm text-gray-600">Receber notificações</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F2A4A4]/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#F2A4A4] stroke-[1.5px]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Atividades do Grupo</p>
                    <p className="text-sm text-gray-600">Notificar quando completar tarefas</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>

        {/* Conta */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Conta</h2>
          <div className="space-y-2">
            <button className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600 stroke-[1.5px]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Assinatura</p>
                  <p className="text-sm text-gray-600">Gerenciar plano</p>
                </div>
              </div>
            </button>

            <button 
              onClick={onRestorePurchase}
              className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-purple-600 stroke-[1.5px]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Restaurar Compra</p>
                  <p className="text-sm text-gray-600">Recuperar assinatura</p>
                </div>
              </div>
            </button>

            <button className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600 stroke-[1.5px]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Integração Google</p>
                  <p className="text-sm text-gray-600">Conectado</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Suporte */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Suporte</h2>
          <div className="space-y-2">
            <button className="w-full p-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-gray-600 stroke-[1.5px]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Central de Ajuda</p>
                  <p className="text-sm text-gray-600">FAQ e tutoriais</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Sair */}
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-2 stroke-[1.5px]" />
            Sair da Conta
          </Button>
        </div>

        {/* Versão */}
        <div className="text-center pt-4 pb-8">
          <p className="text-xs text-gray-400">UPoints v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
