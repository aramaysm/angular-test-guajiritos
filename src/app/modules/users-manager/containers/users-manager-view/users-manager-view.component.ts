import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnProps } from '../../../../models/table.model';
import { OperatRowEnum } from '../../../../utils/enums/operat_row.enum';
import { TypeColumnEnum } from '../../../../utils/enums/type-column.enum';
import { StatusUserEnum } from '../../../../utils/enums/status_user.enum';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/bussiness/user.service';
import { AddUserDialogComponent } from '../../components/add-user-dialog/add-user-dialog.component';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../services/bussiness/dialog.service';
import {
  DialogType,
  DialogConfirm,
} from '../../../../utils/enums/dialog-type.enum';
import { AuthService } from '../../../../services/bussiness/auth.service';
import { UserRolEnum } from '../../../../utils/enums/userrol.enum';

@Component({
  selector: 'app-users-manager-view',
  templateUrl: './users-manager-view.component.html',
  styleUrl: './users-manager-view.component.css',
})
export class UsersManagerViewComponent {
  subscription: Subscription[] = new Array<Subscription>();
  userDialog = AddUserDialogComponent;
  dataSource = new MatTableDataSource<User>();
  dataSourceOriginal: User[] = [];

  status: string = '';
  status_options = [
    {
      id: StatusUserEnum.ACTIVATED,
      name: StatusUserEnum.ACTIVATED,
    },
    {
      id: StatusUserEnum.UNAIVALAIBLE,
      name: StatusUserEnum.UNAIVALAIBLE,
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
      id: 'firstname',
      label: 'NOMBRE',
      type: TypeColumnEnum.TEXT,
      onHandleClick: () => {},
    },
    {
      id: 'lastname',
      label: 'APELLIDOS',
      type: TypeColumnEnum.TEXT,
      onHandleClick: () => {},
    },
    {
      id: 'email',
      label: 'EMAIL',
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
  selection = new SelectionModel<User>(false, []);

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private authService: AuthService
  ) {
    this.subscription.push(
      this.userService.evGetAll.subscribe((data) => this.onGetAllUsers(data))
    );
  }

  ngOnInit(): void {
    this.authService.loadUser();

      if ( this.authService.token?.rol === UserRolEnum.ADMIN)
        this.userService.getUserByRol(UserRolEnum.USER);
      else this.userService.getUserByRol(UserRolEnum.ADMIN);  
   
  }

  onChangeSelectStatus(status: StatusUserEnum | 'All') {
    this.status = status;
    if (status === 'All')
      this.dataSource = new MatTableDataSource<User>(this.dataSourceOriginal);
    else
      this.dataSource = new MatTableDataSource<User>(
        this.dataSourceOriginal.filter((item) => item.status === this.status)
      );
  }

  onSelectUser({ rowSelected, operation }: any) {
    this.selection.toggle(rowSelected);

    switch (operation) {
      case OperatRowEnum.EDIT:
        this.operation = 'Edit';
        break;
      case OperatRowEnum.DELETE:
        this.dialogService
          .openGenericAlert(
            DialogType.DT_WARNING,
            'Confirmación',
            '¿Está seguro que desea eliminar al usuario?',
            null,
            DialogConfirm.BTN_CONFIRM
          )
          .afterClosed()
          .subscribe((next: any) => {
            if (next?.confirm === true) {
              this.userService.deleteUser(rowSelected).subscribe(
                () => {
                  if ( this.authService.token?.rol === UserRolEnum.ADMIN)
                    this.userService.getUserByRol(UserRolEnum.USER);
                  else this.userService.getUserByRol(UserRolEnum.ADMIN); 
                },
                (err) => {
                  this.dialogService.openGenericAlert(
                    DialogType.DT_ERROR,
                    'Error',
                    err
                  );
                }
              );
            }
          });

        break;
    }
  }

  onGetAllUsers(usersNew: User[]) {
    this.dataSource = new MatTableDataSource<User>(usersNew);
    this.dataSourceOriginal = usersNew;
  }

  onSaveUser(newUser: any) {
    if (this.operation === 'New')
      this.userService.createUser(newUser).subscribe(
        (next) => {
          this.dialogService.openGenericAlert(
            DialogType.DT_SUCCESS,
            'Información',
            "El usuario fue creado con éxito"
          );
          if ( this.authService.token?.rol === UserRolEnum.ADMIN)
            this.userService.getUserByRol(UserRolEnum.USER);
          else this.userService.getUserByRol(UserRolEnum.ADMIN); 
        },
        (err) => {
          this.dialogService.openGenericAlert(
            DialogType.DT_SUCCESS,
            'Información',
            "El usuario fue editado con éxito"
          );
            this.dialogService.openGenericAlert(
              DialogType.DT_ERROR,
              'Error',
              err
            );
        }
      );
    else
      this.userService.updateUser(newUser).subscribe(
        (next) => {
          if ( this.authService.token?.rol === UserRolEnum.ADMIN)
            this.userService.getUserByRol(UserRolEnum.USER);
          else this.userService.getUserByRol(UserRolEnum.ADMIN); 
        },
        (err) => {
          this,
            this.dialogService.openGenericAlert(
              DialogType.DT_ERROR,
              'Error',
              err
            );
        }
      );
  }

  onSearch(value: string) {
    if (value === '')
      this.dataSource = new MatTableDataSource<User>(this.dataSourceOriginal);
    else
      this.dataSource = new MatTableDataSource<User>(
        this.dataSourceOriginal.filter(
          (item) =>
            item.firstname.toString().includes(value) ||
            item.lastname.toString().includes(value) ||
            item.email.toString().includes(value) ||
            item.age.toString().includes(value)
        )
      );
  }
}
