import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Quote } from "../backend";

export function useGetQuotes() {
  const { actor, isFetching } = useActor();

  return useQuery<Quote[]>({
    queryKey: ["quotes"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getQuotes();
      return result;
    },
    // Only block on isFetching if actor is not yet available
    // Once actor exists, allow queries even if isFetching is still true
    enabled: !!actor,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 5,
  });
}
