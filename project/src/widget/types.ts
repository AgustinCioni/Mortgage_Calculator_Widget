import { type ReactElement } from 'react';

export interface WidgetConfig {
  elementId: string;
  onInit?: () => void;
  onDestroy?: () => void;
}

export interface WidgetInstance {
  destroy: () => void;
  render: (element: ReactElement) => void;
}

declare global {
  interface Window {
    React: typeof import('react');
    ReactDOM: typeof import('react-dom');
    initMortgageCalculator: (elementId: string) => void;
  }
}