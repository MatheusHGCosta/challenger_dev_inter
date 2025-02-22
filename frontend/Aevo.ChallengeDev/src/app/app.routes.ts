import { Routes } from '@angular/router';
import { AgendamentoListComponent } from './components/agendamento-list/agendamento-list.component';
import { AgendamentoFormComponent } from './components/agendamento-form/agendamento-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'agendamentos', component: AgendamentoListComponent,canActivate: [AuthGuard]  },
  { path: 'agendamentos/novo', component: AgendamentoFormComponent,canActivate: [AuthGuard] },
  { path: 'agendamentos/editar/:id', component: AgendamentoFormComponent,canActivate: [AuthGuard] }
];
