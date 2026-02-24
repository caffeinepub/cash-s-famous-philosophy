import React from 'react';
import { QuoteCard } from '../components/QuoteCard';
import { QuoteCardSkeleton } from '../components/QuoteCardSkeleton';
import { useGetQuotes } from '../hooks/useQueries';

export function QuotesPage() {
    const { data: quotes, isLoading, isError } = useGetQuotes();

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Banner */}
            <section className="relative w-full overflow-hidden">
                <div className="relative w-full" style={{ maxHeight: '300px' }}>
                    <img
                        src="/assets/generated/philosophy-banner.dim_1200x300.png"
                        alt="Cash's Famous Philosophy — swirling thought bubbles, question marks, fruits and a tongue"
                        className="w-full object-cover object-center"
                        style={{ maxHeight: '300px' }}
                    />
                    {/* Overlay gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-transparent to-background" />
                </div>
            </section>

            {/* Header */}
            <header className="text-center px-4 pt-8 pb-4">
                <div className="font-handwritten text-primary text-xl mb-2 tracking-wide">
                    ✦ a collection of profound wisdom ✦
                </div>
                <h1 className="font-slab text-4xl sm:text-5xl md:text-6xl font-bold text-foreground text-shadow-warm leading-tight">
                    Cash's Famous
                    <br />
                    <span className="text-primary italic">Philosophy</span>
                </h1>
                <p className="mt-4 font-handwritten text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto">
                    Thoughts so deep, they might just be shallow. Or maybe the other way around.
                </p>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <div className="h-px w-16 bg-primary/40" />
                    <span className="text-primary text-xl">◆</span>
                    <div className="h-px w-16 bg-primary/40" />
                </div>
            </header>

            {/* Quotes Grid */}
            <section className="container max-w-5xl mx-auto px-4 py-10">
                {isError && (
                    <div className="text-center py-16">
                        <p className="font-handwritten text-destructive text-2xl">
                            Something went wrong loading the wisdom...
                        </p>
                        <p className="font-slab text-muted-foreground mt-2">
                            Even Cash couldn't have predicted this.
                        </p>
                    </div>
                )}

                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <QuoteCardSkeleton key={i} index={i} />
                        ))}
                    </div>
                )}

                {!isLoading && !isError && quotes && quotes.length === 0 && (
                    <div className="text-center py-16">
                        <p className="font-handwritten text-primary text-3xl">
                            The wisdom is still brewing...
                        </p>
                        <p className="font-slab text-muted-foreground mt-2">
                            Check back soon for profound thoughts.
                        </p>
                    </div>
                )}

                {!isLoading && !isError && quotes && quotes.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                            {quotes.map((quote, index) => (
                                <QuoteCard key={index} quote={quote} index={index} />
                            ))}
                        </div>

                        {/* Quote count */}
                        <div className="text-center mt-12">
                            <span className="font-handwritten text-muted-foreground text-lg">
                                {quotes.length} piece{quotes.length !== 1 ? 's' : ''} of wisdom and counting
                            </span>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
