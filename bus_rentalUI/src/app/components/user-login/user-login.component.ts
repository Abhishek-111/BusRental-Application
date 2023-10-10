import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserLoginModel } from 'src/app/models/user/user.Model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  currentLoggedInUserName:string = '';
  currentLoggedInUserId:number = 0;
  isAdmin=false;

  loggedUser : {id:number,userName: string, userEmail:string,isAdmin:boolean,phoneNo:string} | null;
  constructor(private userService: UserService,private router: Router)
   { 
    this.loggedUser = this.userService.getCurrentUser();
    this.currentLoggedInUserName = this.loggedUser?.userName!;
    this.currentLoggedInUserId = this.loggedUser?.id!;
    this.isAdmin = this.loggedUser?.isAdmin!;
   }

   ngOnInit(): void {
    if(this.currentLoggedInUserName)
    {
      this.router.navigate(['search-buss']);
    }
   }
   
  userLoginRequest: UserLoginModel = {
    email: '',
    password: ''
  };

  userLogin() {
    //temporarily
    if(this.userLoginRequest.email && this.userLoginRequest.password){
      this.userService.userLogin(this.userLoginRequest)
      .subscribe({
        next:(response) => {
          console.log(response);
          if(response['message'] == 'Success')
          {
            // console.log("Success Login");
            this.userService.setCurrentUser(response['id'],response['userName'],this.userLoginRequest.email,response['isAdmin'],response['phone']);
            // console.log(response['message']);

            this.router.navigate(['nav']).then(() => {
              window.location.reload();
            });

            if(response['isAdmin'])
            {
               this.router.navigate(['admin-page']);
              // console.log('Admin Hai');
            }
            this.router.navigate(['search-buss']);
            
          }
        },
        error:(error) => {
          alert("Invalid Credentials");
          // console.log("Invalid Credentials");
        }
      })
      
    }
  }

}
