import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'pki-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private headerView: string = "none";

  constructor(public userService: UserService, private router: Router) {
    this.userService.setHeaderComponent(this);
    console.log("Created header object!");
   }

  ngOnInit() {
    let user:User = this.userService.getCurrentUser();
    if(user){
      this.changeHeaderView(user.type);
    }
    console.log("Created header!");
  }

  changeHeaderView(newView:string){
    this.headerView = newView;
  }

  profile(){
    this.router.navigate(["profile"]);
  }

  logout(){
    this.userService.logout();
    this.headerView = "none";
    this.router.navigate(["login"]);
  }

}
