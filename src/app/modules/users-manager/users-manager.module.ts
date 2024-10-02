import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { TableNgComponent } from '../../common/table-ng/table-ng.component';

export const routes: Routes = [

  { path: '', component: AddUserDialogComponent}];


@NgModule({
  declarations: [
    AddUserDialogComponent
  ],
  imports: [RouterModule.forChild(routes),CommonModule,
    TableNgComponent
  ],
  exports: [RouterModule]
 
})
export class UsersManagerModule { }
