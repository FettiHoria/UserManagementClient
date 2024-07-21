import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { ResponseModel } from 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent {

  constructor(private httpClient: HttpClient){}

  isLoginView: boolean = false;

  logged:boolean = false;

  userLogin: any = {
    email: '',
    password: ''
  }

  router = inject(Router);

  onLogin(){
    //alert(this.userLogin.email);


    let fd = new FormData();
    fd.append('email', this.userLogin.email);
    fd.append('password', this.userLogin.password);


    this.httpClient.post("http://127.0.0.1:8000/api/login", fd).subscribe((res: any)=>{
      //console.log(res);
      localStorage.setItem('authToken', res.token);

      if (res.role == "admin")
      localStorage.setItem('perm', 'true');

      if (res.status == 'true' && res.role == "admin")
        this.router.navigateByUrl("dashboard");
      else if(res.status == 'true' && res.role == null)
      this.router.navigateByUrl("home");
    });

      
  }


}
