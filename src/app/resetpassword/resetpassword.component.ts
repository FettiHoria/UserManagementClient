import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  passReset: any = {
    password: '',
    cpassword: '',
  }

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

router = inject(Router);

ngOnInit() {
  const authToken = localStorage.getItem("authToken");

  if(!authToken || localStorage.getItem("perm") != "true"){
    this.router.navigateByUrl("home");
  }
}


onReset(): void {
  let fd = new FormData();
  const id = this.route.snapshot.paramMap.get('id');

  fd.append('password', this.passReset.password);
  //fd.append('email', this.passReset.cpassword);

  var reqHeader = new HttpHeaders({ 
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("authToken")
  });
  //console.log(reqHeader);

  if(this.passReset.password == this.passReset.cpassword){
      this.httpClient.post(`http://127.0.0.1:8000/api/resetpassword/${id}`, fd, { headers: reqHeader }).subscribe((res: any)=>{
      this.router.navigateByUrl("dashboard");
  });
  }

}


}
