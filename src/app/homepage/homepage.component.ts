import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent  {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }

  // Check if the user is authenticated
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  // Log out the user by removing JWT token
  public logOut = () => {
    localStorage.removeItem("jwt");
  }

}