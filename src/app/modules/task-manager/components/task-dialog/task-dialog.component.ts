import { Component, Inject, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusTaskEnum } from '../../../../utils/enums/status_task.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../../../../utils/validators/date_validator';
import { UserService } from '../../../../services/bussiness/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/bussiness/auth.service';
import { User } from '../../../../models/user.model';
import { UserRolEnum } from '../../../../utils/enums/userrol.enum';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public authService: AuthService
  ) {
    
  }

  taskForm = new FormGroup({
    task_name : new FormControl('',[
      Validators.required,
      Validators.minLength(5),
    ]),
    desc : new FormControl('',),
    date: new FormControl({value: new Date(), disabled: false},
      Validators.required,
      
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
  
  user_assigned: number = -1;
  subscription: Subscription[] = new Array<Subscription>();
  user_error: boolean = false;
  usersList: User[] = []
  

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

    this.authService.loadUser();

    if (this.data.params !== undefined) {
      this.taskForm.patchValue({
        task_name: this.data.params.name,
        desc : this.data.params.description,
        date: this.data.params.date,        
      });

     if(this.data?.params?.status === 'Completada' || this.authService.token.rol === UserRolEnum.USER ) {
      this.taskForm.get('task_name')?.disable();
      this.taskForm.get('desc')?.disable();
      this.taskForm.get('date')?.disable();
     }
      

     this.status = this.data.params.status;    
     this.user_assigned = this.userService.getUserByName(this.data.params.user_assigned).id 
    }
    
    
    this.userService.getUsersActive().subscribe((next)=>{
      this.usersList = next;
    });

  }

  onClose() {  
    this.dialogRef.close();
  }

  onChangeSelectStatus($event: any) {
    this.status = $event.target.value;
    
  }

  onSave(){
    
    if(this.user_assigned === -1){
      this.user_error = true;
    }
    else{  
      if(this.data?.params?.status === 'Completada')   {
        this.dialogRef.close();
      } 
      else{
        const data = {
          id: this.data ? this.data.params?.id : null,
          name: this.taskForm.value.task_name,
          description: this.taskForm.value.desc,
          status: this.status,
          user_assigned: this.user_assigned,
          date: this.data.params?.id ? this.taskForm.value.date : this.taskForm.value.date?.toISOString().substring(0,10)
        }
  
        this.dialogRef.close(data);
      }
      
    }
    
  }


  onChangeUser($event: any){
    this.user_assigned = Number($event.target.value) ;
    
    if(this.user_assigned === -1){
      this.user_error = true;
    }
    else{
      this.user_error = false;
    }
  }

}
