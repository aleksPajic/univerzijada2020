import { Component, OnInit } from '@angular/core';
import { Attraction } from 'src/models/attraction';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { TourismService } from '../../services/tourism.service';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.component.html',
  styleUrls: ['./tourism.component.css']
})
export class TourismComponent implements OnInit {

  attractions: Attraction[];

  constructor(public userService: UserService, public router: Router, public tourismService: TourismService) {
    if(!this.userService.isUserLogged() || this.userService.getCurrentUser().type != 'student'){
      router.navigate(["welcome"]);
    }
    this.attractions = this.tourismService.getTourismAttractions();
  }

  ngOnInit() {
  }

  like(attractionName){
    try{
      this.tourismService.likeAttraction(attractionName, this.userService.getCurrentUser().username);
      this.attractions = this.tourismService.getTourismAttractions();
    }catch(e){
      alert("Već ste lajkovali ovu turističku atrakciju!");
    }
    
  }
}
