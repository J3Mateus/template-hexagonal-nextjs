import NextAuth, { Session } from "next-auth"
import Keycloak from "next-auth/providers/keycloak"
import type { JWT } from "next-auth/jwt"

type SignOutMessage = { session: unknown } | { token: JWT | null }

interface KeycloakAccount {
  provider: string
  type: string
  providerAccountId: string
  access_token?: string
  expires_at?: number
  refresh_expires_in?: number
  refresh_token?: string
  token_type?: string
  id_token?: string
  scope?: string
  session_state?: string
}

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const details = {
      client_id: process.env.AUTH_KEYCLOAK_ID ?? '',
      client_secret: process.env.AUTH_KEYCLOAK_SECRET ?? '',
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken as string,
    }
    const formBody: string[] = []
    Object.entries(details).forEach(([key, value]: [string, string]) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value)
      formBody.push(`${encodedKey}=${encodedValue}`)
    })
    const formData = formBody.join('&')
    const tokenResponse = await fetch(
      `${process.env.AUTH_KEYCLOAK_ISSUER ?? ''}/protocol/openid-connect/token`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      },
    )
    const refreshedTokens = await tokenResponse.json()
    if (!tokenResponse.ok) throw refreshedTokens
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token,
      accessTokenExpiry: refreshedTokens.expires_in
        ? Date.now() + (refreshedTokens.expires_in - 15) * 1000
        : Date.now() + 300 * 1000,
      refreshTokenExpired:
        Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
      idToken: refreshedTokens.id_token,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

const doFinalSignoutHandshake = async (token: JWT | undefined) => {
  if (!token) return

  try {
    const params = new URLSearchParams()
    params.append('id_token_hint', token.idToken as string)

    await fetch(
      `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`,
    )
  } catch (e: unknown) {
    console.error('Unable to perform post-logout handshake', e)
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID ?? '',
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET ?? '',
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }: { token: JWT; account?: KeycloakAccount | null }) => {
      // Login inicial - configurar token com dados da conta
      if (account) {
        return {
          ...token,
          accessTokenExpired: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 300 * 1000,
          idToken: account.id_token ?? '',
          provider: account.provider,
          accessToken: account.access_token ?? '',
          refreshToken: account.refresh_token ?? '',
          refreshTokenExpired: account.refresh_expires_in
            ? Date.now() + (account.refresh_expires_in as number) * 1000
            : 0,
        }
      }

      // Token ainda válido - retornar sem refresh
      if (token.accessTokenExpired && Date.now() < (token.accessTokenExpired as number)) {
        return token
      }

      // Token expirado - tentar refresh
      if (token.refreshToken) {
        return refreshAccessToken(token)
      }

      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token) {
        session.accessToken = token.accessToken as string
        session.user.sub = token.sub!
        if (token.error) {
          session.error = token.error as string
          session.accessToken = ''
        }
      }

      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  events: {
    signOut: async (message: SignOutMessage) => {
      if ('token' in message && message.token) {
        await doFinalSignoutHandshake(message.token)
      }
    },
  },
})

