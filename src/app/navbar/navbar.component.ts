import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  public logOut(): void {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }
  
  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("jwt");
    return !!token;
  }
}
