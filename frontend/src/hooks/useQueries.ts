import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetQuotes() {
    const { actor, isFetching } = useActor();

    return useQuery<string[]>({
        queryKey: ['quotes'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getQuotes();
        },
        enabled: !!actor && !isFetching,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
