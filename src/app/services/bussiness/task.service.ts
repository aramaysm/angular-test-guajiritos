import { Injectable } from '@angular/core';
import { TaskApiService } from '../api/task-api.service';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private taskServiceAPI: TaskApiService) { }

  getAllTask():Observable<Task[]>{
    return this.taskServiceAPI.getAllTaskAPI();
  }
}
