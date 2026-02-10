'use client'

import MockProvider from "@web/contexts/mock/provider";
import { NextDIContainer } from "@web/dicontainer";
import { PropsWithChildren } from "react";

export function AppConfigSetup({
    children,
}: PropsWithChildren) {

    return (
        <MockProvider usecase={NextDIContainer.getMockUseCase()}>
            {children}
        </MockProvider>
    );
}
