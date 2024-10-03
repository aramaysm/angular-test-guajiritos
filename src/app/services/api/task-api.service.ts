import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHTTPMSgService } from '../bussiness/ProcessHTTPMSg.service';
import { serverURL } from '../../utils/enums/url.path.enum';
import { Task } from '../../models/task.model';
import { catchError, Observable } from 'rxjs';
import { StatusTaskEnum } from '../../utils/enums/status_task.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  headers: HttpHeaders;
  path = '/tasks';

  constructor(
    private _http: HttpClient,
    private processHttpMsgService: ProcessHTTPMSgService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getAllTaskAPI(): Observable<Task[]> {
    return this._http
      .get<Task[]>(serverURL + this.path)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  createTaskAPI(task: Task): Observable<Task> {
    return this._http
      .post<any>(serverURL + this.path, task)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  editTaskAPI(task: Task): Observable<Task> {
    return this._http
      .patch<any>(serverURL + this.path, task)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  changeStateTaskAPI(newState: StatusTaskEnum): Observable<Task> {
    return this._http
      .patch<any>(serverURL + this.path, {
        status: newState
      })
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
