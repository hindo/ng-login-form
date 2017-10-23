import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { INVALID_EMAIL_OR_PASSWORD } from './login.constant';

class MockRouter {
  navigate() { }
}

class MockAuthService {
  login(email: string, password: string, remember: boolean = false) {
    if (password === 'Password1') {
      return true;
    }
    return false;
   }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: DebugElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    element = fixture.debugElement;

  }));

  it(`should be initialized with 'submitted' false`, async(() => {
    expect(component.submitted).toBeFalsy();
  }));

  it(`should have no message when proper credentials supplied`, async(() => {
    const formData = {
      email: 'test@test.pl',
      password: 'Password1',
      remember: false,
    };

    component.handleSubmit(formData, true);
    expect(component.submitted).toBeTruthy();
    expect(component.formError).toBe('');
  }));

  it(`should have error message when wrong credentials supplied`, async(() => {
    const formData = {
      email: 'test@test.pl',
      password: 'Password0',
      remember: false,
    };

    component.handleSubmit(formData, true);
    expect(component.submitted).toBeTruthy();
    expect(component.formError).toBe(INVALID_EMAIL_OR_PASSWORD);
  }));
});
