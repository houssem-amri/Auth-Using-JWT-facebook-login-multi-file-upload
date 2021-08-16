import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  url: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.url = this.router.url;
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.minLength(4)],
      email: ['', [Validators.email, Validators.required]],
      pwd: ['', Validators.required],

    })
  }
  signup(user) {
    user.role = (this.url == '/signup') ? 'user' : 'admin';
    this.userService.signup(user).subscribe(
      (data) => {
        if (data.message == "0") {
          document.getElementById("errorMsg").innerHTML = "User exixts into DB";
        } else {
          this.router.navigate(['']);
        }
      }
    )
  }

}
