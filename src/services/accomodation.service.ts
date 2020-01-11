import { Injectable } from '@angular/core';
import { AccomodationForStudent } from 'src/models/accomodation_for_student';
import { Accomodation } from 'src/models/accomodation';
import { Request } from 'src/models/request';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {

  private static ACCOMODATIONS_FOR_STUDENTS_ARRAY_KEY:string = "univerzijadaAccomodationsForStudents";
  private static HOTELS_ARRAY_KEY:string = "univerzijadaAccomodationsHotels";
  private static RESTAURANTS_ARRAY_KEY:string = "univerzijadaAccomodationsRestaurants";
  private static REQUESTS_ARRAY_KEY:string = "univerzijadaRequests";

  static initialRequests: Request[] = [
    {
      student: "student1",
      type: "smetaj",
      accomodationName: "Studentski dom Karaburma",
      note: "Molim za promenu smestaja, nema dostupnog prevoza!"
    },
    {
      student: "student1",
      type: "smetaj",
      accomodationName: "Studentski dom Karaburma",
      note: "Molim za promenu smestaja, nema dostupnog prevoza!"
    }
  ];

  static initialHotels: Accomodation[] = [
      {
        name: "Studentski dom Karaburma",
        address: "Mije Kovačevića 7б, Beograd",
        impressions: [
          {
            comment: "Odličan smeštaj!",
            rating: 2,
            student: "miclica5623"
          }
        ]
      } 
    ]
    static initialRestaurants: Accomodation[] = [
      {
        name: "Vidovdan",
        address: "Husinskih rudara 17, Beograd",
        impressions: [
          {
            comment: "Veoma ukusna hrana, sjajna usluga!",
            rating: 3,
            student: "dusan522"
          }
        ]
    }
  ];

  static initialAccomodationForStudents: AccomodationForStudent[] = [
    {
      student: "student1",
      hotel: {
        name: "Studentski dom Karaburma",
        address: "Mije Kovačevića 7б, Beograd"
      },
      restaurant: {
        name: "Vidovdan",
        address: "Husinskih rudara 17, Beograd"
      }
    }
  ];

  constructor() { 
    /*this.setAccomodations(AccomodationService.initialAccomodationForStudents);
    this.setHotels(AccomodationService.initialHotels);
    this.setRestaurants(AccomodationService.initialRestaurants);
    this.setRequests(AccomodationService.initialRequests);*/


    if(!this.getAccomodations()) {
      this.setAccomodations(AccomodationService.initialAccomodationForStudents);
    }
    
    if(!this.getHotels()) {
      this.setHotels(AccomodationService.initialHotels);
    }

    if(!this.getRestaurants()) {
      this.setRestaurants(AccomodationService.initialRestaurants);
    }

    if(!this.getRequests()) {
      this.setRequests(AccomodationService.initialRequests);
    }
  }

  getAccomodations():AccomodationForStudent[]{
    return JSON.parse(localStorage.getItem(AccomodationService.ACCOMODATIONS_FOR_STUDENTS_ARRAY_KEY));
  }

  private setAccomodations(accomodations:AccomodationForStudent[]){
    localStorage.setItem(AccomodationService.ACCOMODATIONS_FOR_STUDENTS_ARRAY_KEY, JSON.stringify(accomodations));
  }

  getHotels():Accomodation[]{
    return JSON.parse(localStorage.getItem(AccomodationService.HOTELS_ARRAY_KEY));
  }

  private setHotels(hotels:Accomodation[]){
    localStorage.setItem(AccomodationService.HOTELS_ARRAY_KEY, JSON.stringify(hotels));
  }

  getRestaurants():Accomodation[]{
    return JSON.parse(localStorage.getItem(AccomodationService.RESTAURANTS_ARRAY_KEY));
  }

  private setRestaurants(restaurants:Accomodation[]){
    localStorage.setItem(AccomodationService.RESTAURANTS_ARRAY_KEY, JSON.stringify(restaurants));
  }

  getRequests():Request[]{
    return JSON.parse(localStorage.getItem(AccomodationService.REQUESTS_ARRAY_KEY));
  }

  private setRequests(requests:Request[]){
    localStorage.setItem(AccomodationService.REQUESTS_ARRAY_KEY, JSON.stringify(requests));
  }

  getAccomodationForUser(username: string): AccomodationForStudent {
    let accomodations = this.getAccomodations();
    let result = accomodations.filter((x)=> x.student === username);
    return result.length > 0 ? result[0] : null;
  }

  getImpressionsForHotel(hotelName: string):any {
    let hotels = this.getHotels();
    hotels = hotels.filter((x)=> x.name === hotelName);
    return hotels[0].impressions;
  }

  getImpressionsForRestaurant(restaurantName: string):any {
    let restaurants = this.getRestaurants();
    restaurants = restaurants.filter((x)=> x.name === restaurantName);
    return restaurants[0].impressions;
  }

  leaveImpressionForHotel(hotelName: string, comment: string, rating: number, username: string){
    let hotels = this.getHotels();
    let index = hotels.map(x => x.name).indexOf(hotelName);
    hotels[index].impressions.push({
      comment: comment,
      rating: rating,
      student: username
    });
    this.setHotels(hotels);
  }

  leaveImpressionForRestaurant(restaurantName: string, comment: string, rating: number, username: string){
    let restaurants = this.getRestaurants();
    let index = restaurants.map(x => x.name).indexOf(restaurantName);
    restaurants[index].impressions.push({
      comment: comment,
      rating: rating,
      student: username
    });
    this.setRestaurants(restaurants);
  }

  sendChangeRequest(requestFor: string, requestNote: string, accName: string, username: string) {
    let requests = this.getRequests();
    requests.push({
      student: username,
      type: requestFor,
      accomodationName: accName,
      note: requestNote
    });
  }

  acceptRequest(request: Request, newAccName: string, newAccAddress: string) {
    let accomodationForStudent = this.getAccomodationForUser(request.student);
    if(request.type === "smestaj") {
      accomodationForStudent.hotel.name = newAccName;
      accomodationForStudent.hotel.address = newAccAddress;
    } else {
      accomodationForStudent.restaurant.name = newAccName;
      accomodationForStudent.restaurant.address = newAccAddress;
    }
    this.removeRequest(request);
  }

  removeRequest(request: Request) {
    let requests = this.getRequests();
    let index = -1;
    for(var i = 0; i < requests.length; i++) {
      if(requests[i].student === request.student && requests[i].type === request.type){
        index = i;
        break;
      }
    }
    requests.splice(index, 1);
    this.setRequests(requests);
  }
}
