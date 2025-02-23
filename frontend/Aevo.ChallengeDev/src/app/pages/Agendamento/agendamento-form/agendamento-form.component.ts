import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AgendamentoService, Agendamento } from '../../../services/agendamento.service';
import { DatePicker } from 'primeng/datepicker';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { AlertService } from '../../../services/alert.service';
import { SalaService } from '../../../services/sala.service';
export interface Sala {
  id: string; 
  nome: string;
  descricao?: string | null;
  capacidade: number;
  fusoHorario: string;
}

export interface AgendamentoReqBody{
  inicio: Date;
  fim: Date;
}

@Component({
  selector: 'app-agendamento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule,DatePicker,TranslateModule,RouterModule],
  providers: [TranslatePipe],
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css']
})
export class AgendamentoFormComponent {
  
  id : string | null = '';
  agendamento : Agendamento | null = null;

  sala: Sala = {
    id:'6CF59D00-2B17-41C7-9C77-030F7D412868',
    nome: 'Sala de Conferência Berlim',
    descricao:'Sala para conferências internacionais em Berlim',
    capacidade: 29,
    fusoHorario: 'Europe/Berlin'
  }


  salas:Sala[] =[]
  isEditMode = false;

  constructor(
    private alertCtrl : AlertService,
    private route : ActivatedRoute,
    private router : Router,
    private agendamentoService : AgendamentoService,
    private salaService : SalaService
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.isEditMode = true;
        this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
          const agendamentoExistente = agendamentos.find(a => a.id === this.id);
          if (agendamentoExistente) {
            this.agendamento = {
                id: agendamentoExistente.id,
                salaId: agendamentoExistente.salaId,
                salaNome: agendamentoExistente.salaNome,
                usuarioId: agendamentoExistente.usuarioId,
                usuarioNome: agendamentoExistente.usuarioNome,
                inicio: new Date(agendamentoExistente.inicio),
                fim: new Date(agendamentoExistente.fim)
            }
          }
        })
      }
    });
    this.salaService.getSalas().subscribe({
      next: (suc) => {
        this.salas=suc
     },
     error: (err) => {
       this.alertCtrl.showError('ALERTAS.AGENDAMENTO_ERRO_CARREGAR_SALA');
     }
   });
  }

  salvar() {

    if (!this.agendamento){return;}
    
    
    let agendamentoReq : AgendamentoReqBody = {
      fim : this.agendamento.fim,
      inicio : this.agendamento.inicio
    }
    if (this.id) {
      this.agendamentoService.editAgendamento(agendamentoReq,this.id).subscribe({
         next: (suc) => {
          this.alertCtrl.showSuccess('ALERTAS.AGENDAMENTO_EDITADO');
          this.router.navigate(['/agendamentos']);
        },
        error: (err) => {
          this.alertCtrl.showError('ALERTAS.AGENDAMENTO_ERRO_EDITAR');
        }
      });
    } else {
      this.agendamentoService.addAgendamento(agendamentoReq,this.sala).subscribe({
        next: () => {
          this.alertCtrl.showSuccess('ALERTAS.AGENDAMENTO_CRIADO');
          this.router.navigate(['/agendamentos']);
       },
       error: () => {
         this.alertCtrl.showError('ALERTAS.AGENDAMENTO_ERRO_CRIAR');
       }
     });
    };
    
  }
  
}
