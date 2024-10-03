import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRolEnum } from '../../utils/enums/userrol.enum';
import { Credentials } from '../../models/credentials.model';
import { Observable } from 'rxjs';
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
    this.authAPI.loginApi(credentials).subscribe((next)=>{
      this.decodeToken(next);
    });

  }

  decodeToken(jwt: any): any {
    const decoded:any = jwtDecode(jwt);
    const token: any = {};
    token.fullToken = jwt;
    token.company = decoded.company;
    token.fullname = decoded.fullname;
    token.rol = decoded.rol;
    token.company_type = decoded.company_type;
    token.user_id = decoded.user_id;
    token.username = decoded.username;
    const expiredAt = new Date();
    token.exp = expiredAt.getTime();
    this.token = token;
    this.saveUser(token, true);
    return token;
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
    console.log("Reload token from localstorage", localStorage.getItem('token'));
    if (localStorage.getItem('token') )
    {
      this.token = JSON.parse(localStorage.getItem('token')!);
      //this.dataUser = JSON.parse(localStorage.getItem('user')!);
      console.log("Reload token from localstorage", this.token);
    }
  }

  
}
