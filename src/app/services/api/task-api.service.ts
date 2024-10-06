import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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
    private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMSgService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getAllTaskAPI(): Observable<Task[]> {
    return this.http
      .get<Task[]>(serverURL + this.path)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  createTaskAPI(task: Task): Observable<Task> {
    console.log("Task service", task)
    return this.http
      .post<Task>(serverURL + this.path, task)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  editTaskAPI(task: Task): Observable<Task> {
    return this.http
      .patch<Task>(serverURL + this.path+'/'+task.id, task)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
  deleteTaskAPI(task: Task): Observable<Task> {
    return this.http
      .delete<Task>(serverURL + this.path+'/'+task.id)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
  changeStateTaskAPI(newState: StatusTaskEnum, id: number): Observable<Task> {
    return this.http
      .patch<Task>(serverURL + this.path+'/'+id, {
        status: newState
      })
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getTaskByUser(id:number){
    let params = new HttpParams();
    params = params.append('user_assigned', id + '');
    return this.http
      .get<Task[]>(serverURL + this.path,{params})
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
