import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnRequest, UserRentalAgreements } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-agreements',
  templateUrl: './user-agreements.component.html',
  styleUrls: ['./user-agreements.component.css'],
})
export class UserAgreementsComponent implements OnInit {
  userAgreements: UserRentalAgreements[] = [];
  
  returnRequestData: ReturnRequest = {
    userId:0,
    busId:0
  }
  currentLoggedInUserName: string = '';
  currentLoggedInUserId: number = 0;
  // isAdmin=false;

  loggedUser: {
    id: number;
    userName: string;
    userEmail: string;
    isAdmin: boolean;
    phoneNo: string;
  } | null;

  constructor(
    private carService: BusServiceService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUser = this.userService.getCurrentUser();
    this.currentLoggedInUserName = this.loggedUser?.userName!;
    this.currentLoggedInUserId = this.loggedUser?.id!;
    // this.isAdmin = this.loggedUser?.isAdmin!;
  }

  ngOnInit(): void {
    if(this.currentLoggedInUserId)
      this.getUserAgreements();
    else{
      this.router.navigate(['']);
    
    }
  }

  getUserAgreements() {
    this.carService
      .getUserRentalAgreements(this.currentLoggedInUserId.toString())
      .subscribe({
        next: (response) => {
          console.log(response);
          this.userAgreements = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  returnBus(carId:number){
    const agree = confirm("Are you sure to Return the bus ? ");
    if(agree){
    this.returnRequestData.busId = carId;
    this.returnRequestData.userId = this.currentLoggedInUserId;
    console.log(this.currentLoggedInUserId);
    this.carService.returnRequest(this.returnRequestData)
    .subscribe({
      next:(response) =>{
        console.log("Removed")
      },
      error:(error) =>{
        console.log("Request Denied");
      }
    })
    
    console.log(carId)
  }
}

  addDaysToDate(date:string,daysToAdd:number):Date{
    const result = new Date(date);
    result.setDate(result.getDate() + daysToAdd-1);
    return result;
  }
}
