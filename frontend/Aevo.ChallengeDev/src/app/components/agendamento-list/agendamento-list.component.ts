import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgendamentoService, Agendamento } from '../../services/agendamento.service';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule,FormsModule,TranslateModule],
  templateUrl: './agendamento-list.component.html'
})
export class AgendamentoListComponent implements OnInit {
  agendamentoService = inject(AgendamentoService);
  agendamentos$!: Observable<Agendamento[]>;
  ngOnInit(): void {
    this.agendamentos$ = this.agendamentoService.getAgendamentos();
  }
  delete(id: string) {
    this.agendamentoService.deleteAgendamento(id).subscribe({
      next: (suc) => {
        this.agendamentos$ = this.agendamentoService.getAgendamentos();
     },
     error: (err) => alert(err)
   });
  }
}
