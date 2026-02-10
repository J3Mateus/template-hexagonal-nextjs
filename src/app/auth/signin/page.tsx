'use client'

import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'

export default function SignInPage() {
  const router = useRouter()
  const { status } = useSession()

  const redirect = useCallback(() => {
    router.push('/')
  }, [router])

  const handleSignIn = async () => {
    await signIn('keycloak')
  }

  useEffect(() => {
    if (status === 'authenticated') {
      redirect()
    }
  }, [status, redirect])

  return (
    <>
      {status !== 'unauthenticated' ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <div >
            <div >
            </div>
            <div>
              <span>
                Name Project[Template]
              </span>
            </div>
            <div >
              <div >
                <div >
                  <label>
                    Efetue o seu login para utilizar o sistema.
                  </label>
                </div>
                <button
                  onClick={() => {
                    handleSignIn()
                  }}
                >
                  <span>
                    Efetuar Login
                  </span>
                </button>
              </div>
            </div>
            <span >
              v1.0.0
            </span>
          </div>
        </div>
      )}
    </>
  )
}
