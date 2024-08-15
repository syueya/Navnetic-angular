import { Component } from '@angular/core';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';


import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';
import { Category, UrlItem } from '@common/interfaces/dataJson';


@Component({
  selector: 'app-url-dialog',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './url-dialog.component.html',
  styleUrl: './url-dialog.component.scss'
})
export class UrlDialogComponent {
  isUpdate: boolean; // 是否是编辑模式

  form: FormGroup;



  private destroy$ = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<UrlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  { categoryId: number; urlData: UrlItem },
    private fb: FormBuilder
  ) {

    // 初始化表单
    this.form = this.fb.group({
      id: [null, []],
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      href: ['', [Validators.required]],
      description: ['', []]
    });

    this.isUpdate = !!this.data; // 判断是否是编辑模式

    // 如果是编辑模式,则填充表单
    if (this.isUpdate) {
      this.form.patchValue(this.data.urlData);  // 填充表单
    }


  }


  // 提交表单
  onSubmit() {
    // 获取表单数据
    const formData = this.form.getRawValue();

    this.httpClient.post<UrlItem[]>(`/addUrl?category_id=${this.data.categoryId}`, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.closeDialog(); // 调用关闭弹窗的方法
        }

      });

    }


  // 关闭弹窗
  closeDialog(): void {
    this.dialogRef.close(this.form.value); // 传递表单值
  }


}
