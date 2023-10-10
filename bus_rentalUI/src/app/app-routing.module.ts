import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SearchBussComponent } from './components/search-buses/search-buses.component';
import { BookBusComponent } from './components/book-bus/book-bus.component';
import { RentalAgreementComponent } from './components/rental-agreement/rental-agreement.component';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { UserAgreementsComponent } from './components/user-agreements/user-agreements.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminActionsComponent } from './components/admin-actions/admin-actions.component';
import { UpdateBusComponent } from './components/update-bus/update-bus.component';

const routes: Routes = [
  {
    path:'',
    component:UserLoginComponent
  },
  {
    path:'search-buss',
    component:SearchBussComponent
  },
  {
    path:'add-bus',
    component:AddBusComponent
  },
  {
    path:'book-bus/:id',
    component:BookBusComponent
  },
  {
    path:'rental-agreement',
    component:RentalAgreementComponent
  },
  {
    path:'nav',
    component:CustomNavbarComponent
  },
  {
    path:'user-agreements',
    component:UserAgreementsComponent
  },
  {
    path:'admin-page',
    component:AdminPageComponent
  },
  {
    path:'admin-actions',
    component:AdminActionsComponent
  },
  {
    path:'update-bus/:id',
    component:UpdateBusComponent
  },
  {
    path:'**',
    // redirectTo:'not-found'
    component:NotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
