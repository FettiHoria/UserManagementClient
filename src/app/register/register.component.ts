import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userNew: any = {
    name: '',
    email: '',
    password: ''
  }

constructor(private httpClient: HttpClient) {

}

router = inject(Router);

ngOnInit() {
  const authToken = localStorage.getItem("authToken");

  if(!authToken || localStorage.getItem("perm") != "true"){
    this.router.navigateByUrl("home");
  }
  
}

register():void {
  let fd = new FormData();

  fd.append('name', this.userNew.name);
  fd.append('email', this.userNew.email);
  fd.append('password', this.userNew.password);

  var reqHeader = new HttpHeaders({ 
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("authToken")
  });
  //console.log(reqHeader);

  if(this.userNew.password == this.userNew.Cpassword)
  {
    this.httpClient.post('http://127.0.0.1:8000/api/register', fd, { headers: reqHeader }).subscribe((res: any)=>{
        this.router.navigateByUrl("dashboard");
    });
  }


}

}
