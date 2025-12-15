"use client"

import { useState } from "react"
import { Zap, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AuthScreenProps {
  onLogin: () => void
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleEmailAuth = () => {
    if (isLogin) {
      // Lógica de login com email
      if (email && password) {
        onLogin()
      } else {
        alert("Preencha todos os campos")
      }
    } else {
      // Lógica de cadastro
      if (email && password && password === confirmPassword) {
        onLogin()
      } else if (password !== confirmPassword) {
        alert("As senhas não coincidem")
      } else {
        alert("Preencha todos os campos")
      }
    }
  }

  const handleGoogleAuth = () => {
    // Lógica de autenticação com Google
    onLogin()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <Zap className="w-12 h-12 text-white stroke-[2px] fill-white" />
          </div>
          <h1 className="text-5xl font-black text-center bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
            UPoints
          </h1>
          <p className="text-center text-purple-300 font-semibold">
            {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
          </p>
        </div>

        {/* Formulário de Email */}
        <div className="w-full space-y-4 mb-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-purple-400 rounded-xl"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 pl-12 pr-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-purple-400 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-14 pl-12 pr-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-purple-400 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          <Button
            onClick={handleEmailAuth}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 hover:opacity-90 transition-all text-white border-0 rounded-xl shadow-lg"
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </Button>
        </div>

        {/* Divisor */}
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="text-sm text-purple-400 font-semibold">ou</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleAuth}
          className="w-full h-14 text-lg font-bold bg-white hover:bg-gray-100 text-gray-900 border-0 rounded-xl shadow-lg"
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar com Google
        </Button>

        {/* Toggle Login/Cadastro */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 text-purple-300 hover:text-purple-200 font-semibold"
        >
          {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
        </button>

        <p className="mt-6 text-xs text-center text-purple-400">
          Ao continuar, você concorda com nossos Termos de Uso
        </p>
      </div>
    </div>
  )
}
