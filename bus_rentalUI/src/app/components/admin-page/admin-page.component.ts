import { Component, OnInit } from '@angular/core';
import { AllRentalAgreements } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  allAgreements : AllRentalAgreements[] = [];

  constructor(private busService: BusServiceService){}

  ngOnInit(): void {
    this.getAllAgreements();
  }

  getAllAgreements()
  {
    this.busService.getAllRentalAgreements()
    .subscribe({
      next :(response) =>{
        console.log(response);
        this.allAgreements = response;
      }
    })
  }

  validateReturnRequest(agreementId:number)
  {
    console.log(agreementId);
    this.busService.validateReturnRequest(agreementId.toString())
    .subscribe({
      next:(response) =>{
        console.log(response);
      },
      error:(error) => {
        console.log(error);
      }
    })
  }

  addDaysToDate(date:string,daysToAdd:number):Date{
    const result = new Date(date);
    result.setDate(result.getDate() + daysToAdd);
    return result;
  }

  deleteAgreement(agreementId:number){
    console.log(agreementId);
  }

}
