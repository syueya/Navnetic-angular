import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/modules/material.module';
import { IconsModule } from '@common/icons/icons.module';

import { DataService } from '@common/service/data.service';
import { Subscription } from 'rxjs';

import { OnInit } from '@angular/core';


import { Category } from '@common/interfaces/dataJson';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


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

  // 订阅 DataService 提供的数据流
  private dataSubscription: Subscription | null = null;

  // 分类数据
  dataCategory: Category | null = null;

  constructor(
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

  ngOnDestroy() {
    // 取消订阅以避免内存泄漏
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}



