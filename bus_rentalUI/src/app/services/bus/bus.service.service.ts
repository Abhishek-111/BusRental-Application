import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllRentalAgreements, BusDetails, RentalAgreementData, ReturnRequest, UserRentalAgreements } from 'src/app/models/bus.Model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BusServiceService {

  baseApiUrl : string = environment.baseApiUrl;
  constructor(private http:HttpClient) { }
  
  getAllBuss(): Observable<BusDetails[]>{
    return this.http.get<BusDetails[]>(this.baseApiUrl + '/api/Bus/get-bus');
  }

  addBus(newBus: BusDetails): Observable<BusDetails>{
    return this.http.post<BusDetails>(this.baseApiUrl + '/api/Bus/add-bus',newBus);
  }
  deleteBus(id:string):Observable<any>{
    return this.http.delete<any>(this.baseApiUrl + '/api/Bus/delete-a-bus/'+ id);
  }

  updateBus(id:number,carData:BusDetails):Observable<any>{
    return this.http.put<any>(this.baseApiUrl + '/api/Bus/update-a-bus/' + id,carData);
  }

  getBusDetail(id:string): Observable<BusDetails>{
    return this.http.get<BusDetails>(this.baseApiUrl + '/api/Bus/get-a-bus/'+ id);
  }

  addRentalAgreement(addNewAgreement: RentalAgreementData): Observable<RentalAgreementData>{
    return this.http.post<RentalAgreementData>(this.baseApiUrl + '/api/Bus/rental-agreement',addNewAgreement);
  }

  getUserRentalAgreements(userId:string):Observable<UserRentalAgreements[]>{
    return this.http.get<UserRentalAgreements[]>(this.baseApiUrl + '/api/Bus/user-rental-agreement/'+ userId);
  }

  returnRequest(returnReq:ReturnRequest): Observable<ReturnRequest>{
    return this.http.post<ReturnRequest>(this.baseApiUrl + '/api/Bus/return-request',returnReq);
  }

  getAllRentalAgreements(): Observable<AllRentalAgreements[]>{
    return this.http.get<AllRentalAgreements[]>(this.baseApiUrl + '/api/Bus/all-agreements');
  }

  validateReturnRequest(id:string){
    return this.http.delete(this.baseApiUrl + '/api/Bus/validate-return-request/' + id);
  }
}
