import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbItems = new BehaviorSubject<MenuItem[]>([]);
  breadcrumbItems$ = this.breadcrumbItems.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: MenuItem[] = this.buildBreadcrumbs(root);
      this.breadcrumbItems.next(breadcrumbs);
    });
  }


  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private buildBreadcrumbsFromPath(path: string): MenuItem[] {
    const segments = path.split('/');
    const breadcrumbs: MenuItem[] = [];
    let accumulatedUrl = '';
  
    segments.forEach((segment, index) => {
      accumulatedUrl += `/${segment}`;
  
      const breadcrumbLabel = this.capitalize(segment);
      
      breadcrumbs.push({
        label: breadcrumbLabel,
        routerLink: accumulatedUrl
      });
    });
  
    return breadcrumbs;
  }


  
  private buildBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    if (route) {
      const routeURL: string = route.url.map(segment => segment.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;
      debugger
      if (route.data['breadcrumb']) {
        breadcrumbs.push({
          label: route.data['breadcrumb'],
          routerLink: nextUrl
        });
      }

      if (route.firstChild) {
        return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
      }else{
        return this.buildBreadcrumbsFromPath(routeURL) 
      }
    }
    return breadcrumbs;
  }
}
