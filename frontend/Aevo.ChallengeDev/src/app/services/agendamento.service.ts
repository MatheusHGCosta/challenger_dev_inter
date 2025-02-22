import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Agendamento {
  id: number;
  usuario: string;
  sala: string;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private agendamentos = new BehaviorSubject<Agendamento[]>([
    { id: 1, usuario: 'João', sala: 'Sala A', data: '2024-02-21' },
    { id: 2, usuario: 'Maria', sala: 'Sala B', data: '2024-02-22' }
  ]);

  getAgendamentos() {
    return this.agendamentos.asObservable();
  }

  addAgendamento(agendamento: Agendamento) {
    const lista = [...this.agendamentos.value, agendamento];
    this.agendamentos.next(lista);
  }

  editAgendamento(id: number, novoAgendamento: Agendamento) {
    const lista = this.agendamentos.value.map(a => a.id === id ? novoAgendamento : a);
    this.agendamentos.next(lista);
  }

  deleteAgendamento(id: number) {
    const lista = this.agendamentos.value.filter(a => a.id !== id);
    this.agendamentos.next(lista);
  }
}
