// Dados centralizados do UPoints

export type Category = {
  id: string
  name: string
  icon: string
  color: string
  suggestedPoints: number // Sugestão de pontos para tarefas
  suggestedRewardCost: number // Sugestão de custo para recompensas
}

export const CATEGORIES: Category[] = [
  // Fitness & Saúde (pontuação alta)
  { id: "fitness", name: "Fitness", icon: "💪", color: "from-emerald-500 to-emerald-600", suggestedPoints: 50, suggestedRewardCost: 200 },
  { id: "exercicio", name: "Exercício", icon: "🏃", color: "from-emerald-400 to-green-500", suggestedPoints: 45, suggestedRewardCost: 180 },
  { id: "saude", name: "Saúde", icon: "❤️", color: "from-red-400 to-pink-500", suggestedPoints: 40, suggestedRewardCost: 160 },
  { id: "alimentacao", name: "Alimentação", icon: "🥗", color: "from-green-400 to-emerald-500", suggestedPoints: 35, suggestedRewardCost: 140 },
  
  // Produtividade & Trabalho (pontuação média-alta)
  { id: "trabalho", name: "Trabalho", icon: "💼", color: "from-blue-500 to-indigo-600", suggestedPoints: 40, suggestedRewardCost: 160 },
  { id: "estudo", name: "Estudo", icon: "📚", color: "from-purple-500 to-purple-600", suggestedPoints: 35, suggestedRewardCost: 140 },
  { id: "produtividade", name: "Produtividade", icon: "⚡", color: "from-yellow-500 to-orange-500", suggestedPoints: 30, suggestedRewardCost: 120 },
  { id: "criatividade", name: "Criatividade", icon: "🎨", color: "from-pink-500 to-purple-500", suggestedPoints: 30, suggestedRewardCost: 120 },
  
  // Bem-estar & Mindfulness (pontuação média)
  { id: "meditacao", name: "Meditação", icon: "🧘", color: "from-indigo-400 to-purple-500", suggestedPoints: 25, suggestedRewardCost: 100 },
  { id: "sono", name: "Sono", icon: "😴", color: "from-blue-400 to-indigo-500", suggestedPoints: 25, suggestedRewardCost: 100 },
  { id: "mindfulness", name: "Mindfulness", icon: "🌸", color: "from-pink-400 to-rose-500", suggestedPoints: 25, suggestedRewardCost: 100 },
  { id: "autocuidado", name: "Autocuidado", icon: "💆", color: "from-purple-400 to-pink-500", suggestedPoints: 20, suggestedRewardCost: 80 },
  
  // Social & Relacionamentos (pontuação média)
  { id: "familia", name: "Família", icon: "👨‍👩‍👧", color: "from-orange-400 to-red-500", suggestedPoints: 30, suggestedRewardCost: 120 },
  { id: "amigos", name: "Amigos", icon: "👥", color: "from-cyan-400 to-blue-500", suggestedPoints: 25, suggestedRewardCost: 100 },
  { id: "relacionamento", name: "Relacionamento", icon: "💑", color: "from-rose-400 to-pink-500", suggestedPoints: 30, suggestedRewardCost: 120 },
  { id: "social", name: "Social", icon: "🎉", color: "from-purple-400 to-pink-500", suggestedPoints: 20, suggestedRewardCost: 80 },
  
  // Casa & Organização (pontuação baixa-média)
  { id: "limpeza", name: "Limpeza", icon: "🧹", color: "from-cyan-500 to-blue-500", suggestedPoints: 20, suggestedRewardCost: 80 },
  { id: "organizacao", name: "Organização", icon: "📦", color: "from-slate-500 to-slate-600", suggestedPoints: 15, suggestedRewardCost: 60 },
  { id: "casa", name: "Casa", icon: "🏠", color: "from-amber-500 to-orange-500", suggestedPoints: 20, suggestedRewardCost: 80 },
  
  // Finanças (pontuação média)
  { id: "financas", name: "Finanças", icon: "💰", color: "from-green-500 to-emerald-600", suggestedPoints: 30, suggestedRewardCost: 120 },
  { id: "economia", name: "Economia", icon: "🪙", color: "from-yellow-500 to-amber-600", suggestedPoints: 25, suggestedRewardCost: 100 },
  
  // Hobbies & Lazer (pontuação baixa)
  { id: "hobby", name: "Hobby", icon: "🎮", color: "from-violet-500 to-purple-600", suggestedPoints: 15, suggestedRewardCost: 60 },
  { id: "leitura", name: "Leitura", icon: "📖", color: "from-amber-500 to-orange-500", suggestedPoints: 20, suggestedRewardCost: 80 },
  { id: "musica", name: "Música", icon: "🎵", color: "from-pink-500 to-rose-600", suggestedPoints: 15, suggestedRewardCost: 60 },
  { id: "arte", name: "Arte", icon: "🖼️", color: "from-purple-500 to-pink-600", suggestedPoints: 20, suggestedRewardCost: 80 },
  
  // Desenvolvimento Pessoal (pontuação média)
  { id: "aprendizado", name: "Aprendizado", icon: "🎓", color: "from-blue-500 to-cyan-600", suggestedPoints: 30, suggestedRewardCost: 120 },
  { id: "idiomas", name: "Idiomas", icon: "🌍", color: "from-teal-500 to-cyan-600", suggestedPoints: 35, suggestedRewardCost: 140 },
  { id: "habilidades", name: "Habilidades", icon: "🛠️", color: "from-slate-500 to-gray-600", suggestedPoints: 30, suggestedRewardCost: 120 },
  
  // Outros (pontuação baixa)
  { id: "pets", name: "Pets", icon: "🐾", color: "from-amber-400 to-orange-500", suggestedPoints: 15, suggestedRewardCost: 60 },
  { id: "natureza", name: "Natureza", icon: "🌳", color: "from-green-400 to-emerald-500", suggestedPoints: 20, suggestedRewardCost: 80 },
  { id: "voluntariado", name: "Voluntariado", icon: "🤝", color: "from-blue-400 to-indigo-500", suggestedPoints: 40, suggestedRewardCost: 160 },
  { id: "outro", name: "Outro", icon: "✨", color: "from-gray-500 to-slate-600", suggestedPoints: 15, suggestedRewardCost: 60 },
]

