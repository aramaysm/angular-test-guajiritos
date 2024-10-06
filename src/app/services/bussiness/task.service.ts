import { EventEmitter, Injectable, Output } from '@angular/core';
import { TaskApiService } from '../api/task-api.service';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  @Output() evGetAll = new EventEmitter<Task[]>();
  taskList: Task[] = []

  constructor(private taskServiceAPI: TaskApiService) { }

  getAllTask(){
     this.taskServiceAPI.getAllTaskAPI().subscribe((tasks)=>{
      this.taskList = tasks;      
      this.evGetAll.emit(tasks);
     });;
  }

  createTask(newData: any){
     return this.taskServiceAPI.createTaskAPI(newData);
  }

  updateTask(newData: any):Observable<Task>{
    return this.taskServiceAPI.editTaskAPI(newData);
  }
  deleteTask(newData: any):Observable<Task>{
    return this.taskServiceAPI.deleteTaskAPI(newData);
  }

  getTaskByUser(id:number){
    return this.taskServiceAPI.getTaskByUser(id).subscribe((tasks)=>{
      this.taskList = tasks;      
      this.evGetAll.emit(tasks);
     });;
  }
}
