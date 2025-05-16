import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider 
      session={session}
      // Configuração para cookies funcionarem em todos os subdomínios
      options={{
        cookieName: `next-auth.session-token`,
        cookieOptions: {
          // Domínio raiz para permitir compartilhamento entre subdomínios
          domain: process.env.NODE_ENV === 'production' ? '.novushub.com.br' : undefined,
          secure: process.env.NODE_ENV === 'production',
        }
      }}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
