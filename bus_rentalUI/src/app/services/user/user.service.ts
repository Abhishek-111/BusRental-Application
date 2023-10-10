import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginModel } from 'src/app/models/user/user.Model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userKey = 'currentLoggedInUser';

  setCurrentUser(id:number,userName: string, userEmail:string,isAdmin:boolean,phoneNo:string){
    const user = {
      id:id,
      userName:userName,
      userEmail:userEmail,
      isAdmin:isAdmin,
      phoneNo:phoneNo
    };
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getCurrentUser(): {id:number,userName: string, userEmail:string,isAdmin:boolean,phoneNo:string} | null {
    const userString = localStorage.getItem(this.userKey);
    if(userString){
      return JSON.parse(userString);
    }
    return null;
  }

  logout(){
    localStorage.removeItem(this.userKey);
  }


  baseApiUrl :string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  userLogin(userLoginRequest: UserLoginModel): Observable<any>{
    return this.http.post<any>(this.baseApiUrl + '/api/User/sign-in',userLoginRequest);
  }


}
