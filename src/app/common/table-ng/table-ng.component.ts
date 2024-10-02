import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { User } from '../../models/user.model';
import { TableColumnProps } from '../../models/table.model';
import { CommonModule } from '@angular/common';
import { TypeColumnEnum } from '../../utils/enums/type-column.enum';



@Component({
  selector: 'app-table-ng',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './table-ng.component.html',
  styleUrl: './table-ng.component.css'
})
export class TableNgComponent implements AfterViewInit, OnInit{
  
  @Input() displayedColumns: TableColumnProps[] = [];
  @Input() dataSource : MatTableDataSource<any> =  new MatTableDataSource<any>([]);
  columnsToRender:string[] =  []
 

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
   
  }

  ngOnInit(): void {
    this.columnsToRender = this.displayedColumns.map((item)=> {
     
      return item.id
    });
   
  }


}
