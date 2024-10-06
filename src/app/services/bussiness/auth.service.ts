import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRolEnum } from '../../utils/enums/userrol.enum';
import { Credentials } from '../../models/credentials.model';
import { catchError, map, Observable } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token:  any;
  credentials: Credentials  | any;
  initialLogin:  any;
  private dataUser? : Credentials;
  adminRoles = [UserRolEnum.ADMIN, UserRolEnum.USER];
  
  constructor(private authAPI: AuthApiService) {
    
  }


  login(credentials: Credentials) {
    this.credentials = credentials;
    this.dataUser = credentials;
    return this.authAPI.loginApi(credentials).pipe(
      map(response => {
        console.log("Login response",response);
        return this.decodeToken(response.user);
      })
    )
  }

  decodeToken(user: any): any {
    
    this.saveUser(user, true);
    return user;
  }


  public saveUser(token: any, set?: boolean) {
    if(set){
      if (token != undefined)
      {
        localStorage.clear();
        localStorage.setItem('token', JSON.stringify(token));
        //localStorage.setItem('user', JSON.stringify(this.dataUser));
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.token = {};
    }
  }

  public clearUser() {
    localStorage.clear();
  }

  public loadUser() {
    
    if (localStorage.getItem('token') )
    {
      this.token = JSON.parse(localStorage.getItem('token')!);
      //this.dataUser = JSON.parse(localStorage.getItem('user')!);
      console.log("Reload token from localstorage", this.token);
    }
  }

  
}
