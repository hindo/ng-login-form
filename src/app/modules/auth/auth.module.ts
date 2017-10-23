import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './auth.service';

import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
  { path: 'auth', children: [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
  ]},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [ AuthService ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthModule {}
