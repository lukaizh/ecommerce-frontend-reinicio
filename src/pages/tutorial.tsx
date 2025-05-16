import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Tutorial() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const tutorialSteps = [
    {
      title: "Bem-vindo ao NovusHub!",
      description: "O hub de marketplace all-in-one para gerenciar suas vendas online em um só lugar.",
      image: "/tutorial/welcome.png",
      content: (
        <div className="space-y-4">
          <p>O NovusHub é uma plataforma completa para gerenciar suas vendas em múltiplos marketplaces:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Integração com Mercado Livre, Shopee, Amazon e Magalu</li>
            <li>Gestão centralizada de pedidos e estoque</li>
            <li>Atendimento ao cliente com IA</li>
            <li>Análise de vendas e desempenho</li>
          </ul>
          <p>Vamos conhecer as principais funcionalidades!</p>
        </div>
      )
    },
    {
      title: "Dashboard Principal",
      description: "Visualize todas as suas métricas importantes em um só lugar.",
      image: "/tutorial/dashboard.png",
      content: (
        <div className="space-y-4">
          <p>O Dashboard principal oferece uma visão geral do seu negócio:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cards com métricas de vendas, pedidos, atendimentos e produtos</li>
            <li>Status de conexão com cada marketplace</li>
            <li>Pedidos pendentes por marketplace</li>
            <li>Atendimentos que precisam de atenção</li>
          </ul>
          <p>Dica: Clique em qualquer card para ver informações detalhadas!</p>
        </div>
      )
    },
    {
      title: "Subdomínios Especializados",
      description: "Acesse áreas específicas através de subdomínios dedicados.",
      image: "/tutorial/subdomains.png",
      content: (
        <div className="space-y-4">
          <p>O NovusHub utiliza subdomínios para organizar as diferentes áreas:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>pedidos.novushub.com.br</strong> - Gestão completa de pedidos</li>
            <li><strong>atendimento.novushub.com.br</strong> - Central de atendimento ao cliente</li>
            <li><strong>estoque.novushub.com.br</strong> - Controle de estoque e produtos</li>
          </ul>
          <p>Sua sessão é mantida em todos os subdomínios, sem necessidade de fazer login novamente!</p>
        </div>
      )
    },
    {
      title: "Integrações com Marketplaces",
      description: "Conecte suas contas de marketplace para sincronização automática.",
      image: "/tutorial/integrations.png",
      content: (
        <div className="space-y-4">
          <p>Conecte suas contas de marketplace em poucos cliques:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Acesse &quot;Integrações&quot; no menu lateral</li>
            <li>Clique em &quot;Conectar&quot; no marketplace desejado</li>
            <li>Autorize o NovusHub na página do marketplace</li>
            <li>Pronto! Seus pedidos serão sincronizados automaticamente</li>
          </ul>
          <p>Você pode conectar múltiplas contas do mesmo marketplace!</p>
        </div>
      )
    },
    {
      title: "Chatbot com IA",
      description: "Utilize nosso assistente virtual para atendimento automatizado.",
      image: "/tutorial/chatbot.png",
      content: (
        <div className="space-y-4">
          <p>O Chatbot com IA ajuda no atendimento aos seus clientes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Responde perguntas frequentes automaticamente</li>
            <li>Fornece informações sobre pedidos e entregas</li>
            <li>Transfere para atendimento humano quando necessário</li>
            <li>Aprende com cada interação para melhorar o atendimento</li>
          </ul>
          <p>Acesse o chatbot clicando no ícone flutuante no canto inferior direito!</p>
        </div>
      )
    }
  ];

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">NovusHub</h1>
          <div className="flex items-center space-x-4">
            <span>{session?.user?.name || session?.user?.email}</span>
            <Link href="/dashboard">
              <a className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                Ir para Dashboard
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2">
            <div 
              className="bg-primary h-2 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / (tutorialSteps.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="p-8">
            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Left Column - Text */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{tutorialSteps[currentStep].title}</h2>
                  <p className="mt-2 text-gray-600">{tutorialSteps[currentStep].description}</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  {tutorialSteps[currentStep].content}
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 rounded-lg p-4 w-full max-w-md aspect-video flex items-center justify-center">
                  <p className="text-gray-500 text-center">Imagem ilustrativa da funcionalidade</p>
                  {/* Placeholder for actual images */}
                  {/* <img src={tutorialSteps[currentStep].image} alt={tutorialSteps[currentStep].title} className="rounded-lg" /> */}
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentStep === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Anterior
              </button>
              
              {currentStep < tutorialSteps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(tutorialSteps.length - 1, currentStep + 1))}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Próximo
                </button>
              ) : (
                <Link href="/dashboard">
                  <a className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Concluir Tutorial
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
