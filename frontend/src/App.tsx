import React from 'react';
import { QuotesPage } from './pages/QuotesPage';
import { ErrorBoundary } from './components/ErrorBoundary';

function Footer() {
    const year = new Date().getFullYear();
    const appId = encodeURIComponent(
        typeof window !== 'undefined' ? window.location.hostname : 'cashes-famous-philosophy'
    );

    return (
        <footer className="border-t border-border/50 bg-espresso-dark/50 py-8 mt-8">
            <div className="container max-w-5xl mx-auto px-4 text-center space-y-3">
                {/* Decorative */}
                <div className="font-handwritten text-primary text-lg">
                    ✦ ✦ ✦
                </div>

                <p className="font-slab text-muted-foreground text-sm">
                    © {year} Cash's Famous Philosophy. All wisdom reserved.
                </p>

                <p className="font-handwritten text-muted-foreground text-base">
                    Built with{' '}
                    <span className="text-primary" aria-label="love">♥</span>
                    {' '}using{' '}
                    <a
                        href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-accent-foreground underline underline-offset-2 transition-colors"
                    >
                        caffeine.ai
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <div className="flex-1">
                <ErrorBoundary>
                    <QuotesPage />
                </ErrorBoundary>
            </div>
            <Footer />
        </div>
    );
}
