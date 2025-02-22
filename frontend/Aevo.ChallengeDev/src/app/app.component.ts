import { Component } from '@angular/core';
import {TranslateService,TranslateModule} from "@ngx-translate/core";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,                                    
  imports: [TranslateModule,RouterOutlet,HeaderComponent],                          
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'pt']);
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }
}