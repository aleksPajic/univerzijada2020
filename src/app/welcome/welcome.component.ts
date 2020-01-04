import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isUserLogged()){
      this.router.navigate(['login']);
    }
  }

}
