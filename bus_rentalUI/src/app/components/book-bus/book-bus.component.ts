import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingData, BusDetails } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-book-bus',
  templateUrl: './book-bus.component.html',
  styleUrls: ['./book-bus.component.css'],
})
export class BookBusComponent implements OnInit {
  busDetail: BusDetails = {
    id: 0,
    model: '',
    image: '',
    maker: '',
    numberPlate: '',
    isAvailable: false,
    rentalPrice: 0,
  };

  bookingData: BookingData = {
    busId: 0,
    numberPlate: '',
    maker: '',
    model: '',
    rentalPrice: 0,
    rentalDuration: 0,
  };

  rentalDuration = 0;
  currentLoggedInUserName:string = '';
  currentLoggedInUserId:number = 0;
  isAdmin=false;

  loggedUser : {id:number,userName: string, userEmail:string,isAdmin:boolean,phoneNo:string} | null;
  constructor(
    private route: ActivatedRoute,
    private busService: BusServiceService,
    private router: Router,
    private userService: UserService
  ) {
    this.loggedUser = this.userService.getCurrentUser();
    this.currentLoggedInUserName = this.loggedUser?.userName!;
    this.currentLoggedInUserId = this.loggedUser?.id!;
    this.isAdmin = this.loggedUser?.isAdmin!; 
  }

  ngOnInit(): void {
    this.getBusDetail();
  }
  getBusDetail() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          console.log(id);
          this.busService.getBusDetail(id).subscribe({
            next: (response) => {
              this.busDetail = response;
              console.log(this.busDetail);
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      },
    });
  }

  continue() 
  {
    if(this.currentLoggedInUserName)
    {
    if (this.rentalDuration > 0) 
    {
      this.bookingData = {
        busId: this.busDetail.id,
        numberPlate: this.busDetail.numberPlate,
        maker: this.busDetail.maker,
        model: this.busDetail.model,
        rentalPrice: this.busDetail.rentalPrice,
        rentalDuration: this.rentalDuration,
      };
      // console.log(this.bookingData.busDetail.maker);
      // console.log(this.rentalDuration);
      this.router.navigate(['rental-agreement'], {
        queryParams: this.bookingData,
      });
    }
    else{
      alert("Enter Rental Duration.");
    }
  }
  else{
    alert("You need to login first.");
    this.router.navigate(['']);
  }
}
}
