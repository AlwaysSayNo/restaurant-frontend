import { Component, OnInit } from '@angular/core';
import {SignIn} from "../../shared.model/SignIn";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../shared.model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  error = '';

  credentials: SignIn = {
    username: '',
    password: ''
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.userValue) {
      void this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  get user(): User {
    return this.authenticationService.userValue;
  }

  onSubmit() {
    this.submitted = true;

    this.authenticationService.login(this.credentials.username, this.credentials.password)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          void this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.error = error;
        }
      });
  }

}
