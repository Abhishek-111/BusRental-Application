import { Component, OnInit } from '@angular/core';
import { BusDetails, searchBusParameters } from 'src/app/models/bus.Model';
import { BusServiceService } from 'src/app/services/bus/bus.service.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-search-buses',
  templateUrl: './search-buses.component.html',
  styleUrls: ['./search-buses.component.css']
})
export class SearchBussComponent implements OnInit {
  allBuss : BusDetails[] = [];
  filteredBuss: BusDetails[] = [];

  constructor(private busService: BusServiceService) { }

  searchBuss : searchBusParameters = {
    Maker:'',
    Model: '',
    RentalPrice : 0
  }
  totalBuss = 0

//   allBuss = [{Id:12,Model:"abc",Maker:"BMW",RentalPrice:112,IsAvailable:"yes"},
// {Id:12,Model:"abc",Maker:"BMW",RentalPrice:112,IsAvailable:"yes"}]; 

  ngOnInit(){
    this.getAllBuss();
    
  }
  
  getAllBuss(){
     this.busService.getAllBuss()
    .subscribe({
      next:(buss) => {
        this.allBuss = buss;
        this.totalBuss = buss.length;
        this.filterBuss();
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterBuss():void
  {
    if(this.searchBuss.Maker && this.searchBuss.Model && this.searchBuss.RentalPrice )
    {
      const makerName : string = this.getBusNameById(this.searchBuss.Maker);
      const makerModel : string = this.getBusModelById(this.searchBuss.Model);
      this.filteredBuss = this.allBuss.filter(bus => bus.maker.toLowerCase() === makerName.toLowerCase() && bus.model.toLowerCase() === makerModel.toLowerCase() && bus.rentalPrice <= this.searchBuss.RentalPrice);
    }
    else if(this.searchBuss.Maker )
    {
      const makerName : string = this.getBusNameById(this.searchBuss.Maker);
      // const makerModel : string = this.getMakerModelById(this.searchBuss.Model);
      this.filteredBuss = this.allBuss.filter(bus => bus.maker.toLowerCase() === makerName.toLowerCase());
    }
    else if(this.searchBuss.Model)
    {
      const makerModel : string = this.getBusModelById(this.searchBuss.Model);
      this.filteredBuss = this.allBuss.filter(bus =>  bus.model.toLowerCase() === makerModel.toLowerCase());
    }
    else if(this.searchBuss.RentalPrice)
    {
      this.filteredBuss = this.allBuss.filter(bus =>  bus.rentalPrice <= this.searchBuss.RentalPrice);
    }

    else{
      this.filteredBuss = this.allBuss;
    }
  }

  

  searchBus(){
     const makerName : string = this.getBusNameById(this.searchBuss.Maker);
     const makerModel : string = this.getBusModelById(this.searchBuss.Model);
     console.log(makerName);
     console.log(makerModel);
     console.log(this.searchBuss.RentalPrice);

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
