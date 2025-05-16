import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

// Componentes de ícones
const DashboardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

const OrdersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const InventoryIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

// Componente de Card para o Dashboard
const DashboardCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${color}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} text-${color.replace('border-', '')}`}>
        {icon}
      </div>
    </div>
  </div>
);

// Componente de Card para Marketplaces
const MarketplaceCard = ({ name, logo, connected, orders }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full">
    <div className="flex items-center mb-4">
      <img src={logo} alt={name} className="w-10 h-10 mr-3" />
      <h3 className="font-medium">{name}</h3>
      <span className={`ml-auto px-2 py-1 text-xs rounded-full ${connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {connected ? 'Conectado' : 'Desconectado'}
      </span>
    </div>
    <div className="mt-auto">
      <p className="text-gray-500 text-sm">Pedidos pendentes</p>
      <p className="text-xl font-bold">{orders}</p>
      <Link href={`https://pedidos.novushub.com.br?marketplace=${name.toLowerCase()}`}>
        <a className="mt-3 text-primary hover:underline text-sm inline-block">Ver detalhes →</a>
      </Link>
    </div>
  </div>
);

// Componente de Card para Atendimentos
const SupportCard = ({ customer, platform, time, status }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
      {customer.charAt(0).toUpperCase()}
    </div>
    <div className="flex-1">
      <p className="font-medium">{customer}</p>
      <p className="text-sm text-gray-500">{platform} • {time}</p>
    </div>
    <span className={`px-2 py-1 text-xs rounded-full ${
      status === 'Novo' ? 'bg-red-100 text-red-800' : 
      status === 'Em andamento' ? 'bg-yellow-100 text-yellow-800' : 
      'bg-green-100 text-green-800'
    }`}>
      {status}
    </span>
  </div>
);

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">NovusHub</h1>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard">
            <a className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 border-r-4 border-primary">
              <DashboardIcon />
              <span className="mx-3">Dashboard</span>
            </a>
          </Link>
          <Link href="https://pedidos.novushub.com.br">
            <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <OrdersIcon />
              <span className="mx-3">Pedidos</span>
            </a>
          </Link>
          <Link href="https://atendimento.novushub.com.br">
            <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <ChatIcon />
              <span className="mx-3">Atendimento</span>
            </a>
          </Link>
          <Link href="https://estoque.novushub.com.br">
            <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <InventoryIcon />
              <span className="mx-3">Estoque</span>
            </a>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4">Olá, {session?.user?.name || session?.user?.email}</span>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total de Vendas" 
            value="R$ 12.450,00" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            color="border-green-500"
          />
          <DashboardCard 
            title="Pedidos Pendentes" 
            value="28" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
            color="border-blue-500"
          />
          <DashboardCard 
            title="Atendimentos" 
            value="15" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
            color="border-yellow-500"
          />
          <DashboardCard 
            title="Produtos" 
            value="142" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
            color="border-purple-500"
          />
        </div>

        {/* Marketplaces e Atendimentos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Marketplaces */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium mb-4">Marketplaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MarketplaceCard 
                name="Mercado Livre" 
                logo="/marketplaces/mercadolivre.png" 
                connected={true}
                orders={12}
              />
              <MarketplaceCard 
                name="Shopee" 
                logo="/marketplaces/shopee.png" 
                connected={true}
                orders={8}
              />
              <MarketplaceCard 
                name="Amazon" 
                logo="/marketplaces/amazon.png" 
                connected={false}
                orders={0}
              />
              <MarketplaceCard 
                name="Magalu" 
                logo="/marketplaces/magalu.png" 
                connected={true}
                orders={5}
              />
            </div>
          </div>

          {/* Atendimentos */}
          <div>
            <h2 className="text-lg font-medium mb-4">Atendimentos Pendentes</h2>
            <div className="space-y-3">
              <SupportCard 
                customer="João Silva"
                platform="Mercado Livre"
                time="5 min atrás"
                status="Novo"
              />
              <SupportCard 
                customer="Maria Oliveira"
                platform="Shopee"
                time="15 min atrás"
                status="Em andamento"
              />
              <SupportCard 
                customer="Carlos Pereira"
                platform="Magalu"
                time="30 min atrás"
                status="Resolvido"
              />
              <SupportCard 
                customer="Ana Santos"
                platform="Mercado Livre"
                time="1 hora atrás"
                status="Novo"
              />
            </div>
            <div className="mt-4">
              <Link href="https://atendimento.novushub.com.br">
                <a className="text-primary hover:underline">Ver todos os atendimentos →</a>
              </Link>
            </div>
          </div>
        </div>

        {/* Chatbot IA */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg">
            <ChatIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