export type Achievement = {
  id: string
  name: string
  description: string
  icon: string
  requirement: number
  type: "points_earned" | "points_redeemed" | "streak" | "tasks_completed" | "rewards_redeemed"
  color: string
}

export const ACHIEVEMENTS: Achievement[] = [
  // Pontos Adquiridos
  { id: "points_100", name: "Iniciante", description: "Ganhe 100 pontos", icon: "🌟", requirement: 100, type: "points_earned", color: "from-blue-400 to-cyan-500" },
  { id: "points_500", name: "Dedicado", description: "Ganhe 500 pontos", icon: "⭐", requirement: 500, type: "points_earned", color: "from-purple-400 to-pink-500" },
  { id: "points_1000", name: "Comprometido", description: "Ganhe 1.000 pontos", icon: "✨", requirement: 1000, type: "points_earned", color: "from-emerald-400 to-green-500" },
  { id: "points_5000", name: "Mestre", description: "Ganhe 5.000 pontos", icon: "💫", requirement: 5000, type: "points_earned", color: "from-orange-400 to-red-500" },
  { id: "points_10000", name: "Lendário", description: "Ganhe 10.000 pontos", icon: "🏆", requirement: 10000, type: "points_earned", color: "from-yellow-400 to-amber-500" },
  
  // Pontos Resgatados
  { id: "redeem_100", name: "Primeira Recompensa", description: "Resgate 100 pontos", icon: "🎁", requirement: 100, type: "points_redeemed", color: "from-pink-400 to-rose-500" },
  { id: "redeem_500", name: "Colecionador", description: "Resgate 500 pontos", icon: "🎉", requirement: 500, type: "points_redeemed", color: "from-purple-400 to-violet-500" },
  { id: "redeem_1000", name: "Aproveitador", description: "Resgate 1.000 pontos", icon: "🎊", requirement: 1000, type: "points_redeemed", color: "from-cyan-400 to-blue-500" },
  
  // Sequência Diária
  { id: "streak_3", name: "Aquecendo", description: "3 dias seguidos", icon: "🔥", requirement: 3, type: "streak", color: "from-orange-400 to-red-500" },
  { id: "streak_7", name: "Uma Semana", description: "7 dias seguidos", icon: "🔥", requirement: 7, type: "streak", color: "from-red-400 to-rose-500" },
  { id: "streak_14", name: "Duas Semanas", description: "14 dias seguidos", icon: "🔥", requirement: 14, type: "streak", color: "from-rose-400 to-pink-500" },
  { id: "streak_30", name: "Um Mês", description: "30 dias seguidos", icon: "🔥", requirement: 30, type: "streak", color: "from-pink-400 to-purple-500" },
  { id: "streak_100", name: "Imparável", description: "100 dias seguidos", icon: "🔥", requirement: 100, type: "streak", color: "from-purple-400 to-violet-500" },
  
  // Tarefas Completadas
  { id: "tasks_10", name: "Começando", description: "Complete 10 tarefas", icon: "✅", requirement: 10, type: "tasks_completed", color: "from-green-400 to-emerald-500" },
  { id: "tasks_50", name: "Produtivo", description: "Complete 50 tarefas", icon: "✅", requirement: 50, type: "tasks_completed", color: "from-emerald-400 to-teal-500" },
  { id: "tasks_100", name: "Máquina", description: "Complete 100 tarefas", icon: "✅", requirement: 100, type: "tasks_completed", color: "from-teal-400 to-cyan-500" },
  { id: "tasks_500", name: "Incansável", description: "Complete 500 tarefas", icon: "✅", requirement: 500, type: "tasks_completed", color: "from-cyan-400 to-blue-500" },
  
  // Recompensas Resgatadas
  { id: "rewards_5", name: "Aproveitando", description: "Resgate 5 recompensas", icon: "🎁", requirement: 5, type: "rewards_redeemed", color: "from-violet-400 to-purple-500" },
  { id: "rewards_20", name: "Merecedor", description: "Resgate 20 recompensas", icon: "🎁", requirement: 20, type: "rewards_redeemed", color: "from-purple-400 to-pink-500" },
  { id: "rewards_50", name: "Recompensado", description: "Resgate 50 recompensas", icon: "🎁", requirement: 50, type: "rewards_redeemed", color: "from-pink-400 to-rose-500" },
]

