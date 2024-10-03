import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { DefaultMatCalendarRangeStrategy, MatDatepickerModule, MatRangeDateSelectionModel } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListItem, MatListModule } from '@angular/material/list';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableNgComponent } from './table-ng/table-ng.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';


const MaterialModule = [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
  MatProgressBarModule,
  MatListModule,
  MatOptionModule,
  ];

  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
     TableNgComponent
      
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TableNgComponent
    ],
    declarations: [
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [DefaultMatCalendarRangeStrategy, MatRangeDateSelectionModel,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  })
  export class SharedModule { }
  