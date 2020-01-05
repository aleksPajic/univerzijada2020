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
  private static LOGIN_USERS_ARRAY_KEY: string = "univerzijadaLoginUsersArray";

  static initialLoginUsers:User[] = [
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
    if(!localStorage.getItem(UserService.LOGIN_USERS_ARRAY_KEY)){
      this.setLoginUsers(UserService.initialLoginUsers);
    }
  }

  isUserLogged(): boolean{
    return this.getCurrentUser() != null;
  }

  register(user: User) {
    let loginUsers = this.getLoginUsers();
    loginUsers.push(user);
    this.setLoginUsers(loginUsers);
  }

  private getLoginUsers():User[]{
    return JSON.parse(localStorage.getItem(UserService.LOGIN_USERS_ARRAY_KEY));
  }

  private setLoginUsers(users:User[]){
    localStorage.setItem(UserService.LOGIN_USERS_ARRAY_KEY, JSON.stringify(users));
  }

  changeCurrentUserData(user: User) {
    let loginUsers = this.getLoginUsers();
    let index = loginUsers.map(user=>user.username).indexOf(this.currentUser.username);
    loginUsers[index] = user;
    this.setLoginUsers(loginUsers);
    this.setCurrentUser(user);
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
    let loginUsers = this.getLoginUsers();
    var result = loginUsers.filter((user)=>{
      return user.username === username && user.password === password;
    });

    return result.length > 0 ? result[0] : null;
  }

  userExists(username: string, password: string): boolean{
    let loginUsers = this.getLoginUsers();
    var result = loginUsers.filter((user)=>{
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
