import { Injectable } from '@angular/core';

import { FlashMessageService } from '../../services/flash.service';
import { EMAIL, PASSWORD } from './auth.constant';

@Injectable()
export class AuthService {

  private authenticated: boolean;

  constructor(private flashMessageService: FlashMessageService) {
    const initialState = JSON.parse(localStorage.getItem('authenticated'));
    this.authenticated = !!initialState;
  }

  login(email: string, password: string, remember: boolean = false) {
    if (email === EMAIL && password === PASSWORD) {
      this.authenticated = true;
      this.flashMessageService.set('login successful');
    }

    if (this.authenticated && remember) {
      localStorage.setItem('authenticated', JSON.stringify(this.authenticated));
    }

    return this.authenticated;
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('authenticated');
  }

  isLogged() {
    return this.authenticated;
  }
}
