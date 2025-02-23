import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSource = new BehaviorSubject<any>(null);
  public message$ = this.messageSource.asObservable();

  constructor(private translateService: TranslateService) {}

  showSuccess(detail: string) {
    const summary = this.translateService.instant('ALERTAS.SUCESSO');
    detail = this.translateService.instant(detail);
    this.messageSource.next({
      severity: 'success',
      summary: summary,
      detail: detail
    });
  }

  showError(detail: string) {
    const summary = this.translateService.instant('ALERTAS.ERRO');
    detail=this.translateService.instant(detail);
    this.messageSource.next({
      severity: 'warn',
      summary: summary,
      detail: detail
    });
  }
}
