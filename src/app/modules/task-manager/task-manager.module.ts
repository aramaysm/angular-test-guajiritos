import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableNgComponent } from '../../common/table-ng/table-ng.component';
import { TaskManagerViewComponent } from './containers/task-manager-view/task-manager-view.component';
import { RouterModule, Routes } from '@angular/router';



export const routes: Routes = [

  { path: '', component: TaskManagerViewComponent}];


@NgModule({
  declarations: [
    TaskManagerViewComponent
  ],
  imports: [
    CommonModule,
    TableNgComponent,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class TaskManagerModule { }
