'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Erro de Autenticação</h1>
      <p><strong>Código do erro:</strong> {error}</p>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Possíveis causas:</h3>
        <ul>
          <li><strong>Configuration:</strong> Variáveis de ambiente não configuradas</li>
          <li><strong>OAuthCallback:</strong> Problema no callback do Keycloak</li>
          <li><strong>OAuthSignin:</strong> Erro ao iniciar o login</li>
          <li><strong>AccessDenied:</strong> Acesso negado pelo provedor</li>
        </ul>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h3>Verifique seu arquivo .env:</h3>
        <pre style={{ fontSize: '0.9rem' }}>
{`AUTH_SECRET=<sua-chave-secreta>
AUTH_URL=http://localhost:3000
AUTH_KEYCLOAK_ID=<client-id>
AUTH_KEYCLOAK_SECRET=<client-secret>
AUTH_KEYCLOAK_ISSUER=http://localhost:8080/realms/<realm>`}
        </pre>
      </div>

      <a href="/" style={{ display: 'inline-block', marginTop: '1rem', color: 'blue' }}>
        Voltar para a página inicial
      </a>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ErrorContent />
    </Suspense>
  )
}

