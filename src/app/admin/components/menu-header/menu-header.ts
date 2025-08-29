import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { User } from '../../models/User';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-header',
  imports: [RouterOutlet, CommonModule, FontAwesomeModule],
  standalone: true,
  templateUrl: './menu-header.html',
  styleUrl: './menu-header.css'
})
export class MenuHeader {

  constructor(private userService: UsersService, private offcanvasService: NgbOffcanvas) { }

  users: User[] = [];
  countUsers: number = 0;
  private subscription: Subscription = new Subscription();

  private userCountSource = new BehaviorSubject<number>(0);
  userCount$ = this.userCountSource.asObservable();

  isSidebarCollapsed = false; // Por defecto visible

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  // Alternar visibilidad del sidebar
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Opcional: métodos para control específico
  openSidebar() {
    this.isSidebarCollapsed = false;
  }

  closeSidebar() {
    this.isSidebarCollapsed = true;
  }
  subscribeToUserCount() {
    this.subscription = this.userService.userCount$.subscribe(
      (count) => {
        this.countUsers = count;
        console.log('[components.menu-header].[subscribeToUserCount].[count] ==>> ', count);
      }
    );
  }
}
