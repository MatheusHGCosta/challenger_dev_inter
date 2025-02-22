import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownModule,FormsModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  translate = inject(TranslateService);
  
  languages = [
    { label: 'Português', code: 'pt-BR' },
    { label: 'English', code: 'en' }
  ];
  
  selectedLanguage = this.languages[0].code;
  constructor() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  changeLanguage(lang: any) {
    this.selectedLanguage = lang;
    this.translate.use(lang.code);
  }
}
