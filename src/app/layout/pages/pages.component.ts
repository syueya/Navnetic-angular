import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/modules/material.module';
import { IconsModule } from '@common/icons/icons.module';

import { DataService } from '@common/service/data.service';
import { Subscription } from 'rxjs';

import { OnInit } from '@angular/core';


import { Category, UrlItem } from '@common/interfaces/dataJson';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // 只在变化时重新渲染
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
  // 分类图片路径
  svgPath(name: string): string {
    return `assets/svg/${name}.svg`; // 假设所有图标都是.svg格式
  }

  // 网址图片路径
  imagePath(name: string): string {
    return `assets/images/${name}.png`; // 假设所有图标都是.png格式
  }

  // trackBy 用于遍历数据时的优化
  categorytrackByFn(index: number, item: Category): number {
    return item.category_id; // 假设每个分类的 category_id 是唯一的
  }
  // trackBy 用于遍历数据时的优化
  urltrackByFn(index: number, item: UrlItem): number {
    return item.id; // 假设每个分类的 category_id 是唯一的
  }


  ngOnDestroy() {
    // 取消订阅以避免内存泄漏
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}



