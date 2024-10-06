import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHTTPMSgService } from '../bussiness/ProcessHTTPMSg.service';
import { Observable, catchError } from 'rxjs';
import { User } from '../../models/user.model';
import { serverURL } from '../../utils/enums/url.path.enum';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  headers: HttpHeaders;
  path = '/users';

  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMSgService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  
  getAllUserAPI(): Observable<User[]> {
    return this.http
      .get<User[]>(serverURL + this.path)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  createUserAPI(user: User): Observable<User> {
    
    return this.http
      .post<User>(serverURL + this.path, user)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  editUserAPI(user: User): Observable<User> {
    
    return this.http
      .patch<User>(serverURL + this.path+'/'+user.id, user)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  deleteUserAPI(user: User) {    
    return this.http
      .delete<User>(serverURL + this.path+'/'+user.id)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getUserByRol(rol:number){
    let params = new HttpParams();
    params = params.append('rol', rol + '');
    return this.http
      .get<User[]>(serverURL + this.path,{params})
      .pipe(catchError(this.processHttpMsgService.handleError));
  }


}
