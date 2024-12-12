import { type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { WidgetConfig, WidgetInstance } from './types';

export class Widget implements WidgetInstance {
  private elementId: string;
  private root: Root | null = null;
  private onInit?: () => void;
  private onDestroy?: () => void;

  constructor(config: WidgetConfig) {
    this.elementId = config.elementId;
    this.onInit = config.onInit;
    this.onDestroy = config.onDestroy;
    this.initialize();
  }

  private initialize(): void {
    const container = document.getElementById(this.elementId);
    if (!container) {
      console.warn(`Element with id "${this.elementId}" not found`);
      return;
    }

    this.root = createRoot(container);
    this.onInit?.();
  }

  public render(element: ReactElement): void {
    if (!this.root) {
      console.warn('Widget not properly initialized');
      return;
    }
    
    this.root.render(element);
  }

  public destroy(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
      this.onDestroy?.();
    }
  }
}