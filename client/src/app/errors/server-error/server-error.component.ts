import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error:any;
  constructor(private router:Router) {
    const navigatin = this.router.getCurrentNavigation();
    this.error = navigatin?.extras?.state?.['error'];

   }

  ngOnInit(): void {
  }

}
