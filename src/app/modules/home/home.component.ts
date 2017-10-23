import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { FlashMessageService } from '../../services/flash.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  public message: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessageService: FlashMessageService
  ) { }

  ngOnInit() {
    if (this.flashMessageService.has()) {
      this.message = this.flashMessageService.get();
    }
  }

  logout(event) {
    event.preventDefault();
    this.authService.logout();

    this.router.navigate(['/auth']);
  }
}
