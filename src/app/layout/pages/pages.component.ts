import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/material/material.module';
import { IconsModule } from '@common/icons/icons.module';


import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';
import { Category } from '@common/interfaces/dataJson';



@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule
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
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  // 加载数据
  loadData() {
    this.httpClient.get<Category[]>(`/api/read`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.data = res;
      });
  }


  // 编辑分类
  editCategory(categoryId:string) {

  }


  // 删除分类
  deleteCategory(categoryId:string) {
    this.dataCategory = this.data.find(category => category.category_id === categoryId) || null;
    console.log(this.dataCategory);
    this.httpClient.get<Category[]>(`/api/delete`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.data = res;
      });
  }



  // 编辑网址
  editUrl() {
  }


  // 删除网址
  deleteUrl() {
  }

}

