import React, { Component, ReactNode } from 'react';
import { siteConfig } from '../config/siteConfig';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ClayKriti ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-clay-ivory px-6 text-center gap-6">
          <div className="text-5xl">🏺</div>
          <h1 className="text-2xl font-serif font-bold text-clay-charcoal">
            Something went wrong
          </h1>
          <p className="text-clay-muted text-sm max-w-sm leading-relaxed">
            We're sorry! Please refresh the page or reach out to us on WhatsApp and we'll help you out.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full text-sm font-semibold transition-colors"
            >
              Refresh Page
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-terracotta-600 text-terracotta-700 hover:bg-terracotta-50 rounded-full text-sm font-semibold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
