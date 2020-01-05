import { Injectable } from '@angular/core';
import { Match } from 'src/models/mach';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

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
        hall: "Pionir"
      }
    },
    {
      student: 'student1',
      match: {
        name: "Kosarkaska utakmica",
        dateTime: new Date('2019-12-12T17:00:00'),
        hall: "Hala sport"
      }
    }
  ]

  constructor() { }

  getMatchesForStudent(username: string):Match[]{
    return MatchService.studentsMatches.filter(match=>match.student === username).map(match=> match.match);
  }

  getAllHalls(): string[]{
    return MatchService.halls;
  }
}
