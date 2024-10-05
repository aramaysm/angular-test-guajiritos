import {EventEmitter, Injectable, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import { GenericAlertComponent } from '../../common/generic-alert/generic-alert.component';
import { DialogConfirm, DialogType } from '../../utils/enums/dialog-type.enum';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  @Output() evResetEnableState = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) { }

   openGenericAlert(dialogType: DialogType, title?: string, content?: string, content2?: any, confirm: DialogConfirm = DialogConfirm.BTN_CLOSE) {
    return this.dialog.open(GenericAlertComponent, {
      //width: '564px', height: '310px',
      //width: '464px', height: '290px',
      panelClass:"dialog-notification",
      data: {
        dialogType: dialogType,
        headerTitle: title ? title : 'Error',
        content: content,
        content2: content2,
        confirm: confirm,
      },
      disableClose: true
    });
  }

 
}
