import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgendamentoService, Agendamento } from '../../../services/agendamento.service';
import { Observable } from 'rxjs';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { AlertService } from '../../../services/alert.service';
@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule,FormsModule,TranslateModule],
  providers: [TranslatePipe],
  templateUrl: './agendamento-list.component.html'
})
export class AgendamentoListComponent implements OnInit {
  agendamentos$!: Observable<Agendamento[]>;
  ngOnInit(): void {
    this.agendamentos$ = this.agendamentoService.getAgendamentos();
  }

  constructor(
    private translatePipe : TranslatePipe,
    private agendamentoService : AgendamentoService,
    private alertCtrl : AlertService
  ){

  }
  delete(id: string) {
    this.agendamentoService.deleteAgendamento(id).subscribe({
      next: () => {
        this.alertCtrl.showSuccess(this.translatePipe.transform('ALERTAS.AGENDAMENTO_EXCLUIDO'));
        this.agendamentos$ = this.agendamentoService.getAgendamentos();
     },
     error: () =>{
      this.alertCtrl.showError(this.translatePipe.transform('ALERTAS.AGENDAMENTO_ERRO_EXCLUIR'));
    }
   });
  }
}
