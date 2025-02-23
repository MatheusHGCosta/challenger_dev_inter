import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../pages/Agendamento/agendamento-form/agendamento-form.component';
import { SalaReqBody } from '../pages/Sala/sala-form/sala-form.component';



@Injectable({ providedIn: 'root' })
export class SalaService {
  private apiUrl = 'http://localhost:5185/salas';

  constructor(private http : HttpClient){}
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }  
  deleteSala(id:string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }  

  addSala(salaBody:SalaReqBody): Observable<{salaId : string}> {
    return this.http.post<{salaId : string}>(`${this.apiUrl}`,salaBody);
  }  

  editSala(salaBody:SalaReqBody,id:string): Observable<{salaId : string}> {
    return this.http.put<{salaId : string}>(`${this.apiUrl}/${id}`,salaBody);
  }  
}