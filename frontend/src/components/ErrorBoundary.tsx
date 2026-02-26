import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[60vh] flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <div className="font-handwritten text-amber-warm text-5xl mb-4">✦</div>
                        <h2 className="font-slab text-2xl font-bold text-cream mb-3">
                            Something went sideways
                        </h2>
                        <p className="font-handwritten text-cream-muted text-lg mb-6">
                            Even Cash's deepest wisdom couldn't prevent this one.
                        </p>
                        {import.meta.env.DEV && this.state.error && (
                            <pre className="text-left bg-espresso-dark/80 text-cream-muted text-xs p-4 rounded overflow-auto border border-amber-warm/20 mb-4">
                                {this.state.error.message}
                            </pre>
                        )}
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="font-slab text-sm text-amber-warm underline underline-offset-2 hover:text-primary transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
