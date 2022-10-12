import { Injectable } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  currentUser: any
  currentAcno: any

  userDetails: any = {
    1000: { acno: 1000, username: "amal", password: 123, balance: 100000, transaction: [] },
    1001: { acno: 1002, username: "anu", password: 123, balance: 200000, transaction: [] },
    1002: { acno: 1002, username: "appu", password: 123, balance: 150000, transaction: [] },
    1003: { acno: 1003, username: "anju", password: 123, balance: 10000, transaction: [] }


  }

  constructor() {
    this.getDetails()

  }

  saveDetails() {
    if (this.userDetails) {
      localStorage.setItem('database', JSON.stringify(this.userDetails))
    }


    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    }

    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno))
    }


  }
  getDetails() {
    if (localStorage.getItem('database')) {
      this.userDetails = JSON.parse(localStorage.getItem('database') || '')
    }

    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '')
    }

    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')
    }

  }





  register(acno: any, username: any, password: any) {

    let userDetails = this.userDetails

    if (acno in userDetails) {

      return false
    }
    else {
      userDetails[acno] = { acno, username, password, balance: 0, transaction: [] }
      console.log(userDetails)

      this.saveDetails()
      return true
    }

  }

  login(acno: any, psw: any) {

    let userDetails = this.userDetails
    if (acno in userDetails) {
      if (psw == userDetails[acno]['password']) {
        this.currentUser = userDetails[acno]['username']
        this.currentAcno = acno
        this.saveDetails()

        return true

      }
      else {
        alert('incorrect password')
        return false
      }

      //alert('login sucess')
      //redirection
      //this.router.navigateByUrl('dashboard')

    }
    else {
      alert('user not exist or incorrect password')
      return false
    }
  }

  deposit(acnum: any, pswrd: any, amnt: any) {

    let userDetails = this.userDetails

    var amount = parseInt(amnt)
    if (acnum in userDetails) {
      if (pswrd == userDetails[acnum]['password']) {
        userDetails[acnum]['balance'] += amount
        userDetails[acnum]['transaction'].push({ type: 'CREDIT', amount })
        this.saveDetails()


        return userDetails[acnum]['balance']


      }
      else {
        alert('incurrect password')
      }


    }
    else {
      alert('user not exist')
      return false
    }



  }
  withdraw(acnum: any, pswrd: any, amnt: any) {


    let userDetails = this.userDetails

    var amount = parseInt(amnt)
    if (acnum in userDetails) {
      if (pswrd == userDetails[acnum]['password']) {
        if (userDetails[acnum]['balance'] >= amnt) {
          userDetails[acnum]['balance'] -= amount
          userDetails[acnum]['transaction'].push({ type: 'DEBIT', amount })
          this.saveDetails()

          return userDetails[acnum]['balance']
        }
        else {
          alert('insufficent balance')
          return false
        }

      }
      else {
        alert('incurrect password')
      }


    }
    else {
      alert('user not exist')
      return false
    }

  }
  getTransaction(acno: any) {
    return this.userDetails[acno]['transaction']
  }

}




