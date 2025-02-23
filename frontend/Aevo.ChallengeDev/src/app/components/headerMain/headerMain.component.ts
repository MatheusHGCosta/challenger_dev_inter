import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from "../breadcrumb/myBreadcrumb.component";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, TranslateModule, BreadcrumbComponent],
  templateUrl: './headerMain.component.html',
  styleUrl: './headerMain.component.scss'
})
export class HeaderComponent {
  translate = inject(TranslateService);
  languages = [
    { label: 'Português', code: 'pt-BR' },
    { label: 'English', code: 'en-US' },
    { label: 'Deutsch', code: 'de-DE' },
    { label: 'español', code: 'es' },
    { label: 'Français', code: 'fr-FR' },
    { label: '日本語', code: 'ja-JP' },
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
