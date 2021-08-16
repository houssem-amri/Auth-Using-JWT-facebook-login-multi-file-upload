import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = {};
  loginForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      pwd: ['']
    });

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  validateLogin() {
    this.userService.signIn(this.login.email, this.login.pwd);
  }



}
