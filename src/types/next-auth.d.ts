import { DefaultSession } from 'next-auth'

// Extensão da interface Session para next-auth v5
declare module 'next-auth' {
  interface Session {
    accessToken: string
    error?: string
    user: {
      sub: string
      id: string
      cpf: string
      role: string
    } & DefaultSession['user']
  }

  interface User {
    sub: string
    id: string
    cpf: string
    role: string
  }
}

// Extensão para @auth/core (necessário para Auth.js v5)
declare module '@auth/core/types' {
  interface Session {
    accessToken: string
    error?: string
    user: {
      sub: string
      id: string
      cpf: string
      role: string
    } & DefaultSession['user']
  }

  interface User {
    sub: string
    id: string
    cpf: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider: string
    idToken: string
    accessTokenExpired: number | null
    refreshTokenExpired: number
    accessToken: string
    refreshToken: string
    error?: string
  }
}
