import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HeaderComponent } from 'src/app/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static TYPE_STUDENT:string = "student";
  public static TYPE_ORGANISATOR:string = "organisator";
  private static USER_INFO_STORAGE_KEY: string = "univerzijadaUserInfo";

  static loginUsers:User[] = [
    {
      username: "student1",
      password: "sifra123",
      firstName: "Marina",
      lastName: "Filipovic",
      address: "Mije Kovacevica 10b",
      contactNumber: "0652864154",
      type: UserService.TYPE_STUDENT
    },
    {
      username: "organizator1",
      password: "sifra123",
      firstName: "Darko",
      lastName: "Stankovic",
      address: "",
      contactNumber: "0652864154",
      type: UserService.TYPE_ORGANISATOR
    }
  ]

  private currentUser: User = null;
  private headerComponent: HeaderComponent;

  constructor() { }

  isUserLogged(): boolean{
    return this.currentUser != null;
  }

  private setCurrentUser(user: User){
    localStorage.setItem(UserService.USER_INFO_STORAGE_KEY, JSON.stringify(user));
    this.headerComponent.setUser(user);
  }

  getCurrentUser(){
    if(!this.currentUser){
      this.currentUser = JSON.parse(localStorage.getItem(UserService.USER_INFO_STORAGE_KEY));
    }
    return this.currentUser;
  }

  login(username: string, password: string){
    this.currentUser = this.getUserForUsernameAndPassword(username, password);
    this.setCurrentUser(this.currentUser);
  }

  getUserForUsernameAndPassword(username: string, password: string): User{
    var result = UserService.loginUsers.filter((user)=>{
      return user.username === username && user.password === password;
    });

    return result.length > 0 ? result[0] : null;
  }

  validateLogin(){

  }

  setHeaderComponent(headerComponent: HeaderComponent) {
    this.headerComponent = headerComponent;
  }

}
