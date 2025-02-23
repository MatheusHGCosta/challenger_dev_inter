import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSource = new BehaviorSubject<any>(null);
  public message$ = this.messageSource.asObservable();

  showMessage(message: { severity: string, summary: string, detail: string }) {
    this.messageSource.next(message);
  }
}
