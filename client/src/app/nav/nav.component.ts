import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any = {}



  constructor(public accountSDervice:AccountService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

  }
  login(){
   this.accountSDervice.login(this.model).subscribe(response => {
     // console.log(response);
     this.router.navigate(['/members']);

   } , error => {
     console.log(error);
     this.toastr.error('invalid login',error.error.title);

   })
  }

  logout(){
    this.accountSDervice.logout()
    this.router.navigate(['/'])

  }

}
