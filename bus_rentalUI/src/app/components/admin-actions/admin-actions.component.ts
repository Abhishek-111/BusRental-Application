import { Component, OnInit } from '@angular/core';
import { BusDetails } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css'],
})
export class AdminActionsComponent implements OnInit {
  allBuss: BusDetails[] = [];

  constructor(private busService: BusServiceService) {}

  ngOnInit(): void {
    this.getAllBuss();
  }

  getAllBuss() {
    this.busService.getAllBuss().subscribe({
      next: (buss) => {
        this.allBuss = buss;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteBus(id: number) {
    const conf = confirm('Are you Sure to Delete?');
    if (conf) {
      console.log(id);
      this.busService.deleteBus(id.toString()).subscribe({
        next: (response) => {
          alert(response['message']);
        },
        error: (error) => {
          // console.log(error);
          alert('This bus is currently Booked');
        },
      });
    }
  }
}
