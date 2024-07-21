import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


@Injectable()

export class DashboardComponent {

  listUsers: any;
  constructor(private httpClient: HttpClient){}

 
  router = inject(Router);

  ngOnInit() {
  const authToken = localStorage.getItem("authToken");

  if(!authToken || localStorage.getItem("perm") != "true"){
    this.router.navigateByUrl("home");
  }
    

  var reqHeader = new HttpHeaders({ 
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("authToken")
  });

    this.httpClient.get("http://127.0.0.1:8000/api/listusers", {headers: reqHeader}).subscribe((res: any)=>{
      //console.log(res.message);
      this.listUsers = res.message;
    });
  }

  onEdit(id: any){
    this.router.navigateByUrl(`edit/${id}`);
  }

  goResetPassword(id: any){
    this.router.navigateByUrl(`resetpassword/${id}`);

  }

  register() {
    this.router.navigateByUrl(`register`);
  }

  logout() {
    const authToken = localStorage.getItem("authToken");

  var reqHeader = new HttpHeaders({ 
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("authToken")
  });

    this.httpClient.get("http://127.0.0.1:8000/api/logout", {headers: reqHeader}).subscribe((res: any)=>{
      //console.log(res.message);
    });

    localStorage.clear();
    this.router.navigateByUrl(`login`);
  }
  

}
