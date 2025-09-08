import { Routes } from '@angular/router';
import { MenuHeader } from './admin/components/menu-header/menu-header';
import { Users } from './admin/users/users';
import { Permissions } from './admin/permissions/permissions';
import { Dashboard } from './admin/dashboard/dashboard';

export const routes: Routes = [
    {
    path: '',
    component: MenuHeader, // Tu layout con sidebar
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Página por defecto
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'permissions', component: Permissions },
      //{ path: 'dashboard', component: DashboardComponent },
      // Aquí agregarás más rutas después...
    ]
  }
];
