import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
  username: string;
  password: string;
  errorMessage: string;

  constructor(public userService: UserService, public router: Router) { 
    this.firstName = null;
    this.lastName = null;
    this.address = null;
    this.contactNumber = null;
    this.username = null;
    this.password = null;
    this.errorMessage = null;
  }

  ngOnInit() {
  }

  register(){
    if(this.isValidRegister()){
      if(this.userService.userExists(this.username, this.password)){
        this.errorMessage = "Korisnik već postoji!";
      }else{
        let user: User = {
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          contactNumber: this.contactNumber,
          username: this.username,
          password: this.password,
          type: "student"
        };
        this.userService.register(user);
        alert("Uspešna registracija!");
        this.router.navigate(["login"]);
      }
    }else{
      this.errorMessage = "Unos svih podataka je obavezan. Korisničko ime mora sadržati minimalno 5 karaktera." + 
      "Lozinka mora sadržati minimalno 8 karaktera.";
    }
  }

  isValidRegister(): boolean{
    if(this.firstName === null || this.firstName.trim().length === 0 || 
        this.lastName === null || this.lastName.trim().length === 0){
      return false;
    }

    if(this.address === null || this.address.trim().length === 0 || 
        this.contactNumber === null || this.contactNumber.trim().length === 0){
      return false;
    }

    if(this.username === null || this.username.trim().length < 5 || 
        this.password === null || this.password.trim().length < 8){
      return false;
    }

    return true;
  }

}
