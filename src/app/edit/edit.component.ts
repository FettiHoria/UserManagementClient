import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})



export class EditComponent {

  edituser: any;
 

    userEdit: any = {
      name: '',
      email: '',
      active_status: ''
    }



constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

router = inject(Router);

ngOnInit(): void {

    const authToken = localStorage.getItem("authToken");
  
    if(!authToken || localStorage.getItem("perm") != "true"){
      this.router.navigateByUrl("home");
    }

  const id = this.route.snapshot.paramMap.get('id');
  //console.log(id);

  var reqHeader = new HttpHeaders({ 
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("authToken")
  });

    this.httpClient.get("http://127.0.0.1:8000/api/getuserbyid/"+id, {headers: reqHeader}).subscribe((res: any)=>{
      //console.log(res.message);
      this.edituser = res.message;

      //console.log(this.edituser[0].active_status)

      this.userEdit = {
        name: this.edituser[0].name,
        email: this.edituser[0].email,
        active_status: this.edituser[0].active_status,
      }
    });


}

onEdit():void {

  let fd = new FormData();
  const id = this.route.snapshot.paramMap.get('id');

  fd.append('name', this.userEdit.name);
  fd.append('email', this.userEdit.email);
  fd.append('active_status', this.userEdit.active_status);

  var reqHeader = new HttpHeaders({ 
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("authToken")
  });
  //console.log(reqHeader);

  this.httpClient.post(`http://127.0.0.1:8000/api/updateuser/${id}`, fd, { headers: reqHeader }).subscribe((res: any)=>{
      this.router.navigateByUrl("dashboard");
  });
}


deleteUser():void {

  const id = this.route.snapshot.paramMap.get('id');

  var reqHeader = new HttpHeaders({ 
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("authToken")
  });

  //console.log(localStorage.getItem("authToken"));
  //console.log(reqHeader)

  this.httpClient.delete(`http://127.0.0.1:8000/api/deleteuser/${id}`, { headers: reqHeader }).subscribe((res: any)=>{
    console.log(res)
      this.router.navigateByUrl("dashboard");
  });

}

changeStatus(event:Event):void {
  const isChecked = (<HTMLInputElement>event.target).checked;
  if (isChecked == false)
    this.userEdit.active_status = 0
  else if (isChecked == true)
    this.userEdit.active_status = 1
}

}
