import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../pages/Agendamento/agendamento-form/agendamento-form.component';



@Injectable({ providedIn: 'root' })
export class SalaService {
  private apiUrl = 'http://localhost:5185/salas';

  constructor(private http : HttpClient){}
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }  
}