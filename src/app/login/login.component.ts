import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  aim='Your perfect banking partner'
  acnt='enter your ac number'

  acno=''
  psw=''

 
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
    

  })





  constructor(private router:Router,private ds: DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }


login(){
var acnum=this.loginForm.value.acno
var psw=this.loginForm.value.psw 

 const result=this.ds.login(acnum,psw)
 if(this.loginForm.valid){
  if (result){
    alert('login sucess')
    this.router.navigateByUrl('dashboard')
   }
  
  
 }
 else{
  alert('invalid form')
 }
 
// let userDetails=this.userDetails
// if(acnum in userDetails){
//   if(psw==userDetails[acnum]['password']){
//     alert('login sucess')
//     //redirection
// this.router.navigateByUrl('dashboard')

//   }
//   else{
//     alert('user not exist or incorrect password')
//   }
}

// login(a:any,b:any){
// console.log(a.value);
// console.log(b.value);





//   var acnum=a.value
//   var psw=b.value
//   let userDetails=this.userDetails
//   if(acnum in userDetails){
//     if(psw==userDetails[acnum]['password']){
//       alert("login sucess")
//     }
//     else{
//       alert("user not exist or incorrect password")
//     }
//   }
  

//   alert('login clicked')
// }

// acnoChange(event:any){
//   this.acno=event.target.value
//   console.log(this.acno)
// }

// pswChange(event:any){
//   this.psw=event.target.value
//   console.log(this.psw)
// }
 }

