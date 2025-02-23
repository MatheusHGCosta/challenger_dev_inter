import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendamentoReqBody,Sala } from '../pages/Agendamento/agendamento-form/agendamento-form.component';


export interface Agendamento {
  id: string;
  salaId: string;
  salaNome: string;
  usuarioId: string;
  usuarioNome: string;
  inicio: Date;
  fim: Date;
}
@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5185/agendamentos';

  getAgendamentos(): Observable<Agendamento[]> {
    console.log('[AgendamentoService] Chamando API:', this.apiUrl);
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  getAgendamentosSala(salaId:string): Observable<Agendamento[]> {
    console.log('[AgendamentoService] Chamando API:', this.apiUrl);
    return this.http.get<Agendamento[]>(`${this.apiUrl}/salas/${salaId}`);
  }

   addAgendamento(agendamentoBody: AgendamentoReqBody, sala : Sala): Observable<{AgendamentoId : string}> {
    console.log('[AgendamentoService] Chamando API: ', this.apiUrl);
    return this.http.post<{AgendamentoId : string}>(`${this.apiUrl}/salas/${sala.id}`,agendamentoBody);
  }

  editAgendamento(agendamentoBody: AgendamentoReqBody, agendamentoId: string): Observable<{AgendamentoId : string}> {
    console.log('[AgendamentoService] Chamando API: editAgendamento', this.apiUrl);
    return this.http.put<{AgendamentoId : string}>(`${this.apiUrl}/${agendamentoId}`,agendamentoBody);
  }

    deleteAgendamento(agendamentoId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${agendamentoId}`);
  }
}