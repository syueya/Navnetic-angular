import { CommonUseModule } from '@common/commonUse.module';
import { MaterialModule } from '@common/material.module';
import { IconsModule } from '@common/icons/icons.module';
import { takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpRespone } from '@common/interfaces';
import { CmDialogDataModel, CmDialogService } from '@common/modules/dialog';
import { CmMessageService } from '@common/modules/message';
import { CmParentComponent } from '@common/parents/parent/parent.component';


import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { UrlUpdateComponent } from '../url-update/url-update.component';
import { MySvgComponent } from '@common/my-svg/my-svg.component';  // svg图标组件
import { Category, UrlItem } from '@common/interfaces/dataJson';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    CommonUseModule,
    MaterialModule,
    IconsModule,
    MySvgComponent,
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})

export class ManageComponent extends CmParentComponent {
  @Input() showButtons: boolean = false; // 默认为 false

  // json数据
  allData: Category[] = [];



  // 分类数据
  dataCategory: Category | null = null;



  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private message: CmMessageService,
    private dialogService: CmDialogService
  ) {
    super();
    this.getData();
  }

  // 获取数据
  getData(): void {
    this.httpClient.get<HttpRespone<Category[]>>(`/api/read`)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        if (res.code === 20000 && res.data?.length) {
          this.allData = res.data;
        } else {
          this.allData = [];
        }
      });
  }

  // 网址图片路径
  imagePath(name: string): string {
    return `assets/images/${name}.png`; // 假设所有图标都是.png格式
  }

  // 添加编辑分类
  openCategoryDialog(row: Category): void {
    const data = row || null;
    const dialogRef = this.dialog.open(CategoryUpdateComponent, {
      width: '400px',
      data,
      disableClose: false
    });

    // 执行对话框关闭后的操作
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getData();
      }
    });
  }

  // 添加编辑网址
  openUrlDialog(event: Event, category_id: number, row?: UrlItem){
    event.preventDefault(); // 阻止链接跳转
    const data = {
      categoryId: category_id,
      urlData: row || null, // 如果 row 是可选的，这里将 row 设置为 null 或者你希望的默认值
    };

    const dialogRef = this.dialog.open(UrlUpdateComponent, {
      width: '450px',
      data,
      disableClose: false
    });

    // 执行对话框关闭后的操作
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getData();
      }
    });
  }


  // 删除分类
  deleteCategory(categoryId: number) {
    this.dialogService.open({
      model: CmDialogDataModel.confirm,
      title: '确认删除',
      content: `确认删除分类？`,
      width:'400px'
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.dataCategory = this.allData.find(category => category.category_id === categoryId) || null;
        this.httpClient.delete<HttpRespone<Category[]>>(`/api/delCategory?category_id=${categoryId}`)
        .pipe(takeUntil(this.$destroy))
          .subscribe((res) => {
            if (res.code === 20000) {
              this.message.success('分类删除成功');
              this.getData();
          }
        });
      }
    });
  }


  // 删除网址
  deleteUrl(event: Event, categoryId: number, urlId: number) {
    event.preventDefault(); // 阻止链接跳转
    this.dialogService.open({
      model: CmDialogDataModel.confirm,
      title: '确认删除',
      content: `确认删除网址？`,
      width:'400px'
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.httpClient.delete<HttpRespone<UrlItem[]>>(`/api/delUrl?category_id=${categoryId}&url_id=${urlId}`)
        .pipe(takeUntil(this.$destroy))
          .subscribe((res) => {
            if (res.code === 20000) {
              this.message.success('网址删除成功');
              this.getData();
          }
        });
      }
    });
  }

}
