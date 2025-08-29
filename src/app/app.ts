import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Users } from "./admin/users/users";
import { CommonModule } from '@angular/common';
import { NotificationGeneral } from './admin/components/notifications/notification-general';
import { MenuHeader } from "./admin/components/menu-header/menu-header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, Users, CommonModule, NotificationGeneral, MenuHeader],
  templateUrl: './app.html',
  standalone: true, 
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('adminangular');
}
