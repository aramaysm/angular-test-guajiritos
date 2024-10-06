import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthInterceptor } from '../../utils/interceptors/auth.interceptor';

export const routes: Routes = [
  { path: '', component: LoginComponent },
];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideNativeDateAdapter(),
  ],
  exports: [RouterModule],
})
export class AuthenticationModule { }
