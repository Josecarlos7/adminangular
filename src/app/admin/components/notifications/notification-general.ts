import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from './notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-general',
  imports: [NgbToastModule, AsyncPipe],
  standalone: true,
  template: `
  <div class="toast-container">
		@for (toast of toastService.toasts$ | async; track $index; let i = $index) {
      <ngb-toast
        [class]="getToastClass(toast.type)"
        [autohide]="true"
        [delay]="toast.delay || 5000"
        [class]="getToastClass(toast.type)"
        (hidden)="toastService.remove(i)"
      >
        {{ toast.message }}
      </ngb-toast>
    }
    </div>
	`
})
export class NotificationGeneral {
  toastService = inject(NotificationsService);

  getToastClass(type: string): string {
    const classes = {
      success: 'bg-success text-white',
      error: 'bg-danger text-white',
      warning: 'bg-warning text-dark',
      info: 'bg-info text-white'
    };
    return classes[type as keyof typeof classes] || 'bg-info text-white';
  }
}
