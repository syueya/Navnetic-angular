import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '@common/material.module';
import { CmDialogDataModel } from '@common/modules/dialog/enum/CmDialogDataModel';
import { CmDialogData } from '@common/modules/dialog/interfaces/CmDialogData';
import { CommonUseModule } from '@common/commonUse.module';

@Component({
  selector: 'cm-dialog',
  standalone: true,
  imports: [MaterialModule, CommonUseModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class CmDialogComponent {
  static instance: CmDialogComponent;

  modelType = CmDialogDataModel;
  // 当前组件类型
  model: CmDialogDataModel | string = CmDialogDataModel.confirm;

  constructor(public dialogRef: MatDialogRef<CmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CmDialogData) {
    CmDialogComponent.instance = this;
    if (data.model) {
      this.model = data.model;
      switch (data.model) {
        case CmDialogDataModel.delete:
          // 如果为删除时，修改确定按钮名称
          data.sureStr = '删除';
          break;
        case CmDialogDataModel.confirm:
          // 如果为确认时，修改确定按钮名称
          data.sureStr = '确认';
          break;
        case CmDialogDataModel.info:
          // 如果为提示时，修改确定按钮名称
          data.sureStr = '好的';
          break;

        default:
          break;
      }
    }
  }


  onNoClick(param?: any): void {
    if (this && this.dialogRef) {
      this.dialogRef.close(param);
    } else {
      CmDialogComponent.instance.dialogRef.close(param);
    }
  }
}
