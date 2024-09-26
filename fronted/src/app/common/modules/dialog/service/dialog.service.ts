import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmDialogComponent } from '@common/modules/dialog/dialog/dialog.component';

import { CmDialogData } from '../interfaces/CmDialogData';

@Injectable({
  providedIn: 'root'
})
export class CmDialogService {
  constructor(private dialog: MatDialog) { }

  open(data:CmDialogData){
   return this.dialog.open(CmDialogComponent,{
      width: data?.width || '450px',
      data :data
    });
  }
}
