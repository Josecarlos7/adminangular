import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:7070/api';

  private userCountSource = new BehaviorSubject<number>(0);
  userCount$ = this.userCountSource.asObservable();

  // Opciones HTTP para POST
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Agrega otros headers si son necesarios (ej: Authorization)
    })
  };

  constructor(
    private http: HttpClient
  ) {
    this.loadInitialUserCount();
  }

  listUsers(filters?: any): Observable<User[]> {
    console.log('[services.user-service].[LISTADO DE USUARIOS]');
    const requestBody = {
      action: 'list',
      ...filters // Filtros opcionales
    };

    return this.http.post<User[]>(
      `${this.apiUrl}/list`, // Mismo endpoint pero con POST
      requestBody,          // Body requerido en POST
      this.httpOptions      // Headers configurados
    );
  }

  private loadInitialUserCount(filters?: any): void {
    console.log('[services.user-service].[loadInitialUserCount]',this.userCountSource);
    this.listUsers().subscribe({
      next: (data) => this.userCountSource.next(data.length),
      error: (error) => console.error('Error al cargar datos de usuarios:', error)
    })
  }

  createUser(filters?: any): Observable<User[]> {
    const requestBody = {
      action: 'create',
      ...filters // Filtros opcionales
    };

    return this.http.post<User[]>(
      `${this.apiUrl}/create`, // Mismo endpoint pero con POST
      requestBody,          // Body requerido en POST
      this.httpOptions      // Headers configurados
    ).pipe(
      tap(() => {
        this.loadInitialUserCount(); // Actualizar contador
      })
    );
  }

  updateUser(filters?: any): Observable<User[]> {
    const requestBody = {
      action: 'update',
      ...filters
    };

    return this.http.post<User[]>(
      `${this.apiUrl}/update`, // Mismo endpoint pero con POST
      requestBody,          // Body requerido en POST
      this.httpOptions      // Headers configurados
    );
  }

  deleteUser(filters?: any): Observable<User[]> {
    const requestBody = {
      action: 'delete',
      ...filters
    };

    return this.http.post<User[]>(
      `${this.apiUrl}/delete`, // Mismo endpoint pero con POST
      requestBody,          // Body requerido en POST
      this.httpOptions      // Headers configurados
    ).pipe(
      tap(() => {
        this.loadInitialUserCount(); // Actualizar contador
      })
    );
  }
  
}
