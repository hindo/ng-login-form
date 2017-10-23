import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { INVALID_EMAIL_OR_PASSWORD } from './login.constant';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  public formError: string;
  public submitted: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.formError = '';
  }

  handleSubmit(data, isValid) {
    this.submitted = true;
    this.formError = '';
    if (isValid) {
      const { email, password, remember } = data;
      const state = this.authService.login(email, password, remember);
      if (state) {
        this.router.navigate(['/']);
      } else {
        this.formError = INVALID_EMAIL_OR_PASSWORD;
      }
    }
  }
}
