'use client'

import { PropsWithChildren, useCallback, useState } from "react";
import {MockCTX } from ".";
import PostUseCase from "@interfaces/usecases/mock/PostUseCase";
import Post from "@models/mock/post";

interface Props {
    usecase: PostUseCase;
}

function PostProvider({ usecase, children }: PropsWithChildren<Props>) {
    const [posts, setPosts] = useState<Post[]>();

    const fetch = useCallback(() => {
        return usecase.fetch().then(setPosts).catch((value) => console.error("Error", value))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (<MockCTX.Provider
        value={
            {
                fetch,
                posts
            }
        }

    >
        {children}
    </MockCTX.Provider>)
}

export default PostProvider;