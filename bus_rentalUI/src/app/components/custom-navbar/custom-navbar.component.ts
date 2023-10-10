import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent  implements OnInit{
  currentLoggedInUserName:string = '';
  currentLoggedInUserId:number = 0;
  isAdmin=false;

  loggedUser : {id:number,userName: string, userEmail:string,isAdmin:boolean,phoneNo:string} | null;

  constructor(private userService: UserService,private route: ActivatedRoute, private router: Router)
  {
    this.loggedUser = this.userService.getCurrentUser();
    this.currentLoggedInUserName = this.loggedUser?.userName!;
    this.currentLoggedInUserId = this.loggedUser?.id!;

    this.isAdmin = this.loggedUser?.isAdmin!;
  }
  ngOnInit(): void {
    
  }

  userLogOut()
  {
    this.userService.logout();
    this.currentLoggedInUserName= '';
    window.location.reload();
       
  }
}
