import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { AccomodationService } from 'src/services/accomodation.service';
import { Router } from '@angular/router';
import { Request } from 'src/models/request';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  @ViewChild('closeModal', {static: false}) private closeModal: ElementRef;

  requests: Request[];
  hasRequests: boolean;
  currentRequest: Request;
  newAccomodationName: string;
  newAccomodationAddress: string;

  constructor(private userService: UserService, private accService: AccomodationService, private router: Router) { 
    if(!this.userService.isUserLogged() || this.userService.getCurrentUser().type != UserService.TYPE_ORGANISATOR){
      router.navigate(["welcome"]);
    }

    this.requests = this.accService.getRequests();
    this.hasRequests = this.requests.length > 0;
  }

  ngOnInit() {
  }

  setRequestToAccept(request: Request) {
    this.currentRequest = request;
  }

  acceptRequest(request: Request) {
    this.accService.acceptRequest(request, this.newAccomodationName, this.newAccomodationAddress);
    this.requests = this.accService.getRequests();
    this.closeModal.nativeElement.click();
  }

  denyRequest(request: Request) {
    this.accService.removeRequest(request);
    this.requests = this.accService.getRequests();
  }
}
