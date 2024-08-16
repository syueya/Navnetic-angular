import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/modules/material.module';
import { IconsModule } from '@common/icons/icons.module';
import { HttpRespone} from '@common/interfaces/HttpRespone';

import { DataService } from '@common/service/data.service';
import { Subscription } from 'rxjs';

import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';

import { Category, UrlItem } from '@common/interfaces/dataJson';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../manage/category-dialog/category-dialog.component';
import { UrlDialogComponent } from '../manage/url-dialog/url-dialog.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    MatDialogModule,
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent implements OnInit {

  // json数据
  data: Category[] = [];

  // 订阅 DataService 提供的数据流
  private dataSubscription: Subscription | null = null;


  // 分类数据
  dataCategory: Category | null = null;


  private destroy$ = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}


  // 加载数据
  ngOnInit() {
    // 订阅 DataService 提供的数据流
    this.dataSubscription = this.dataService.data$.subscribe(
      (categories) => {
        this.data = categories;
      }
    );
    // 加载数据
    this.dataService.loadData();
  }

  // 图片路径
  iconPath(name: string): string {
    return `assets/images/${name}.png`; // 假设所有图标都是.png格式
  }

  // 删除分类
  deleteCategory(categoryId: number) {
    this.dataCategory = this.data.find(category => category.category_id === categoryId) || null;
    this.httpClient.delete<HttpRespone<Category[]>>(`/delCategory?category_id=${categoryId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.code === 20000) {
          this.dataService.loadData();
      }
      });
  }


  // 添加编辑分类
  openCategoryDialog(row: Category): void {
    const data = row || null;
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data,
    });

    // 执行对话框关闭后的操作
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.loadData();
      }

    });
  }

  // 添加编辑网址
  openUrlDialog(category_id: number,row?: UrlItem): void {

    const data = {
      categoryId: category_id,
      urlData: row || null, // 如果 row 是可选的，这里将 row 设置为 null 或者你希望的默认值
    };

    const dialogRef = this.dialog.open(UrlDialogComponent, {
      width: '400px',
      data,
    });

    // 执行对话框关闭后的操作
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.loadData();
      }
    });
  }



  // 删除网址
  deleteUrl(categoryId: number, urlId: number) {
    this.httpClient.delete<HttpRespone<UrlItem[]>>(`/delUrl?category_id=${categoryId}&url_id=${urlId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.code === 20000) {
          this.dataService.loadData();
      }
      });
  }

  ngOnDestroy() {
    // 取消订阅以避免内存泄漏
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}