export const SUBSCRIPTION_PLANS = [
  {
    id: "monthly",
    name: "Mensal",
    price: 14.90,
    period: "mês",
    popular: false,
    features: [
      "Tarefas ilimitadas",
      "Recompensas ilimitadas",
      "Modo grupo",
      "Estatísticas avançadas",
      "Todas as conquistas",
      "Suporte prioritário"
    ]
  },
  {
    id: "annual",
    name: "Anual",
    price: 7.50,
    originalPrice: 14.90,
    period: "mês",
    popular: true,
    savings: "Economize 50%",
    features: [
      "Tudo do plano mensal",
      "50% de desconto",
      "Melhor custo-benefício",
      "Pague apenas R$ 89,90/ano"
    ]
  },
  {
    id: "lifetime",
    name: "Vitalício",
    price: 149.90,
    period: "pagamento único",
    popular: false,
    badge: "Melhor valor",
    features: [
      "Acesso vitalício",
      "Todas as funcionalidades",
      "Atualizações gratuitas",
      "Sem mensalidades",
      "Pague uma vez, use para sempre"
    ]
  }
]

export const APP_REVIEWS = [
  {
    id: "1",
    author: "Maria Silva",
    rating: 5,
    date: "Há 2 dias",
    title: "Mudou minha rotina!",
    content: "Finalmente consegui manter uma rotina consistente. O sistema de pontos é super motivador e o modo grupo com meu marido tornou tudo mais divertido!"
  },
  {
    id: "2",
    author: "João Pedro",
    rating: 5,
    date: "Há 1 semana",
    title: "Melhor app de hábitos",
    content: "Já testei vários apps de hábitos, mas o UPoints é o único que realmente me mantém engajado. As conquistas e estatísticas são incríveis!"
  },
  {
    id: "3",
    author: "Ana Costa",
    rating: 5,
    date: "Há 3 dias",
    title: "Vale cada centavo!",
    content: "A assinatura vitalícia foi o melhor investimento. Uso todos os dias e já conquistei mais de 20 selos. Recomendo demais!"
  },
  {
    id: "4",
    author: "Carlos Mendes",
    rating: 5,
    date: "Há 5 dias",
    title: "Perfeito para casais",
    content: "Minha esposa e eu usamos juntos e está fortalecendo nosso relacionamento. Competimos de forma saudável e nos motivamos mutuamente!"
  },
  {
    id: "5",
    author: "Beatriz Lima",
    rating: 5,
    date: "Há 1 semana",
    title: "Interface linda e funcional",
    content: "Design impecável, super intuitivo e cheio de recursos úteis. As categorias facilitam muito a organização das tarefas."
  }
]

export const FREE_LIMITS = {
  tasks: 3,
  rewards: 3
}

// Código especial do dono (pode ser usado na função "Restaurar Compra")
export const OWNER_CODE = "UPOINTS2024OWNER"
