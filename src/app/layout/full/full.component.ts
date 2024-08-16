import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/modules/material.module';
import { IconsModule } from '@common/icons/icons.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ManageComponent } from '../manage/manage.component';
import { PagesComponent } from '../pages/pages.component';

import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';

import { DataService } from '@common/service/data.service';
import { Subscription } from 'rxjs';
import { Category } from '@common/interfaces/dataJson';

import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../manage/category-dialog/category-dialog.component';


@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    MaterialModule,
    IconsModule,
    ManageComponent,
    PagesComponent
  ],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent {

  isSidebarCollapsed: boolean = true; // 切换侧边栏状态是折叠的

  currentComponent: string = 'pages'; // 默认显示 pages 组件

  // json数据
  data: Category[] = [];

  // 获取侧边栏实例
  @ViewChild('sidenav') sidenav: MatSidenav | null = null;

  // 订阅 DataService 提供的数据流
  private dataSubscription: Subscription | null = null;

  // 构造函数
  constructor(
    public dialog: MatDialog,
    private dataService: DataService
  ) {}


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


  // 切换侧边栏
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidenav?.toggle(); // 切换侧边栏的显示状态
  }

  // 切换组件
  toggleComponent() {
    this.currentComponent = this.currentComponent === 'pages' ? 'manage' : 'pages';
  }

  // 打开dialog
  openCategoryDialog(row?: Category): void {
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

  ngOnDestroy() {
    // 取消订阅以避免内存泄漏
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
