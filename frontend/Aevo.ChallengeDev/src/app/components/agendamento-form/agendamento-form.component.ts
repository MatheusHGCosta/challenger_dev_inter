import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentoService, Agendamento } from '../../services/agendamento.service';

@Component({
  selector: 'app-agendamento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css']
})
export class AgendamentoFormComponent {
  private agendamentoService = inject(AgendamentoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  agendamento: Agendamento = { id: 0, usuario: '', sala: '', data: '' };
  isEditMode = false;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.isEditMode = true;
        this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
          const agendamentoExistente = agendamentos.find(a => a.id === id);
          if (agendamentoExistente) {
            this.agendamento = { ...agendamentoExistente };
          }
        });
      }
    });
  }

  salvar() {
    if (this.isEditMode) {
      this.agendamentoService.editAgendamento(this.agendamento.id, this.agendamento);
    } else {
      this.agendamento.id = Math.floor(Math.random() * 1000) + 1; // Gera um ID aleatório
      this.agendamentoService.addAgendamento(this.agendamento);
    }
    this.router.navigate(['/']);
  }
}
