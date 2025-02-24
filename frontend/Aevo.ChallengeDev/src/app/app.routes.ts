import { Routes,RouterModule } from '@angular/router';
import { AgendamentoListComponent } from './pages/Agendamento/agendamento-list/agendamento-list.component';
import { AgendamentoFormComponent } from './pages/Agendamento/agendamento-form/agendamento-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { SalaListComponent } from './pages/Sala/sala-list/sala-list.component';
import { SalaFormComponent } from './pages/Sala/sala-form/sala-form.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NgModule } from '@angular/core';
export const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { breadcrumb: 'Login' } },
  { path: 'menu', component: MenuComponent, data: { breadcrumb: 'Menu' } },
  { path: 'menu/agendamentos', component: AgendamentoListComponent, canActivate: [AuthGuard], data: { breadcrumb: 'BREADCRUMB.AGENDAMENTOS' } },
  { path: 'menu/agendamentos/sala/:id', component: AgendamentoListComponent, canActivate: [AuthGuard], data: { breadcrumb: 'BREADCRUMB.AGENDAMENTOS_POR_SALA' } },
  { path: 'menu/agendamentos/novo', component: AgendamentoFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'BREADCRUMB.NOVO_AGENDAMENTO' } },
  { path: 'menu/agendamentos/editar/:id', component: AgendamentoFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'BREADCRUMB.EDITAR_AGENDAMENTO' } },
  { path: 'menu/salas', component: SalaListComponent, canActivate: [AuthGuard], data: { breadcrumb: 'BREADCRUMB.SALAS' } },
  { path: 'menu/salas/novo', component: SalaFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'BREADCRUMB.NOVA_SALA' } },
  { path: 'menu/salas/editar/:id', component: SalaFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'BREADCRUMB.EDITAR_SALA' } },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}