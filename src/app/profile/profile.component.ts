import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('closeModal', {static: false}) private closeModal: ElementRef;

  isEditing: boolean;
  user: User;
  newPassword: string;
  errorMessagePassword: string;
  errorMessage: string;

  constructor(public userService: UserService, public router: Router) { 
    if(this.userService.isUserLogged()){
      this.isEditing = false;
      this.newPassword = null;
      this.errorMessage = null;
      this.errorMessagePassword = null;
      this.user = this.userService.getCurrentUser();
    } else {
      this.router.navigate(["/login"]);
    }
    
  }

  ngOnInit() {
  }

  enableEditing(){
    this.isEditing = true;
  }

  saveChanges(){
    if(this.isValidEdit()){
      this.userService.changeCurrentUserData(this.user);
      this.errorMessage = null;
      this.isEditing = false;
    }else{
      this.errorMessage = "Unos svih podataka je obavezan. Korisničko ime mora sadržati minimalno 5 karaktera.";
    }
  }

  changePassword(){
    if(this.newPassword != null && this.newPassword.trim().length >= 8) {
      this.user.password = this.newPassword;
      this.userService.changeCurrentUserData(this.user);
      this.newPassword = null;
      this.errorMessagePassword = null;
      this.closeModal.nativeElement.click();
    }else{
      this.errorMessagePassword = "Lozinka mora imati minimalno 8 karaktera!";
    }
  }

  isValidEdit(): boolean{
    if(this.user.firstName === null || this.user.firstName.trim().length === 0 || 
        this.user.lastName === null || this.user.lastName.trim().length === 0){
      return false;
    }

    if(this.user.address === null || this.user.address.trim().length === 0 || 
        this.user.contactNumber === null || this.user.contactNumber.trim().length === 0){
      return false;
    }

    if(this.user.username === null || this.user.username.trim().length < 5){
      return false;
    }

    return true;
  }
}
