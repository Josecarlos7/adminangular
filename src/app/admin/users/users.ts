import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbDatepickerModule, NgbDateStruct, NgbInputDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/User';
import { UsersService } from './users.service';
import { ModalBase } from '../components/modal-base/modal-base';
import { NotificationsService } from '../components/notifications/notifications.service';
import { DatePicker } from "../components/date-picker/date-picker";
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // ← Módulo completo
import { faUser, faCalendar, faSave, faPlus, faPen, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, NgbCarouselModule, NgbDatepickerModule, DatePicker, FaIconComponent, FontAwesomeModule],
  templateUrl: './users.html',
  standalone: true,
  styleUrl: './users.css'
})
export class Users {
  users: User[] = [];
  newUser: User = new User();
  updUser: User = new User();
  delUser: User = new User();
  modalRef: any;
  isProcessing: boolean = false;
  private notification = inject(NotificationsService); // ← Inyección correcta

  faPlus = faPlus;
  fauser = faUser;
  faCalendar = faCalendar;
  faSave = faSave;
  faPen = faPen;
  faTrash = faTrashAlt;
  faEye = faEye;


  constructor(
    private userService: UsersService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.loadUsers();
  }
  // Usamos ViewChild para acceder a las plantillas de los modales
  @ViewChild('formTemplate') formTemplate!: TemplateRef<any>;

  loadUsers() {
    this.userService.listUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error('Error al cargar datos de usuarios:', error)
    })
  }

  openModalData(user: User, template: TemplateRef<any>, templateButton: TemplateRef<any>, title: string): void {
    this.modalRef = this.modalService.open(ModalBase, {
      size: 'lg',
      centered: false
    });

    // Asignar propiedades DESPUÉS de crear la referencia 
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.contentTemplate = template;
    this.modalRef.componentInstance.contentButton = templateButton;
    this.updUser = { ...user }; // Clonar el usuario para evitar modificaciones directas
  }



  openModalRegistro(template: TemplateRef<any>, templateButton: TemplateRef<any>, title: string): void {
    this.modalRef = this.modalService.open(ModalBase, {
      size: 'lg',
      centered: false
    });

    // Asignar propiedades DESPUÉS de crear la referencia 
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.contentTemplate = template;
    this.modalRef.componentInstance.contentButton = templateButton;
  }

  saveUser(modalRef?: any) {
    console.log('Users.saveUser', this.newUser);
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;

    this.userService.createUser(this.newUser).subscribe({
      next: (data) => {
        this.loadUsers(); // Recargar la lista de usuarios
        this.newUser = new User(); // Reset form
        this.notification.showSuccess('Usuario creado exitosamente');
        this.modalRef.dismiss();
        this.isProcessing = false;
      },
      error: (error) => {
        this.notification.showError(error.message);
        this.isProcessing = false;
      }
    });
  }

  openModalEdita(user: User, template: TemplateRef<any>, templateButton: TemplateRef<any>, title: string): void {
    this.modalRef = this.modalService.open(ModalBase, {
      size: 'lg',
      centered: false
    });

    // Asignar propiedades DESPUÉS de crear la referencia 
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.contentTemplate = template;
    this.modalRef.componentInstance.contentButton = templateButton;
    this.updUser = { ...user }; // Clonar el usuario para evitar modificaciones directas
  }

  updateUser(modalRef?: any) {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    this.userService.updateUser(this.updUser).subscribe({
      next: (data) => {
        this.loadUsers(); // Recargar la lista de usuarios
        this.notification.showSuccess('Usuario actualizado exitosamente');
        this.modalRef.dismiss();
        this.isProcessing = false;
      },
      error: (error) => {
        this.notification.showError(error.message);
        this.isProcessing = false;
      }
    });
  }

  openModalElimina(user: User, template: TemplateRef<any>, templateButton: TemplateRef<any>, title: string): void {
    this.modalRef = this.modalService.open(ModalBase, {
      size: '',
      centered: true
    });

    // Asignar propiedades DESPUÉS de crear la referencia 
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.contentTemplate = template;
    this.modalRef.componentInstance.contentButton = templateButton;
    this.delUser = { ...user }; // Clonar el usuario para evitar modificaciones directas
  }

  deleteUser(modalRef?: any) {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    this.userService.deleteUser(this.delUser).subscribe({
      next: (data) => {
        this.loadUsers(); // Recargar la lista de usuarios
        this.notification.showSuccess('Usuario eliminado exitosamente');
        this.modalRef.dismiss();
        this.isProcessing = false;
      },
      error: (error) => {
        this.notification.showError(error.message);
        this.isProcessing = false;
      }
    });
  }

}
