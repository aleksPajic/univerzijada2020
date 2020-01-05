import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  username: string;
  password: string;

  constructor(public userService: UserService, public router: Router) { 
    this.errorMessage = null;
    this.username = null;
    this.password = null;
  }

  ngOnInit() {
  }

  login(){
    if(this.isValidLogin() && this.userService.userExists(this.username, this.password)){
      this.userService.login(this.username, this.password);
      this.router.navigate(["welcome"]);
    }else{
      this.errorMessage = "Korisničko ime ili lozinka nisu ispravno uneti!";
    }
  }

  isValidLogin(){
    if(this.username === null || this.username.trim() === "" || 
        this.password === null || this.password.trim() === "") {
      return false;
    }
    return true;
  }

}
