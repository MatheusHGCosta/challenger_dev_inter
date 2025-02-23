import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AlertService } from '../services/alert.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-global-alert',
  standalone: true,
  imports: [Toast],
  providers: [MessageService],
  templateUrl: './global-alert.component.html'
})
export class GlobalAlertComponent implements OnInit {

  constructor(private alertService: AlertService, private messageService: MessageService) {}

  ngOnInit() {
    this.alertService.message$.subscribe((msg) => {
      if (msg) {
        this.messageService.add(msg);
      }
    });
  }
}
