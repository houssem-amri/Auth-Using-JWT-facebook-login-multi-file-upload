import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  profile: any;
  username: string
  profileisSet = false
  constructor(private userService: UserService) { }

  ngOnInit(): void {


    this.userIsAuthenticated = this.userService.getIsAuth();
    console.log('here auth', this.userIsAuthenticated);

  }


  onLogout() {
    this.userService.logout();
  }



}
