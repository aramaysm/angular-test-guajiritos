import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusTaskEnum } from '../../../../utils/enums/status_task.enum';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent implements OnInit {


  public task_name: string = '';
  desc: string = '';
  date: Date | any= null;
  status: number = 0;
  status_options = [
    {
      id: 1,
      name: StatusTaskEnum.COMPLETED,
    },
    {
      id: 2,
      name: StatusTaskEnum.IN_PROGRESS,
    },
    {
      id: 3,
      name: StatusTaskEnum.PENDING,
    },
  ];

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }
  
  ngOnInit(): void {
    if (this.data.client !== undefined) {
      this.task_name = this.data.name;
      this.desc = this.data.description;     
     this.status = this.data.status;
     
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onChangeSelectStatus($event: any) {
    this.status = $event.target.value;

  }

  onSave(){
    
  }

}
