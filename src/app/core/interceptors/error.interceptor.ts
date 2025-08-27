import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationsService } from '../../admin/components/notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  private notification = inject(NotificationsService); 

  constructor(
    private router: Router,
    //private notification: NotificationService // Asegúrate de tener un servicio para mostrar notificaciones
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Aquí puedes manejar errores globalmente
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleHttpError(error);    
      })
      // Puedes agregar lógica para manejar errores aquí
      // Por ejemplo, mostrar un mensaje de error global
    );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    let showNotification = true;

    // Manejo específico por código de estado
    switch(error.status) {
      case 400:
        errorMessage = error.error?.message || 'Solicitud inválida';
        break;
      case 401:
        errorMessage = 'No autorizado';
        this.router.navigate(['/login']); // Redirige si no está autenticado
        break;
      case 403:
        errorMessage = 'Acceso prohibido';
        break;
      case 409:
        errorMessage = error.error?.message || 'Conflicto con el recurso';
        break;
      case 500:
        errorMessage = 'Error interno del servidor';
        break;
      default:
        // No mostrar notificación para errores que no son del servidor (ej: CORS)
        if (error.status === 0) {
          errorMessage = 'No hay conexión con el servidor';
        } else {
          showNotification = false;
        }
    }

    // Mostrar notificación (excepto para ciertos casos)
    if (showNotification) {
      console.log('ErrorInterceptor.handleHttpError',errorMessage);
      //this.notification.showError(errorMessage); 
    }

    // Log para desarrollo
    //console.log('Error HTTP:', {status: error.status,message: error.message,url: error.url,details: error.error});

    return throwError(() => ({
      message: errorMessage,
      status: error.status,
      details: error.error
    }));
  }
}
