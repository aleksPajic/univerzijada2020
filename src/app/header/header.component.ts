import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'pki-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private headerView: string = "none";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.setHeaderComponent(this);
  }

  changeHeaderView(newView:string){
    this.headerView = newView;
  }

}
