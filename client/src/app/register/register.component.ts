import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model:any = {}

@Output() cancelRegister  = new EventEmitter<boolean>();

  constructor(private accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  register(){
    this.accountService.register(this.model).subscribe(resoone => {
      console.log(resoone);
      this.cancel();
    },error => {
      console.log(error);
   //   this.toastr.error(error.error.title)
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
