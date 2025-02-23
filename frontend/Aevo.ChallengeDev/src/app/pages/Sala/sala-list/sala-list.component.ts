import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgendamentoService, Agendamento } from '../../../services/agendamento.service';
import { Observable } from 'rxjs';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { AlertService } from '../../../services/alert.service';
import { SalaService } from '../../../services/sala.service';
import { Sala } from '../../Agendamento/agendamento-form/agendamento-form.component';
@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule,FormsModule,TranslateModule],
  providers: [TranslatePipe],
  templateUrl: './sala-list.component.html'
})
export class SalaListComponent implements OnInit {
  sala$!: Observable<Sala[]>;
  ngOnInit(): void {
    this.sala$ = this.salaService.getSalas();
  }

  constructor(
    private salaService : SalaService,
    private alertCtrl : AlertService
  ){

  }
  delete(id: string) {
    this.salaService.deleteSala(id).subscribe({
      next: () => {
        this.alertCtrl.showSuccess('ALERTAS.SALA_EXCLUIDA');
        this.sala$= this.salaService.getSalas();
     },
     error: () =>{
      this.alertCtrl.showError('ALERTAS.SALA_ERRO_EXCLUIR');
    }
   });
  }
}
