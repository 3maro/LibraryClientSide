import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // Log out the user by removing JWT token and navigating to home
  public logOut(): void {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }
  
  // Check if the user is authenticated
  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("jwt");
    return !!token;
  }
}
