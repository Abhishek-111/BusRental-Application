import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusDetails } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css'],
})
export class AddBusComponent {
  addBusRequest: BusDetails = {
    id: 0,
    model: '',
    image: '',
    maker: '',
    numberPlate: '',
    isAvailable: false,
    rentalPrice: 0,
  };

  currentLoggedInUserName: string = '';
  currentLoggedInUserId: number = 0;
  isAdmin = false;

  loggedUser: {
    id: number;
    userName: string;
    userEmail: string;
    isAdmin: boolean;
    phoneNo: string;
  } | null;
  constructor(
    private busService: BusServiceService,
    private userService: UserService,
    private router: Router
  ) {
    this.loggedUser = this.userService.getCurrentUser();
    this.currentLoggedInUserName = this.loggedUser?.userName!;
    this.currentLoggedInUserId = this.loggedUser?.id!;

    this.isAdmin = this.loggedUser?.isAdmin!;
  }

  addBus() {
    const makerName: string = this.getBusNameById(this.addBusRequest.maker);
    this.addBusRequest.maker = makerName;
    const makerModel: string = this.getBusModelById(this.addBusRequest.model);
    this.addBusRequest.model = makerModel;
    if (this.addBusRequest.rentalPrice <= 0) {
      alert('Rental Price should be greater than 0.');
    } else {
      this.busService.addBus(this.addBusRequest).subscribe({
        next: (response) => {
          console.log(response);
          alert('Bus Added Successfully');
          this.router.navigate(['search-buss']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  getBusNameById(makerId: any): string {
    switch (makerId) {
      case '0':
        return 'TATA Motors'
      case '1':
        return 'Ashok Leyland';
      case '2':
        return 'Eicher Motors';
      case '3':
        return 'Force Motors';
      case '4':
        return 'Mahindra';
      case '5':
        return 'Bharat Benz';
      default:
        return '';
    }
  }

  getBusModelById(makerId: any): string {
    switch (makerId) {
      case '0':
        return 'Coach';
      case '1':
        return 'School Bus';
      case '2':
        return 'Mini Bus';
      case '3':
        return 'Mini Coach';
      case '4':
        return 'Single Decker';
      case '5':
        return 'Double Decker';
      default:
        return '';
    }
  }
}


