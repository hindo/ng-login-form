import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { HomeComponent } from './home.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: [ AuthGuard ],
})
export class HomeModule { }
