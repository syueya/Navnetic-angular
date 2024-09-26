import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRespone } from '@common/interfaces';
import { CmMessageService } from '@common/modules/message';
import { CmParentFormComponent } from '@common/parents/parent-form/parent-form.component';
import { takeUntil } from 'rxjs';

import { Category } from '@common/interfaces/dataJson';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})


export class CategoryUpdateComponent extends CmParentFormComponent {

  isUpdate: boolean; // 是否是编辑模式

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<CategoryUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private fb: FormBuilder,
    private message: CmMessageService
  ) {
    super(); // 调用父类的构造函数
    this.isUpdate = !!this.data; // 判断是否是编辑模式

    // 初始化表单
    this.editForm = this.fb.group({
      category_id: [null, []],
      category_name: ['', [Validators.required]],
      category_icon: ['', [Validators.required]]
    });

    // 如果是编辑模式
    if (this.isUpdate) {
      this.editForm.patchValue(this.data);  // 填充表单
    }
  }

  // 提交保存
  submit() {
    if (!this.editForm.valid) {
      return;
    }
    const formData = this.editForm.getRawValue(); // 获取表单数据
    this.httpClient
    .post<HttpRespone<Category[]>>(`/api/addCategory`, formData)
      .pipe(takeUntil(this.$destroy))
      .subscribe(res => {
        if (res.code === 20000) {
          this.message.success('分类新增成功');
          this.dialogRef.close(true);
        }
      });
  }
}
