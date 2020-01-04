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

  private currentUser: User;
  private headerComponent: HeaderComponent;

  constructor() { 
    console.log("User service created!");
  }

  isUserLogged(): boolean{
    return this.getCurrentUser() != null;
  }

  register(user: User) {
    UserService.loginUsers.push(user);
  }

  changeCurrentUserData(user: User) {
    let index = UserService.loginUsers.map(user=>user.username).indexOf(this.currentUser.username);
    UserService.loginUsers[index] = user;
  }

  private setCurrentUser(user: User){
    localStorage.setItem(UserService.USER_INFO_STORAGE_KEY, JSON.stringify(user));
    this.currentUser = user;
  }

  getCurrentUser(): User{
    if(!this.currentUser){
      this.currentUser = JSON.parse(localStorage.getItem(UserService.USER_INFO_STORAGE_KEY));
    }
    return this.currentUser;
  }

  login(username: string, password: string){
    this.currentUser = this.getUserForUsernameAndPassword(username, password);
    this.setCurrentUser(this.currentUser);
    this.headerComponent.changeHeaderView(this.currentUser.type);
  }

  getUserForUsernameAndPassword(username: string, password: string): User{
    var result = UserService.loginUsers.filter((user)=>{
      return user.username === username && user.password === password;
    });

    return result.length > 0 ? result[0] : null;
  }

  userExists(username: string, password: string): boolean{
    var result = UserService.loginUsers.filter((user)=>{
      return user.username === username && user.password === password;
    });

    return result.length > 0;
  }

  logout(){
    this.setCurrentUser(null);
  }

  setHeaderComponent(headerComponent: HeaderComponent) {
    this.headerComponent = headerComponent;
  }

}
