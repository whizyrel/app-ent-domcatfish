import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,
  Router, ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewEditGuard implements CanActivate {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const enc = next.queryParams.p;

      // deencryption && confirming pid

      if (enc !== undefined && enc !== null) {
        return true;
      } else {
        this.router.navigate(['/admin', 'dashboard']);
        return false;
      }
  }
}
