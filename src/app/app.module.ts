import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guard/auth-guard.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { QuoteComponent } from './quote/quote.component';
import { FooterComponent } from './footer/footer.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

//all components routes
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'quotes', component: QuoteComponent },
];

//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HomepageComponent,
    LoginComponent,
    NavbarComponent,
    QuoteComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["libraryapiapp.azurewebsites.net"],
        disallowedRoutes: []
      }
    }),
    ToastrModule.forRoot()
  ],  
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
