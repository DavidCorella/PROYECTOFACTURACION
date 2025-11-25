import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Perfil } from './components/perfil/perfil';
import { Dashboard } from './components/dashboard/dashboard';
import { Facturas } from './components/facturas/facturas';
import { FacturasForm } from './components/facturas/facturas-form/facturas-form';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: Perfil },
  { path: 'dashboard', component: Dashboard },
  { path: 'dashboard/facturas', component: Facturas },
  { path: 'dashboard/facturas/form', component: FacturasForm },
  { path: 'dashboard/facturas/:id', component: FacturasForm }
];