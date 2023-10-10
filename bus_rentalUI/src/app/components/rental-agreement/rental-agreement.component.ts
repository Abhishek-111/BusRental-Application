import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { BookingData, RentalAgreementData } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';
import { UserService } from 'src/app/services/user/user.service';
// import myImg from 'src/assets/seal.jpg';
@Component({
  selector: 'app-rental-agreement',
  templateUrl: './rental-agreement.component.html',
  styleUrls: ['./rental-agreement.component.css']
})
export class RentalAgreementComponent {

  rentalAgreementData: RentalAgreementData = {
    userId:0,
    vehicleId:0,
    rentalDuration:0,
    totalCost:0,
    //requestForReturn:false,
    //validateReturnRequest:false,
  }

  bookingData : BookingData ={
    busId : 0,
    numberPlate:'',
    maker:'',
    model:'',
    rentalPrice:0,
    rentalDuration:0
  }

  totalCost = 0;
  duration = 0  //this.bookingData.rentalDuration;
  currUserName = '';
  currUserId = 0;
  currUserEmail = '';
  currUserPhone = '';

  sign = '';
  date = new Date();

  loggedUser: {id:number,userName: string, userEmail:string,isAdmin:boolean,phoneNo:string} | null;
  constructor(private route: ActivatedRoute, private userService: UserService, private busService: BusServiceService,private router: Router){
    this.loggedUser = this.userService.getCurrentUser();
    this.currUserId = this.loggedUser?.id!;
    this.currUserName = this.loggedUser?.userName!;
    this.currUserEmail = this.loggedUser?.userEmail!;
    this.currUserPhone = this.loggedUser?.phoneNo!;
  }

  ngOnInit(){
    // Data Retrieve
    this.dataRetrive();
    this.calculateCost();
    }

  dataRetrive() 
  {
    this.route.queryParams.subscribe((params) => {
      const bookingData = params as BookingData;
      if(bookingData.busId && bookingData.rentalDuration){
        this.bookingData.busId = bookingData.busId;
        this.bookingData.numberPlate = bookingData.numberPlate;
        this.bookingData.maker = bookingData.maker;
        this.bookingData.model = bookingData.model;
        this.bookingData.rentalPrice = bookingData.rentalPrice;
        this.bookingData.rentalDuration = bookingData.rentalDuration;
        this.duration = bookingData.rentalDuration;
        // const maker = bookingData.maker;
        // const rentalDuration = bookingData.rentalDuration;
        // console.log("Bus Detail: ",maker);
      }
      
    }
  )
  }

  calculateCost()
  {
    this.totalCost = this.bookingData.rentalPrice * this.duration;
  }

  confirmBooking(){
    if(this.currUserEmail){
    const agree = confirm('Are You sure for '+ this.duration + ' days booking?');
    if(agree){
      this.rentalAgreementData.userId = this.currUserId;
      this.rentalAgreementData.vehicleId = this.bookingData.busId;
      this.rentalAgreementData.rentalDuration = this.duration;
      this.rentalAgreementData.totalCost = this.bookingData.rentalPrice * this.duration
      // console.log(this.rentalAgreementData.userId);
      // console.log(this.rentalAgreementData.rentalDuration);
      // console.log(this.rentalAgreementData.totalCost);
      // console.log(this.rentalAgreementData.vehicleId);

      this.busService.addRentalAgreement(this.rentalAgreementData)
      .subscribe({
        next:(apiResponse) => {
          console.log(apiResponse);
        }
      })
      
      alert("Your booking has confirmed for "+ this.duration + " days from today");
      this.router.navigate(["search-buss"]);
    }
  }
  else 
  {
    alert("You need to login first.");
    this.router.navigate([""]);
  }
   
  }

}
