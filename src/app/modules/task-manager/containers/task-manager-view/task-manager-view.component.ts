import { Component, OnInit, signal } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { StatusTaskEnum } from '../../../../utils/enums/status_task.enum';
import { StatusUserEnum } from '../../../../utils/enums/status_user.enum';
import { UserRolEnum } from '../../../../utils/enums/userrol.enum';
import { TableColumnProps } from '../../../../models/table.model';
import { TypeColumnEnum } from '../../../../utils/enums/type-column.enum';
import { TaskService } from '../../../../services/bussiness/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { OperatRowEnum } from '../../../../utils/enums/operat_row.enum';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../../services/bussiness/user.service';

@Component({
  selector: 'app-task-manager-view',
  templateUrl: './task-manager-view.component.html',
  styleUrl: './task-manager-view.component.css',
})
export class TaskManagerViewComponent implements OnInit {
  taskDialog = TaskDialogComponent;
  dataSource = new MatTableDataSource<Task>();

  status: string = '';
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
  displayedColumns: TableColumnProps[] = [
    {
      id: 'id',
      label: 'ID',
      type: TypeColumnEnum.TEXT,
      onHandleClick: () => {},
    },
    {
      id: 'name',
      label: 'TAREA',
      type: TypeColumnEnum.TEXT,
      onHandleClick: () => {},
    },
    {
      id: 'date',
      label: 'FECHA',
      type: TypeColumnEnum.TEXT,
      onHandleClick: () => {},
    },
    {
      id: 'user_assigned',
      label: 'ASIGNADA A',
      type: TypeColumnEnum.TEXT,
      onHandleClick: () => {},
    },
    {
      id: 'status',
      label: 'ESTADO',
      type: TypeColumnEnum.CHIP,
      onHandleClick: () => {},
    },
    {
      id: 'actions',
      label: 'ACCIONES',
      type: TypeColumnEnum.BUTTON,
      actions: [
        {
          label: 'Editar',
          classname: 'button-icon-Transp',
          onHandleClick: () => {},
          color: '#BD271E',
          icon: 'M11 3H16V4H0V3H5V1C5 0.448 5.448 0 6 0H10C10.552 0 11 0.448 11 1V3ZM3.944 11H7V12H4.1L4.492 14.519C4.534 14.788 4.746 14.977 4.985 14.977H11.015C11.254 14.977 11.466 14.788 11.508 14.519L13.006 4.943H14L12.496 14.673C12.38 15.42 11.756 15.977 11.015 15.977H4.985C4.244 15.977 3.62 15.42 3.504 14.673L1.993 4.943H9V5.95H3.157L3.476 8H8V9H3.632L3.944 11ZM6 3H10V1H6V3Z',
        },
        {
          label: 'Eliminar',
          classname: 'button-icon-Transp',
          onHandleClick: () => {},
          color: '#0071C2',
          icon: 'M12.1481 3.14807L11 2L2 11V14H5L14 5L12.8561 3.85607L4.854 11.854C4.756 11.951 4.628 12 4.5 12C4.372 12 4.244 11.951 4.146 11.854C3.951 11.658 3.951 11.342 4.146 11.146L12.1481 3.14807ZM11 1C11.256 1 11.512 1.098 11.707 1.293L14.707 4.293C15.098 4.683 15.098 5.317 14.707 5.707L5.707 14.707C5.52 14.895 5.265 15 5 15H2C1.448 15 1 14.552 1 14V11C1 10.735 1.105 10.48 1.293 10.293L10.293 1.293C10.488 1.098 10.744 1 11 1ZM5 14H2V11L5 14Z',
        },
      ],
      onHandleClick: () => {},
    },
  ];
  operation: 'New' | 'Edit' = 'New';
  selection = new SelectionModel<Task>(false, []);
  subscription: Subscription[] = new Array<Subscription>();
  dataSourceOriginal: any[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.subscription.push(
      this.taskService.evGetAll.subscribe((data) => this.onGetAllTask(data))
    );
  }

  ngOnInit(): void {
    this.taskService.getAllTask();
  }

  onGetAllTask(newTasks: Task[]) {
    

    const taskWithUsers = newTasks.map((item) => {
      return {
        ...item,
        user_assigned: this.userService.getUserById(item.user_assigned),
      };
    });
    
    this.dataSourceOriginal = taskWithUsers;
    
    this.dataSource = new MatTableDataSource<Task>(taskWithUsers);
  }

  onChangeSelectStatus(status: StatusTaskEnum | 'All') {
    this.status = status;
    if (status === 'All')
      this.dataSource = new MatTableDataSource<Task>(this.dataSourceOriginal);
    else
      this.dataSource = new MatTableDataSource<Task>(
        this.dataSourceOriginal.filter((item) => item.status === this.status)
      );
  }
  ///////////////////////////////  AREGLAR FILTER BY Status

  onSelectTask({ rowSelected, operation }: any) {
    this.selection.toggle(rowSelected);

    switch (operation) {
      case OperatRowEnum.EDIT:
        break;
      case OperatRowEnum.DELETE:
        alert('Are you sure?' + rowSelected.name);
        break;
    }
  }

  onSaveTask(newTask: any) {
    if (this.operation === 'New') this.taskService.createTask(newTask);
    else this.taskService.updateTask(newTask);
  }

  onSearch(value: string) {
    if (value === '')
      this.dataSource = new MatTableDataSource<Task>(this.dataSourceOriginal);
    else
      this.dataSource = new MatTableDataSource<Task>(
        this.dataSourceOriginal.filter(
          (item) => item.name.toString().includes(value) ||
           item.user_assigned.includes(value) || item.id === value || item.description.includes(value)
            
           
        )
      );
  }
}
