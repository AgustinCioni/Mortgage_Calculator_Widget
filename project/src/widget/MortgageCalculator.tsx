import React from 'react';
import { Widget } from './Widget';
import App from '../App';
import type { WidgetInstance } from './types';

export class MortgageCalculator {
  private widget: WidgetInstance;

  constructor(elementId: string) {
    this.widget = new Widget({
      elementId,
      onInit: () => console.debug('Mortgage Calculator initialized'),
      onDestroy: () => console.debug('Mortgage Calculator destroyed')
    });

    this.render();
  }

  private render(): void {
    this.widget.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  public destroy(): void {
    this.widget.destroy();
  }
}