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

  constructor(private userService: UserService, private router: Router) { 
    this.errorMessage = null;
  }

  ngOnInit() {
  }

  login(){
    console.log(this.username);
    console.log(this.password);
  }

}
