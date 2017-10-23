/******************************************************************************
 * seerene(tm) - A framework for analyzing and visualizing complex software systems.
 * Copyright (C) 2005 - 2017 for all source codes:
 * seerene(tm) GmbH, Potsdam, Germany
 ******************************************************************************/


import { Observable } from 'rxjs/Observable';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { EMAIL, PASSWORD } from './auth.constant';

import { FlashMessageService } from '../../services/flash.service';

export class MockFlashService {
  set() { }
}

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
              AuthService,
              { provide: FlashMessageService, useClass: MockFlashService },
            ],
        });
        service = bed.get(AuthService);
        // prevent form having unwanted state in localStorage
        localStorage.removeItem('authenticated');
    });

    it('should return true in case of proper credentials', () => {
      const status = service.login(EMAIL, PASSWORD);
      expect(status).toEqual(true);
    });

    it('should return false in case of wrong credentials', () => {
      const status = service.login(EMAIL, 'Password0');
      expect(status).toEqual(false);
    });

    it('should isLogged return proper state', () => {
      let status: boolean;

      service.login(EMAIL, 'Password0');
      status = service.isLogged();
      expect(status).toEqual(false);

      service.login(EMAIL, PASSWORD);
      status = service.isLogged();
      expect(status).toEqual(true);
    });

    it('should store remember state as expected', () => {
      const spySetItem = spyOn(localStorage, 'setItem');
      service.login(EMAIL, PASSWORD, true);
      expect(spySetItem).toHaveBeenCalled();
    });

    it('should not store remember state when wrong credentials', () => {
      const spySetItem = spyOn(localStorage, 'setItem');
      service.login(EMAIL, 'pass', true);
      expect(spySetItem).not.toHaveBeenCalled();
    });

    it('should logout as expected', () => {
      let status: boolean;
      service.login(EMAIL, PASSWORD);

      status = service.isLogged();
      expect(status).toEqual(true);

      service.logout();

      status = service.isLogged();
      expect(status).toEqual(false);
    });

    it('should logout and remove remember state if stored', () => {
      const spyRemoveItem = spyOn(localStorage, 'removeItem');
      service.login(EMAIL, PASSWORD, true);
      service.logout();
      expect(spyRemoveItem).toHaveBeenCalled();
    });
});
