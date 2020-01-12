import { Component, OnInit } from '@angular/core';
import { Match } from 'src/models/mach';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { MatchService } from 'src/services/match.service';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent implements OnInit {

  matchesWithoutHalls: Match[];
  currentMatchIndex: number;
  hallsToShow: string[];
  noHallsMessage: string;

  constructor(public userService: UserService, public router: Router, public matchService: MatchService) {
    if(!this.userService.isUserLogged() || this.userService.getCurrentUser().type != UserService.TYPE_ORGANISATOR){
      router.navigate(["welcome"]);
    }

    this.matchesWithoutHalls = this.matchService.getMatchesWithoutHalls();
    this.hallsToShow = [];
    this.noHallsMessage = null;
  }

  ngOnInit() {
  }

  showFreeHalls(matchIndex: number) {
    this.currentMatchIndex = matchIndex;
    this.hallsToShow = this.matchService.getFreeHallsForMatch(matchIndex);
    if(this.hallsToShow.length === 0) {
      this.noHallsMessage = "Pošalji zahtev za dodeljivanje nove hale.";
    } else {
      this.noHallsMessage = null;
      this.matchesWithoutHalls = this.matchService.getMatchesWithoutHalls();
    }
  }

  sendHallRequest() {
    alert("Zahtev za dodeljivanje nove hale uspešno poslat!");
    this.matchService.removeMatchWithoutHall(this.currentMatchIndex);
    this.matchesWithoutHalls = this.matchService.getMatchesWithoutHalls();
    this.noHallsMessage = null;
  }

  makeReservation(hall: string) {
    this.matchService.makeHallReservation(hall, this.currentMatchIndex);
    this.hallsToShow = [];
    this.matchesWithoutHalls = this.matchService.getMatchesWithoutHalls();
    alert("Hala je uspešno rezervisana!");
    console.log(this.matchService.getMatchesWithHalls());
  }
}
