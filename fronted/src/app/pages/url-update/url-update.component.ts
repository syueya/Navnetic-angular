import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRespone } from '@common/interfaces';
import { CmParentFormComponent } from '@common/parents/parent-form/parent-form.component';
import { takeUntil } from 'rxjs';

import { UrlItem } from '../interfaces/dataJson';

@Component({
  selector: 'app-url-update',
  templateUrl: './url-update.component.html',
  styleUrl: './url-update.component.scss'
})
export class UrlUpdateComponent extends CmParentFormComponent {
  isUpdate: boolean; // 是否是编辑模式

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<UrlUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  { categoryId: number; urlData: UrlItem },
    private fb: FormBuilder
  ) {
    super(); // 调用父类的构造函数

    // 初始化表单
    this.editForm = this.fb.group({
      id: [null, []],
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      href: ['', [Validators.required]],
      description: ['', []]
    });

    this.isUpdate = !!this.data; // 判断是否是编辑模式

    // 如果是编辑模式,则填充表单
    if (this.isUpdate) {
      this.editForm.patchValue(this.data.urlData);  // 填充表单
    }
  }


  // 提交保存
  submit() {
    if (!this.editForm.valid) {
      return;
    }
    // 获取表单数据
    const formData = this.editForm.getRawValue();

    this.httpClient
    .post<HttpRespone<UrlItem[]>>(`/api/addUrl?category_id=${this.data.categoryId}`, formData)
      .pipe(takeUntil(this.$destroy))
      .subscribe(res => {
        if (res.code === 20000) {
          this.dialogRef.close(true);
        }
      });
    }

}
