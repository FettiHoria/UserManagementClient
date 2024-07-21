import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  listUsers: any;
  constructor(private httpClient: HttpClient){}

 
  router = inject(Router);

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
