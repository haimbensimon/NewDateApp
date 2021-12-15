import { AccountService } from './../_services/account.service';
import { TestErrorsComponent } from './../errors/test-errors/test-errors.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toastr:ToastrService,private accSer:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error){
          switch (error.status) {
            case 400:
             // console.log(error.error.title)
             // console.log(error.error.errors)
              var a= error.error.errors
              var keys = [];
              var messagesE:string[] =[]
              if(a){
             //   console.log(a.Password[0])
             //   console.log(a.Username[0])

                for(var k in a){
                  keys.push(k);
                  //console.log(k)

                }
                for (var key in keys){
                  let y = keys[key];
                  messagesE.push(`${y} invalid or missing`);

                }

                }
              if(error.error.errors){
                const modalStateError =[];
                this.toastr.error(error.error.title)
                for (const key in messagesE){
                 // console.log(messagesE[key])
                  if (error.error.errors[key]){
                    modalStateError.push(messagesE[key])
                   // this.toastr.error(modalStateError.join())
                  }
                }
                this.toastr.error(messagesE.join())
                //console.log(messagesE.flat())
                this.accSer.validError = messagesE;
                throw modalStateError.flat();

              }else{
                this.toastr.error(error.error.title)
              }

              break;
              case 410:
                this.toastr.error(error.statusText,error.status);
                break;
              case 404:
                this.router.navigateByUrl('/not-found');
                 break;
              case 500:
                const navigationExtras:NavigationExtras = {state: {error:error.error}};
                this.router.navigateByUrl('/server-error',navigationExtras);
                break;


            default:
              this.toastr.error('Somthing unexpeted went worng');
              console.log(error);
              break;
          }

        }
        return throwError(error);
      })
    )
  }
}
