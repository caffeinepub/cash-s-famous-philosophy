import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Quote } from '../backend';

export function useGetQuotes() {
    const { actor, isFetching } = useActor();

    return useQuery<Quote[]>({
        queryKey: ['quotes'],
        queryFn: async () => {
            if (!actor) {
                return [];
            }
            const result = await actor.getQuotes();
            return result;
        },
        enabled: !!actor && !isFetching,
        staleTime: 60_000,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
    });
}
