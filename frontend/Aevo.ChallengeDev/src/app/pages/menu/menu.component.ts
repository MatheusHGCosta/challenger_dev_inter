import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu',
  imports: [ButtonModule,TranslateModule,RouterModule],
  providers: [TranslatePipe],
  standalone:true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
