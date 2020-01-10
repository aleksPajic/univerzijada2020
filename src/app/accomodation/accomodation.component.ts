import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { AccomodationService } from 'src/services/accomodation.service';
import { AccomodationForStudent } from 'src/models/accomodation_for_student';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {

  accomodation: AccomodationForStudent;
  impressions;
  hotelImpressions;
  restaurantImpressions;
  isHotelImpressionsVisible: boolean;
  starsImgSrcs: string[] = [
    "../../assets/emptyStars.png",
    "../../assets/oneStar.png",
    "../../assets/twoStarw.png",
    "../../assets/threeStars.png"
  ];
  currentRating = 0;
  emptyStarSrc = "../../assets/emptyStar.png";
  fillStarSrc = "../../assets/coloredStar.png";
  showCommentTextArea: boolean;
  commentTextarea: string;
  requestFor;
  requestNote;

  constructor(public userService: UserService,public accService: AccomodationService, public router: Router) { 
    if(!this.userService.isUserLogged() || this.userService.getCurrentUser().type != 'student'){
      router.navigate(["welcome"]);
    }
    this.accomodation = this.accService.getAccomodationForUser(this.userService.getCurrentUser().username);
    if(!this.accomodation) {
      alert("Još uvek Vam nije dodeljen smeštaj!");
      router.navigate(["welcome"]);
    }else{
      this.isHotelImpressionsVisible = true;
      this.hotelImpressions = this.accService.getImpressionsForHotel(this.accomodation.hotel.name);
      this.restaurantImpressions = this.accService.getImpressionsForRestaurant(this.accomodation.restaurant.name);
      this.impressions = this.hotelImpressions;
      this.showCommentTextArea = false;
      this.requestFor = "smestaj";
    }
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log(this.mapElement);
    this.renderMap();
  }

  showOtherImpressions() {
    this.isHotelImpressionsVisible = !this.isHotelImpressionsVisible;
    if(this.isHotelImpressionsVisible) {
      this.impressions = this.hotelImpressions;
    } else {
      this.impressions = this.restaurantImpressions;
    }
  }

  setRating(rating: number) {
    this.currentRating = rating;
  }

  leaveComment() {
    if(this.isHotelImpressionsVisible) {
      this.accService.leaveImpressionForHotel(
        this.accomodation.hotel.name, this.commentTextarea, this.currentRating, this.userService.getCurrentUser().username
      );
      this.impressions = this.hotelImpressions = this.accService.getImpressionsForHotel(this.accomodation.hotel.name);
    } else {
      this.accService.leaveImpressionForRestaurant(
        this.accomodation.restaurant.name, this.commentTextarea, this.currentRating, this.userService.getCurrentUser().username
      );
      this.impressions = this.restaurantImpressions = this.accService.getImpressionsForRestaurant(this.accomodation.restaurant.name);
    }
    this.showCommentTextArea = false;
    this.commentTextarea = "";
    this.currentRating = 0;
  }


  sendRequest() {
    this.accService.sendChangeRequest(this.requestFor, this.requestNote, this.userService.getCurrentUser().username);
    alert("Zahtev uspesno poslat!");
    this.requestNote = ""; 
    this.requestFor = "smestaj";
  }

  //MAP

  @ViewChild('mapRef', {static: false}) mapElement: ElementRef;

  renderMap() {
    
    window['initMap'] = () => {
      this.loadMap();     
    }
    if(!window.document.getElementById('google-map-script')) {
      var s = window.document.createElement("script");
      s.id = "google-map-script";
      s.type = "text/javascript";
      s.async = true;
      s.defer = true;
      s.src = "https://maps.googleapis.com/maps/api/js?key=&callback=initMap";
        
      window.document.body.appendChild(s);
    } else {
      this.loadMap();
    }
  }

  loadMap(){
    var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: {lat: 44.814281, lng: 20.488367},
      zoom: 8
    });
    
    var marker = new window['google'].maps.Marker({
      position: {lat: 24.5373, lng: 81.3042},
      map: map,
      title: 'Hello World!',
      draggable: true,
      animation: window['google'].maps.Animation.DROP,
    });
    
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h3 id="thirdHeading" class="thirdHeading">W3path.com</h3>'+
    '<div id="bodyContent">'+
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'+
    '</div>'+
    '</div>';
    
    var infowindow = new window['google'].maps.InfoWindow({
      content: contentString
    });
    
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    
  }
}
