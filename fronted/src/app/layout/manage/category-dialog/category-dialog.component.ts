import { Component } from '@angular/core';
import { MaterialModule } from '@common/material.module';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpRespone} from '@common/interfaces/HttpRespone';
import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';
import { Category } from '@common/interfaces/dataJson';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent {

  isUpdate: boolean; // 是否是编辑模式

  editForm: FormGroup;

  private destroy$ = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private fb: FormBuilder
  ) {

    // 初始化表单
    this.editForm = this.fb.group({
      category_id: [null, []],
      category_name: ['', [Validators.required]],
      category_icon: ['', [Validators.required]]
    });

    this.isUpdate = !!this.data; // 判断是否是编辑模式

    // 如果是编辑模式,则填充表单
    if (this.isUpdate) {
      this.editForm.patchValue(this.data);  // 填充表单
    }


  }


  // 提交表单
  submit() {
    // 获取表单数据
    const formData = this.editForm.getRawValue();

    this.httpClient.post<HttpRespone<Category[]>>(`/api/addCategory`, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close(true);
        }
      });

    }

}
