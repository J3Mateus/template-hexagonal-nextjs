'use client'
import { PropsWithChildren } from "react"
import { signIn, useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import { Spin } from 'antd';
import { NextDIContainer } from '@/@code/dicontainer'

export default function Protected({ children }: PropsWithChildren) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const pathname = usePathname();

    if (session && session.error === "RefreshAccessTokenError") {
        signIn('keycloak');
    }

    if (status === "loading") {
        return (<Spin tip="Carregando...." spinning={true} fullscreen />)
    } else if (status === "unauthenticated") {
        signIn('keycloak')
    } else {
        // Check if the user is already authenticated and is not on the homepage
        if (session && session.user && pathname !== '/') {
            //TODO: Melhorar essa parte, pois está sendo chamado o DIContainer diretamente
            //Não se chama o DIContainer diretamente isso foi feito pois é necessario salvar o token para envio para o back-end
            NextDIContainer.getAuthUseCase().saveAuthorization(session.accessToken)
            return (
                <>
                    {children}
                </>
            )
        } else {
            router.push("/inicio")
        }
    }

    return null; // Render nothing if loading or unauthenticated
}
