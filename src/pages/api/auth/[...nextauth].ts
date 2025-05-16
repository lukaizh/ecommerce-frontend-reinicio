import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

// Verificação das variáveis de ambiente obrigatórias
if (!process.env.NEXTAUTH_URL) {
  console.warn('Aviso: NEXTAUTH_URL não está definido. Usando valor padrão https://novushub.com.br');
}

if (!process.env.NEXTAUTH_SECRET) {
  console.warn('Aviso: NEXTAUTH_SECRET não está definido. A segurança da sessão pode estar comprometida.');
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        // Aqui você implementaria a lógica real de autenticação
        // Por enquanto, vamos simular um login bem-sucedido para teste
        if (credentials?.email === 'admin@novushub.com.br' && credentials?.password === 'admin123') {
          return {
            id: '1',
            name: 'Administrador',
            email: 'admin@novushub.com.br',
          };
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.novushub.com.br' : undefined,
      },
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
    newUser: '/dashboard',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'temporarysecretfordevonlychangeinproduction',
  debug: process.env.NODE_ENV === 'development',
});
