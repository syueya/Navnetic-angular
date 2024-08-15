import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/material/material.module';
import { IconsModule } from '@common/icons/icons.module';


import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';

import { Category, UrlItem } from '@common/interfaces/dataJson';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../pages/category-dialog/category-dialog.component';
import { UrlDialogComponent } from '../pages/url-dialog/url-dialog.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    MatDialogModule,
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {

  // json数据
  data: Category[] = [];

  // 分类数据
  dataCategory: Category | null = null;


  private destroy$ = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  // 加载数据
  loadData() {
    this.httpClient.get<Category[]>(`/read`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.data = res;
      });
  }

  // 删除分类
  deleteCategory(categoryId: number) {
    this.dataCategory = this.data.find(category => category.category_id === categoryId) || null;
    this.httpClient.delete<Category[]>(`/delCategory?category_id=${categoryId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.loadData();
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
        this.loadData();
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
        this.loadData();
      }
    });
  }



  // 删除网址
  deleteUrl(categoryId: number, urlId: number) {
    this.httpClient.delete<UrlItem[]>(`/delUrl?category_id=${categoryId}?url_id=${urlId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.loadData();
      });
  }


}

