import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnProps } from '../../models/table.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OperatRowEnum } from '../../utils/enums/operat_row.enum';
import { TableNgComponent } from '../table-ng/table-ng.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SidebarComponent, TableNgComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @Input() dataSource = new MatTableDataSource<any>();
  status: number = 0;
  @Input() title: string = '';
  @Input() searchPlaceholder: string = '';
  @Input() status_options:any[] = [];
  @Input() displayedColumns: TableColumnProps[] = [];
  @Output() onSave = new EventEmitter<any>();
  @Output() selectData = new EventEmitter<any>(); 
  @Output() onSelectStatus = new EventEmitter<any>();
  @Output() onChangeSearch = new EventEmitter<any>();
  @Input() dialogToOpen: any;
  operation: 'New' | 'Edit' = 'New';
  selection = new SelectionModel<any>(false, []);

  constructor( private dialog: MatDialog) {}


  ngOnInit(): void {
       
  }

  onHandleNew() {
    this.dialog
      .open(this.dialogToOpen, {
        width: '420px',
        height: '450px',
        data: {},
        disableClose: true,
      })
      .afterClosed()
      .subscribe((next:any) => {
        if (next) {
          this.operation = 'New';
          this.onSave.emit(next);
        }
      });
  }

  onChangeSelectStatus($event: any) {
    this.status = $event.target.value;
    this.onSelectStatus.emit(this.status );
  }

  onTypeSearch($event: any){
    this.onChangeSearch.emit($event.target.value);
  }

  onSelect({ rowSelected, operation }: any) {
    this.selection.toggle(rowSelected);

    switch (operation) {
      case OperatRowEnum.EDIT:
        
        this.selectData.emit({rowSelected,operation:"Edit"});

        this.dialog
          .open(this.dialogToOpen, {
            width: '420px',
            height: '450px',
            data: {
              params: rowSelected,
            },
            disableClose: true,
          })
          .afterClosed()
          .subscribe((next) => {
            if (next) {
              this.operation = 'Edit';
              this.onSave.emit(next);
            }
          });
        break;
      case OperatRowEnum.DELETE:
        alert('Are you sure?' + rowSelected.name);
        break;
    }
  }

  
}
