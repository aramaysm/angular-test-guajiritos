import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableNgComponent } from '../../common/table-ng/table-ng.component';
import { TaskManagerViewComponent } from './containers/task-manager-view/task-manager-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../../common/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../utils/interceptors/auth.interceptor';
import { HeaderRowOutlet } from '@angular/cdk/table';
import { HeaderComponent } from '../../common/header/header.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutComponent } from '../../common/layout/layout.component';

export const routes: Routes = [
  { path: '', component: TaskManagerViewComponent },
];

@NgModule({
  declarations: [TaskManagerViewComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LayoutComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideNativeDateAdapter(),
  ],
  exports: [RouterModule],
})
export class TaskManagerModule {}
