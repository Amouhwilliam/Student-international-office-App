import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppToastService {
  toasts: any[] = [];

  show(header: string, body: string, type: string) {
    let classname = type === 'success' ? 'bg-success text-light' : type === 'error' ? 'bg-danger text-light' : null
    this.toasts.push({ header, body , classname});
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}