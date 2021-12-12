import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountServise:AccountService,private toastr:ToastrService){}
  canActivate(): Observable<boolean> {
    return this.accountServise.currentUser$.pipe(
      map(user => {
        if (user) {

          return true;

        }else {
          this.toastr.error("you shall not pass !")
          return false

        };

      })
    );
  }

}
