import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { MatchService } from '../../services/match.service';
import { Router } from '@angular/router';
import { Match } from 'src/models/mach';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  allMatches: Match[];
  matches: Match[];
  halls: string[];
  date;
  timeFrom: number;
  timeTo: number;
  hallForSearch;
  errorMessage: string;

  constructor(public userService: UserService, public matchService: MatchService,public router: Router) {
    if(!this.userService.isUserLogged() || this.userService.getCurrentUser().type != 'student'){
      router.navigate(["welcome"]);
    }
    this.errorMessage = null;
    this.allMatches = this.matchService.getMatchesForStudent(this.userService.getCurrentUser().username);
    this.matches = this.matchService.getMatchesForStudent(this.userService.getCurrentUser().username);
    this.halls = this.matchService.getAllHalls();
  }

  ngOnInit() {
  }


  searchMatches(){

    if(this.isTimeValid()){
      this.errorMessage = null;
      this.matches = this.allMatches;
      if(this.hallForSearch)
        this.matches = this.allMatches.filter(match=>match.hall === this.hallForSearch);

      if(this.timeFrom != undefined){

      }

      if(this.timeTo != undefined){

      }

      if(this.date){
        this.matches = this.matches.filter((match)=>{
          return match.dateTime.getDate() === this.date.day && (match.dateTime.getMonth() + 1) === this.date.month 
                  && match.dateTime.getFullYear() === this.date.year; 
        });
      }
    } else {
      this.errorMessage = "Vreme mora da bude u opsegu [0, 23] i vreme od mora da bude manje od vremena do!";
    }
  }

  isTimeValid(){
    if(this.timeFrom != undefined && (this.timeFrom <= 0 || this.timeFrom >= 23)){
      return false;
    }

    if(this.timeTo != undefined && (this.timeTo <= 0 || this.timeTo >= 23)){
      return false;
    }

    if(this.timeFrom != undefined && this.timeTo != undefined && this.timeFrom > this.timeTo){
      return false;
    }
    return true;
  }

  clearSearch(){
    this.date = undefined;
    this.timeFrom = undefined;
    this.timeTo = undefined;
    this.errorMessage = null;
    this.hallForSearch = undefined;
    this.matches = this.allMatches;
  }
}
