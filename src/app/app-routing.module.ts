import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MatchesComponent } from './matches/matches.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { TourismComponent } from './tourism/tourism.component';
import { RequestsComponent } from './requests/requests.component';
import { HallsComponent } from './halls/halls.component';

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "student/matches", component: MatchesComponent },
  { path: "student/accomodation", component: AccomodationComponent },
  { path: "student/tourism", component: TourismComponent },
  { path: "organiser/requests", component: RequestsComponent },
  { path: "organiser/halls", component: HallsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
