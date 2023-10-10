import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusDetails } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-update-bus',
  templateUrl: './update-bus.component.html',
  styleUrls: ['./update-bus.component.css']
})
export class UpdateBusComponent implements OnInit {

  busDetail: BusDetails = {
    id: 0,
    model: '',
    image: '',
    maker: '',
    numberPlate: '',
    isAvailable: false,
    rentalPrice: 0,
  };

  rentalDuration = 0;
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

  updateBus() {
    const makerName: string = this.getBusNameById(this.busDetail.maker);

    this.busDetail.maker = makerName;

    const makerModel: string = this.getBusModelById(this.busDetail.model);

    this.busDetail.model = makerModel;

    // console.log("Update");
    // console.log(this.busDetail.model);
    // console.log(this.busDetail.maker);
    this.busService.updateBus(this.busDetail.id, this.busDetail).subscribe({
      next: (response) => {
        alert(response['message']);
        this.router.navigate(['admin-actions']);
      },
      error: (error) => {
        console.log('Bus Could not be updated.');
      },
    });
  }

  getBusNameById(makerNameId: any): string {
    switch (makerNameId) {
      case '0':
        return 'TATA';
      case '1':
        return 'Ford';
      case '2':
        return 'Mahindra';
      case '3':
        return 'BMW';
      case '4':
        return 'Audi';
      case '5':
        return 'Mercedes';
      default:
        return makerNameId;
    }
  }

  getBusModelById(makerModelId: any): string {
    switch (makerModelId) {
      case '0':
        return 'Sedan';
      case '1':
        return 'SUV';
      case '2':
        return 'MUV';
      case '3':
        return 'Crossover';
      case '4':
        return 'Coupe';
      case '5':
        return 'Hatchback';
      default:
        return makerModelId;
    }
  }
}
