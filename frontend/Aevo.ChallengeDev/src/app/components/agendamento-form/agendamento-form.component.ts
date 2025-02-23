import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentoService, Agendamento } from '../../services/agendamento.service';
import { DatePicker } from 'primeng/datepicker';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { TranslateModule } from '@ngx-translate/core';
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
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule,DatePicker,TranslateModule],
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css']
})
export class AgendamentoFormComponent {
  private agendamentoService = inject(AgendamentoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  id : string | null = '';
  agendamento : Agendamento | null = null;

  sala: Sala = {
    id:'6CF59D00-2B17-41C7-9C77-030F7D412868',
    nome: 'Sala de Conferência Berlim',
    descricao:'Sala para conferências internacionais em Berlim',
    capacidade: 29,
    fusoHorario: 'Europe/Berlin'
  }

  isEditMode = false;

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.isEditMode = true;
        this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
          const agendamentoExistente = agendamentos.find(a => a.id === this.id);
          console.log(agendamentoExistente)
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
            console.log(this.agendamento)
          }
        })
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
          alert("sdhasodjasiod")
        },
        error: (err) => alert(err)
      });
    } else {
      this.agendamentoService.addAgendamento(agendamentoReq,this.sala);
    }
    this.router.navigate(['/']);
  }
  
}
