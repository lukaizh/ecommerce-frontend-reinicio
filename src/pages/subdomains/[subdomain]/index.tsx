import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Lista de subdomínios permitidos
const ALLOWED_SUBDOMAINS = ['pedidos', 'atendimento', 'estoque'];

export default function SubdomainPage() {
  const router = useRouter();
  const { subdomain } = router.query;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (status === 'unauthenticated') {
      // Redirecionar para login se não estiver autenticado
      window.location.href = 'https://novushub.com.br/login';
      return;
    }

    // Verificar se o subdomínio é permitido
    if (status === 'authenticated' && subdomain) {
      if (!ALLOWED_SUBDOMAINS.includes(subdomain as string)) {
        // Redirecionar para dashboard se o subdomínio não for permitido
        window.location.href = 'https://novushub.com.br/dashboard';
        return;
      }
      setLoading(false);
    }
  }, [subdomain, status]);

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-primary mb-4">
            {subdomain === 'pedidos' && 'Gestão de Pedidos'}
            {subdomain === 'atendimento' && 'Central de Atendimento'}
            {subdomain === 'estoque' && 'Controle de Estoque'}
          </h1>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-blue-800">
              Subdomínio: <strong>{subdomain}.novushub.com.br</strong>
            </p>
            <p className="text-blue-800 mt-2">
              Usuário: <strong>{session?.user?.name || session?.user?.email}</strong>
            </p>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-600">
              Esta é a página do subdomínio dinâmico. O conteúdo específico para {subdomain} 
              será carregado aqui, mantendo a sessão unificada entre todos os subdomínios.
            </p>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <a 
              href="https://novushub.com.br/dashboard" 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Voltar ao Dashboard
            </a>
            {ALLOWED_SUBDOMAINS.filter(s => s !== subdomain).map(s => (
              <a 
                key={s}
                href={`https://${s}.novushub.com.br`}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Ir para {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
