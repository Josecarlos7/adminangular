import { Injectable, signal, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', delay: number = 5000) {
    const newToast: Toast = { message, type, delay };
    this.toastsSubject.next([...this.toastsSubject.value, newToast]);
  }

  remove(index: number) {
    const currentToasts = this.toastsSubject.value;
    currentToasts.splice(index, 1);
    this.toastsSubject.next([...currentToasts]);
  }

  clear() {
    this.toastsSubject.next([]);
  }

  showSuccess(message: string, delay: number = 5000) {
    console.log('NotificationsService.showSuccess',message);
    this.show(message, 'success', delay);
  }

  showError(message: string, delay: number = 5000) {
    this.show(message, 'error', delay);
  }

  showWarning(message: string, delay: number = 5000) {
    this.show(message, 'warning', delay);
  }

  showInfo(message: string, delay: number = 5000) {
    this.show(message, 'info', delay);
  }
}
