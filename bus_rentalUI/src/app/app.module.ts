import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SearchBussComponent } from './components/search-buses/search-buses.component';
import { BookBusComponent } from './components/book-bus/book-bus.component';
import { RentalAgreementComponent } from './components/rental-agreement/rental-agreement.component';
import { UserAgreementsComponent } from './components/user-agreements/user-agreements.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminActionsComponent } from './components/admin-actions/admin-actions.component';
import { UpdateBusComponent } from './components/update-bus/update-bus.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomNavbarComponent,
    UserLoginComponent,
    SearchBussComponent,
    BookBusComponent,
    RentalAgreementComponent,
    UserAgreementsComponent,
    AdminPageComponent,
    AddBusComponent,
    NotFoundComponent,
    AdminActionsComponent,
    UpdateBusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
