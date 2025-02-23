import { Injectable } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSource = new BehaviorSubject<any>(null);
  public message$ = this.messageSource.asObservable();

  constructor(private translatePipe : TranslatePipe){}
  
  showSuccess(detail:string) {
    this.messageSource.next({
      severity: 'success', 
      summary: this.translatePipe.transform('ALERTAS.SUCESSO'), 
      detail: detail
    });
  }

  showError(detail:string) {
    this.messageSource.next({
      severity: 'danger', 
      summary: this.translatePipe.transform('ALERTAS.SUCESSO'), 
      detail: detail
    });
  }
}
