import { Routes } from '@angular/router';
import { MenuHeader } from './admin/components/menu-header/menu-header';
import { Users } from './admin/users/users';

export const routes: Routes = [
    {
    path: '',
    component: MenuHeader, // Tu layout con sidebar
    children: [
      { path: '', component: Users }, // Página por defecto
      //{ path: 'dashboard', component: DashboardComponent },
      // Aquí agregarás más rutas después...
    ]
  }
];
