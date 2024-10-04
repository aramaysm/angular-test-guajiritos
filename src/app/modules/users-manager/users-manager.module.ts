import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { TableNgComponent } from '../../common/table-ng/table-ng.component';
import { UsersManagerViewComponent } from './containers/users-manager-view/users-manager-view.component';
import { HeaderComponent } from '../../common/header/header.component';
import { SidebarComponent } from '../../common/sidebar/sidebar.component';
import { LayoutComponent } from '../../common/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const routes: Routes = [
  { path: '', component: UsersManagerViewComponent },
];

@NgModule({
  declarations: [AddUserDialogComponent, UsersManagerViewComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports: [RouterModule],
})
export class UsersManagerModule {}
