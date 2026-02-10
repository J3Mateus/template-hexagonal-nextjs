import { useContextSelector } from "use-context-selector";
import { MockCTX } from ".";

export function useFetchPost() {
	return useContextSelector(MockCTX, (ctx) => ctx.fetch);
}

export function usePost() {
    return useContextSelector(MockCTX, (ctx) => ctx.posts);
}