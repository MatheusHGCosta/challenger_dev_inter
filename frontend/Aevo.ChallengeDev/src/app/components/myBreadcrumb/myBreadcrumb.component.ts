import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-myBreadcrumb',
  templateUrl:'./myBreadcrumb.component.html',
  styleUrl: './myBreadcrumb.component.scss',
  standalone:true,
  imports:[BreadcrumbModule,CommonModule]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbItems$.subscribe(items => {
      this.breadcrumbItems = items;
    });
  }
}
