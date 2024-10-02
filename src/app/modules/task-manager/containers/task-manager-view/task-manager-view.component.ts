import { Component } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { StatusTaskEnum } from '../../../../utils/enums/status_task.enum';
import { StatusUserEnum } from '../../../../utils/enums/status_user.enum';
import { UserRolEnum } from '../../../../utils/enums/userrol.enum';
import {  TableColumnProps } from '../../../../models/table.model';
import { TypeColumnEnum } from '../../../../utils/enums/type-column.enum';

@Component({
  selector: 'app-task-manager-view',
  templateUrl: './task-manager-view.component.html',
  styleUrl: './task-manager-view.component.css',
})
export class TaskManagerViewComponent {
  dataSource = new MatTableDataSource<Task>([
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
     
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
     
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned:
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
     
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.COMPLETED,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.IN_PROGRESS,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
    {
      id: 0,
      name: 'Design strategy',
      description: 'This is the descrption of design strategy',
      status: StatusTaskEnum.PENDING,
      user_assigned: 
        {
          id: 0,
          name: 'Pedro Luis',
          username: 'pedri',
          status: StatusUserEnum.ACTIVATED,
          rol: UserRolEnum.USER,
        },
      
    },
  ]);

  displayedColumns: TableColumnProps[] = [
    {
      id: "id",
      label: "ID",
      type: TypeColumnEnum.TEXT,
      onHandleClick: ()=> {}
    },
    {
      id: "name",
      label: "NAME",
      type: TypeColumnEnum.TEXT,
      onHandleClick: ()=> {}
    },
    {
      id: "user_assigned",
      label: "ASIGNADO A",
      type: TypeColumnEnum.TEXT,
      onHandleClick: ()=> {}
    },
    {
      id: "status",
      label: "STATUS",
      type: TypeColumnEnum.CHIP,
      onHandleClick: ()=> {}
    },
    {
      id: "actions",
      label: "ACCIONES",
      type: TypeColumnEnum.BUTTON,
      actions:[
        {
          label: "Cambiar estado",
          classname:"button-Primary",
          onHandleClick: ()=> {}
        },
        {
          label: "Editar",
          classname:"button-Primary",
          onHandleClick: ()=> {}
        },
        {
          label: "Eliminar",
          classname:"button-Error",
          onHandleClick: ()=> {}
        },
      ],
      onHandleClick: ()=> {}
    },
  ]
}
