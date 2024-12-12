import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

class MortgageCalculatorWidget {
  private root: ReturnType<typeof createRoot> | null = null;

  constructor(elementId: string) {
    const container = document.getElementById(elementId);
    if (!container) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    this.root = createRoot(container);
    this.render();
  }

  private render() {
    if (!this.root) return;
    
    this.root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(App)
      )
    );
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

export function initMortgageCalculator(elementId: string) {
  return new MortgageCalculatorWidget(elementId);
}

// Make it globally available
(window as any).initMortgageCalculator = initMortgageCalculator;

// Auto-initialize if in standalone mode
if (import.meta.env.DEV) {
  const element = document.getElementById('mortgage-calculator');
  if (element) {
    initMortgageCalculator('mortgage-calculator');
  }
}