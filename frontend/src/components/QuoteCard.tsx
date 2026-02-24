import React from 'react';

interface QuoteCardProps {
    quote: string;
    index: number;
}

const wobbleClasses = [
    'card-wobble-1',
    'card-wobble-2',
    'card-wobble-3',
    'card-wobble-4',
    'card-wobble-5',
];

const accentSymbols = ['✦', '◆', '★', '❋', '✿', '◉', '⬡'];

const cardStyles = [
    'border-l-4 border-primary',
    'border-t-4 border-primary',
    'border-dashed-warm',
    'border-2 border-primary/60',
    'border-r-4 border-primary',
];

export function QuoteCard({ quote, index }: QuoteCardProps) {
    const wobble = wobbleClasses[index % wobbleClasses.length];
    const cardStyle = cardStyles[index % cardStyles.length];
    const accent = accentSymbols[index % accentSymbols.length];

    return (
        <article
            className={`
                relative bg-card rounded-sm p-6 sm:p-8
                shadow-warm hover:shadow-warm-lg
                transition-all duration-300 ease-out cursor-default
                ${wobble} ${cardStyle}
            `}
            style={{
                animationDelay: `${index * 80}ms`,
                animation: 'fade-in-up 0.5s ease-out forwards',
                opacity: 0,
            }}
        >
            {/* Decorative top accent */}
            <div className="absolute -top-3 left-6 font-handwritten text-primary text-xl font-bold select-none">
                {accent}
            </div>

            {/* Big opening quote mark */}
            <div
                className="absolute top-2 left-3 font-slab text-7xl leading-none text-primary/20 select-none pointer-events-none"
                aria-hidden="true"
            >
                "
            </div>

            {/* Quote number badge */}
            <div className="absolute top-3 right-4 font-handwritten text-muted-foreground text-sm select-none">
                #{index + 1}
            </div>

            {/* Quote text */}
            <blockquote className="relative z-10 mt-2">
                <p className="font-slab text-lg sm:text-xl leading-relaxed text-foreground font-medium italic">
                    {quote}
                </p>
            </blockquote>

            {/* Closing quote mark */}
            <div
                className="absolute bottom-2 right-4 font-slab text-5xl leading-none text-primary/20 select-none pointer-events-none"
                aria-hidden="true"
            >
                "
            </div>

            {/* Bottom attribution */}
            <footer className="mt-4 pt-3 border-t border-border/50">
                <cite className="font-handwritten text-primary text-base not-italic font-semibold">
                    — Cash
                </cite>
            </footer>
        </article>
    );
}
