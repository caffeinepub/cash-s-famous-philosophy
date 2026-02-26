import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function QuoteCardSkeleton({ index }: { index: number }) {
    const wobbleClasses = ['card-wobble-1', 'card-wobble-2', 'card-wobble-3'];
    const wobble = wobbleClasses[index % wobbleClasses.length];

    return (
        <div className={`bg-card rounded-sm p-6 sm:p-8 shadow-warm border-l-4 border-amber-warm/40 ${wobble}`}>
            <Skeleton className="h-6 w-full mb-3 bg-espresso-light" />
            <Skeleton className="h-6 w-4/5 mb-3 bg-espresso-light" />
            <Skeleton className="h-6 w-3/5 mb-6 bg-espresso-light" />
            <Skeleton className="h-4 w-16 bg-espresso-light" />
        </div>
    );
}
