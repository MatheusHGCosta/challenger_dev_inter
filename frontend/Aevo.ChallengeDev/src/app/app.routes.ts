import { Routes } from '@angular/router';
import { AgendamentoListComponent } from './pages/Agendamento/agendamento-list/agendamento-list.component';
import { AgendamentoFormComponent } from './pages/Agendamento/agendamento-form/agendamento-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { SalaListComponent } from './pages/Sala/sala-list/sala-list.component';
import { SalaFormComponent } from './pages/Sala/sala-form/sala-form.component';
import { MenuComponent } from './pages/menu/menu.component';
export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'agendamentos', component: AgendamentoListComponent,canActivate: [AuthGuard]  },
  { path: 'agendamentos/novo', component: AgendamentoFormComponent,canActivate: [AuthGuard] },
  { path: 'agendamentos/editar/:id', component: AgendamentoFormComponent,canActivate: [AuthGuard] },
  { path: 'salas', component: SalaListComponent,canActivate: [AuthGuard]  },
  { path: 'salas/novo', component: SalaFormComponent,canActivate: [AuthGuard]  },
  { path: 'salas/editar/:id', component: SalaFormComponent,canActivate: [AuthGuard]  },
];
