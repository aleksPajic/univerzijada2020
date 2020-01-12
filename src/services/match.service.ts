import { Injectable } from '@angular/core';
import { Match } from 'src/models/mach';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private static MATCHES_WITHOUT_HALLS_ARRAY_KEY = "univerzijadaMeceviBezSale";
  private static MATCHES_WITH_HALLS_ARRAY_KEY = "univerzijadaMeceviSaSalom";

  private static initMatchesWithoutHall: Match[] = [
    {
      name: "Kosarkaska utakmica 2",
      dateTime: new Date('2020-02-02T13:00:00'),
      hall: null,
      durationInMinutes: 60
    }
  ];

  private static initMatchesWithHalls = [
    {
      name: "Fudbalska utakmica",
      dateTime: new Date('2019-11-28T09:15:00'),
      hall: "Pionir",
      durationInMinutes: 90
    },
    {
      name: "Kosarkaska utakmica",
      dateTime: new Date('2019-12-12T17:00:00'),
      hall: "Hala sport",
      durationInMinutes: 60
    }
  ];

  static halls: string[] = [
    "Pionir",
    "Železnik",
    "Hala sport"
  ];

  static studentsMatches: any[] = [
    {
      student: 'student1',
      match: {
        name: "Fudbalska utakmica",
        dateTime: new Date('2019-11-28T09:15:00'),
        hall: "Pionir",
        durationInMinutes: 90
      }
    },
    {
      student: 'student1',
      match: {
        name: "Kosarkaska utakmica",
        dateTime: new Date('2019-12-12T17:00:00'),
        hall: "Hala sport",
        durationInMinutes: 60
      }
    }
  ]

  constructor() { 
    this.setMatchesWithoutHalls(MatchService.initMatchesWithoutHall);
    this.setMatchesWithHalls(MatchService.initMatchesWithHalls);

    if(!this.getMatchesWithoutHalls()) {
      this.setMatchesWithoutHalls(MatchService.initMatchesWithoutHall);
    }

    if(!this.getMatchesWithHalls()) {
      this.setMatchesWithHalls(MatchService.initMatchesWithHalls);
    }
  }

  getMatchesForStudent(username: string):Match[]{
    return MatchService.studentsMatches.filter(match=>match.student === username).map(match=> match.match);
  }

  getAllHalls(): string[]{
    return MatchService.halls;
  }

  getMatchesWithoutHalls():Match[]{
    return JSON.parse(localStorage.getItem(MatchService.MATCHES_WITHOUT_HALLS_ARRAY_KEY));
  }

  private setMatchesWithoutHalls(matches:Match[]){
    localStorage.setItem(MatchService.MATCHES_WITHOUT_HALLS_ARRAY_KEY, JSON.stringify(matches));
  }

  getMatchesWithHalls():Match[]{
    return JSON.parse(localStorage.getItem(MatchService.MATCHES_WITH_HALLS_ARRAY_KEY));
  }

  private setMatchesWithHalls(matches:Match[]){
    localStorage.setItem(MatchService.MATCHES_WITH_HALLS_ARRAY_KEY, JSON.stringify(matches));
  }

  getFreeHallsForMatch(matchIndex: number): string[] {
    let matchesWithoutHalls = this.getMatchesWithoutHalls();
    let matchesWithHalls = this.getMatchesWithHalls();
    let occupatedHalls = matchesWithHalls.filter((x) => {
      let temp: Date = new Date(x.dateTime);
      let minTime = temp.getTime();
      temp.setMinutes(temp.getMinutes() + x.durationInMinutes);
      let maxTime = temp.getTime();
      temp = new Date(matchesWithoutHalls[matchIndex].dateTime);
      let startTime = temp.getTime();
      return startTime >= minTime && startTime <= maxTime;
    }).map(x=>x.hall);
    return MatchService.halls.filter(x => occupatedHalls.indexOf(x) < 0 );
  }

  removeMatchWithoutHall(matchIndex: number) {
    let matches = this.getMatchesWithoutHalls();
    matches.splice(matchIndex, 1);
    this.setMatchesWithoutHalls(matches);
  }

  makeHallReservation(hall: string, matchIndex: number) {
    let matches = this.getMatchesWithoutHalls();
    let matchesWithHalls = this.getMatchesWithHalls();
    matches[matchIndex].hall = hall;
    matchesWithHalls.push(matches[matchIndex]);
    matches.splice(matchIndex, 1);
    this.setMatchesWithoutHalls(matches);
    this.setMatchesWithHalls(matchesWithHalls);
  }
}
