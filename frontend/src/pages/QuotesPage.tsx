import React, { useState, useEffect } from 'react';
import { QuoteCard } from '../components/QuoteCard';
import { QuoteCardSkeleton } from '../components/QuoteCardSkeleton';
import { useGetQuotes } from '../hooks/useQueries';
import { RefreshCw } from 'lucide-react';

export function QuotesPage() {
    const { data: quotes, isPending, isFetching, isError, refetch } = useGetQuotes();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    // isLoading covers both initial load and active retry attempts
    const isLoading = isPending || isFetching;

    useEffect(() => {
        if (!quotes || quotes.length <= 1) return;

        const interval = setInterval(() => {
            // Fade out
            setVisible(false);

            // After fade-out, advance index and fade back in
            setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % quotes.length);
                setVisible(true);
            }, 500);
        }, 4500);

        return () => clearInterval(interval);
    }, [quotes]);

    const renderContent = () => {
        // Show skeleton while loading OR while retrying (isFetching stays true during retries)
        if (isLoading) {
            return (
                <div className="flex justify-center">
                    <div className="w-full max-w-lg">
                        <QuoteCardSkeleton index={0} />
                    </div>
                </div>
            );
        }

        // Only show error after all retries are exhausted (isError=true and no longer fetching)
        if (isError && !isFetching) {
            return (
                <div className="text-center py-16 flex flex-col items-center gap-4">
                    <p className="font-handwritten text-amber-warm text-3xl">
                        Hmm, the wisdom got lost in thought...
                    </p>
                    <p className="font-slab text-cream-muted mt-1">
                        We couldn't connect to the philosophy vault. Please try again.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-warm/50 text-amber-warm font-slab text-sm hover:bg-amber-warm/10 transition-colors"
                    >
                        <RefreshCw size={15} />
                        Try again
                    </button>
                </div>
            );
        }

        if (!quotes || quotes.length === 0) {
            return (
                <div className="text-center py-16">
                    <p className="font-handwritten text-amber-warm text-3xl">
                        The wisdom is still brewing...
                    </p>
                    <p className="font-slab text-cream-muted mt-2">
                        Check back soon for profound thoughts.
                    </p>
                </div>
            );
        }

        const currentQuote = quotes[currentIndex] ?? quotes[0];

        return (
            <div className="flex flex-col items-center gap-8">
                {/* Single cycling quote */}
                <div
                    className={`w-full max-w-lg quote-cycle ${visible ? 'quote-visible' : 'quote-hidden'}`}
                >
                    <QuoteCard quote={currentQuote} index={currentIndex} />
                </div>

                {/* Dot indicators */}
                <div className="flex items-center gap-3 mt-2">
                    {quotes.map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-500 ${
                                i === currentIndex
                                    ? 'w-3 h-3 bg-amber-warm'
                                    : 'w-2 h-2 bg-amber-warm/30'
                            }`}
                        />
                    ))}
                </div>

                <div className="text-center mt-2">
                    <span className="font-handwritten text-cream-muted text-lg">
                        {quotes.length} piece{quotes.length !== 1 ? 's' : ''} of wisdom and counting
                    </span>
                </div>
            </div>
        );
    };

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
                    <div className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-transparent to-background" />
                </div>
            </section>

            {/* Header */}
            <header className="text-center px-4 pt-8 pb-4">
                <div className="font-handwritten text-amber-warm text-xl mb-2 tracking-wide">
                    ✦ a collection of profound wisdom ✦
                </div>
                <h1 className="font-slab text-4xl sm:text-5xl md:text-6xl font-bold text-cream text-shadow-warm leading-tight">
                    Cash's Famous
                    <br />
                    <span className="text-amber-warm italic">Philosophy</span>
                </h1>
                <p className="mt-4 font-handwritten text-cream-muted text-lg sm:text-xl max-w-xl mx-auto">
                    Thoughts so deep, they might just be shallow. Or maybe the other way around.
                </p>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <div className="h-px w-16 bg-amber-warm/40" />
                    <span className="text-amber-warm text-xl">◆</span>
                    <div className="h-px w-16 bg-amber-warm/40" />
                </div>
            </header>

            {/* Quote Display */}
            <section className="container max-w-5xl mx-auto px-4 py-10">
                {renderContent()}
            </section>
        </main>
    );
}
