import { Component, Inject, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusTaskEnum } from '../../../../utils/enums/status_task.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../../../../utils/validators/date_validator';
import { UserService } from '../../../../services/bussiness/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent implements OnInit {

  taskForm = new FormGroup({
    task_name : new FormControl('',[
      Validators.required,
      Validators.minLength(5),
    ]),
    desc : new FormControl('',),
    date: new FormControl(new Date(),
      Validators.required
    )
  });
  
  status: string = StatusTaskEnum.PENDING;
  status_options = [
    {
      id: StatusTaskEnum.COMPLETED,
      name: StatusTaskEnum.COMPLETED,
    },
    {
      id: StatusTaskEnum.IN_PROGRESS,
      name: StatusTaskEnum.IN_PROGRESS,
    },
    {
      id: StatusTaskEnum.PENDING,
      name: StatusTaskEnum.PENDING,
    },
  ];

  user_assigned: number = 0;
  subscription: Subscription[] = new Array<Subscription>();

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
  ) {
    
  }

  get task_name() {
    return this.taskForm.get('task_name');
  }
  get desc() {
    return this.taskForm.get('desc');
  }

  get date(){
    return this.taskForm.get('date');
  }
  
  ngOnInit(): void {
    if (this.data.params !== undefined) {
      this.taskForm.patchValue({
        task_name: this.data.params.name,
        desc : this.data.params.description,
        date: this.data.params.date,        
      });
        
     this.status = this.data.params.status;    
     this.user_assigned = this.data.params.user_assigned 
    }

    if(this.userService.usersList && this.userService.usersList.length === 0 )
      this.userService.getAllUser();
  }

  onClose() {  
    this.dialogRef.close();
  }

  onChangeSelectStatus($event: any) {
    this.status = $event.target.value;
  }

  onSave(){
    const data = {
      id: this.data ? this.data.params?.id : null,
      name: this.taskForm.value.task_name,
      description: this.taskForm.value.desc,
      status: this.status,
      user_assigned: this.user_assigned,
      date: this.taskForm.value.date?.toISOString().substring(0,10)
    }
    this.dialogRef.close(data);
  }

}
