import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../../models/credentials.model';
import {catchError, map} from 'rxjs/operators';
import { serverURL } from '../../utils/enums/url.path.enum';
import { ProcessHTTPMSgService } from '../bussiness/ProcessHTTPMSg.service';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  headers: HttpHeaders;
  
  constructor(
    private http: HttpClient,  private processHttpMsgService: ProcessHTTPMSgService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }


  loginApi(credentials: Credentials) {
    return this.http.post<any>(serverURL + '/login', credentials,
      { headers: this.headers, observe: 'response' }).pipe(
      map(response => {        
        return response.body;
      })
    ).pipe(catchError(this.processHttpMsgService.handleError));
  }

  
}
