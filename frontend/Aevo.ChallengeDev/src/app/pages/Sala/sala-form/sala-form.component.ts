import { Component } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { AlertService } from '../../../services/alert.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SalaService } from '../../../services/sala.service';
import { Sala } from '../../Agendamento/agendamento-form/agendamento-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TimezoneDropdownComponent } from "../../../components/timezone/timezone.component";


export interface SalaReqBody{
  nome: string,
  capacidade: number,
  fusoHorario: string
}

@Component({
  selector: 'app-sala-form',
  imports: [TranslateModule, CommonModule, FormsModule, InputTextModule, ButtonModule, RouterModule, TimezoneDropdownComponent],
  templateUrl: './sala-form.component.html',
  standalone:true,
  providers: [TranslatePipe],
  styleUrl: './sala-form.component.scss'
})
export class SalaFormComponent {
  id : string | null = '';
  sala:Sala= {id : '',nome: '',capacidade: 0,fusoHorario: 'America/Sao_Paulo',descricao:''};
  isEditMode = false;
  isLoad = false

   constructor(
      private alertCtrl : AlertService,
      private route : ActivatedRoute,
      private router : Router,
      private salaService : SalaService
    ) {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          this.isEditMode = true;
          this.salaService.getSalas().subscribe(salas => {
            const salaExistente = salas.find(a => a.id === this.id);
            if (salaExistente) {
              this.sala = salaExistente
            }
            this.isLoad= true
          })
        }
      });
      
    }

    capturarFusoHorario(fusoHorario: string) {
      this.sala.fusoHorario = fusoHorario;
    }


    salvar() {
    
        if (!this.sala){return;}
        
        
        let salaReq : SalaReqBody = {
          nome: this.sala.nome,
          capacidade: this.sala.capacidade,
          fusoHorario: this.sala.fusoHorario
        }
        if (this.id) {
          this.salaService.editSala(salaReq,this.id).subscribe({
             next: (suc) => {
              this.alertCtrl.showSuccess('ALERTAS.SALA_EDITADA');
              this.router.navigate(['/salas']);
            },
            error: (err) => {
              this.alertCtrl.showError('ALERTAS.SALA_ERRO_EDITAR');
            }
          });
        } else {
          this.salaService.addSala(salaReq).subscribe({
            next: () => {
              this.alertCtrl.showSuccess('ALERTAS.SALA_CRIADA');
              this.router.navigate(['/salas']);
           },
           error: () => {
             this.alertCtrl.showError('ALERTAS.SALA_ERRO_CRIAR');
           }
         });
        };
        
      }
}
