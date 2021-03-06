import { AccountService } from './../../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient,private accountService:AccountService) { }
  validatorsErrors:string[] = [];
  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
    })
  }
  get400Error(){
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
    })
  }
  get500Error(){
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
    })
  }
  get401Error(){
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(response => {
      console.log(response);
    },error => {
      console.log(error)
    })
  }
  get400ValidationError(){
    this.accountService.register({}).subscribe(resoone => {
      console.log(resoone);
     // this.cancel();
    },error => {
      console.log(error);
      this.validatorsErrors = this.accountService.validError;
   //   this.toastr.error(error.error.title)
    })

    // this.http.get(this.baseUrl + 'account/register',{}).subscribe(response => {
    //   console.log(response);
    // },error => {
    //   console.log(error)
    //   this.validatorsErrors = error;
    // })
  }

}
