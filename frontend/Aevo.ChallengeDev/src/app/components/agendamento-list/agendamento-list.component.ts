import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgendamentoService, Agendamento } from '../../services/agendamento.service';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule,FormsModule],
  templateUrl: './agendamento-list.component.html'
})
export class AgendamentoListComponent {
  agendamentoService = inject(AgendamentoService);
  agendamentos$ = this.agendamentoService.getAgendamentos();

  delete(id: number) {
    this.agendamentoService.deleteAgendamento(id);
  }
}
