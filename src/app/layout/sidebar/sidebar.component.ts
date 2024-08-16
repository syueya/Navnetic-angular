import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IconsModule } from '@common/icons/icons.module';
import { MaterialModule } from '@common/modules/material.module';

import { DataService } from '@common/service/data.service';
import { Subscription } from 'rxjs';

import { Category } from '@common/interfaces/dataJson';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    MaterialModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent{
  data: Category[] = [];

  // 订阅 DataService 提供的数据流
  private dataSubscription: Subscription | null = null;
  constructor(
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

  ngOnDestroy() {
    // 取消订阅以避免内存泄漏
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
