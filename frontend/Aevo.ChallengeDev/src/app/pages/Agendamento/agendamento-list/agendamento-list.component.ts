import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  templateUrl: './agendamento-list.component.html',
  styleUrl: './agendamento-list.component.scss'
})
export class AgendamentoListComponent implements OnInit {
  agendamentos$!: Observable<Agendamento[]>;
  ngOnInit(): void {}

  idSala : string | null = null;
  constructor(
    private route : ActivatedRoute,
    private agendamentoService : AgendamentoService,
    private alertCtrl : AlertService
  ){
    this.route.paramMap.subscribe(params => {
      this.idSala = params.get('id');
      if (this.idSala) {
        this.agendamentos$ = this.agendamentoService.getAgendamentosSala(this.idSala);
      }else{
        this.agendamentos$ = this.agendamentoService.getAgendamentos();
      }
    });
  }
  delete(id: string) {
    this.agendamentoService.deleteAgendamento(id).subscribe({
      next: () => {
        this.alertCtrl.showSuccess('ALERTAS.AGENDAMENTO_EXCLUIDO');
        this.agendamentos$ = this.agendamentoService.getAgendamentos();
     },
     error: () =>{
      this.alertCtrl.showError('ALERTAS.AGENDAMENTO_ERRO_EXCLUIR');
    }
   });
  }
}
