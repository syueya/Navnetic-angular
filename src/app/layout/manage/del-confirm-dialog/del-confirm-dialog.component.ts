import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './del-confirm-dialog.component.html',
  styleUrl: './del-confirm-dialog.component.scss'
})


export class DelConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DelConfirmDialogComponent>,
  ) {}

  // 关闭弹窗
  closeDialog(): void {
    // 关闭对话框并返回结果
    this.dialogRef.close(false);
  }

  // 提交表单
  onSubmit() {
    this.dialogRef.close(true);
  }
}
