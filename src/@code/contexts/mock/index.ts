"use client";

import Post from "@models/mock/post";
import { createContext } from "use-context-selector";

interface Props {
    fetch(): Promise<void>;
    posts?: Post[];
}

export const MockCTX = createContext({} as Props);