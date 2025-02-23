import { Component } from '@angular/core';
import {TranslateService,TranslateModule} from "@ngx-translate/core";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
@Component({
  selector: 'app-root',
  standalone: true,                                    
  imports: [TranslateModule,RouterOutlet,HeaderComponent,GlobalAlertComponent],                          
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en-US', 'pt-BR']);
    this.translate.setDefaultLang('pt-BR');
    this.translate.use('pt-BR');
  }
}