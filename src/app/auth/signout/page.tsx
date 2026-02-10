'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'

export default function SignOutPage() {
  const router = useRouter()
  const { status } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? '/' })
  }

  const redirect = useCallback(() => {
    router.push('/')
  }, [router])

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect()
    }
  }, [redirect, status])

  return (
    <div>
      <div >
        <div>
          <span>
            Template [Name project]
          </span>
        </div>
        <div>
          <div >
            <div>
              <label>
                Você realmente deseja sair?
              </label>
            </div>
            <button
              onClick={handleSignOut}
            >
              <span>
                Sair
              </span>
            </button>
          </div>
        </div>
        <span >
          v2.0.0
        </span>
      </div>
    </div>
  )
}
