import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import configurl from '../../assets/config/config.json';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin?: boolean;

  // URL for authentication API
  url = configurl.apiServer.url + '/api/Authentication/';

  constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService,
    private toastr: ToastrService) { }

  // Perform user login
  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);

    this.http.post(this.url + "login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;

      localStorage.setItem("jwt", token);

      this.invalidLogin = false;
      this.toastr.success("Logged In successfully");
      this.router.navigate(["/books"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

  // Check if the user is authenticated
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}