import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { MaterialModule } from '@common/material/material.module';
import { IconsModule } from '@common/icons/icons.module';


import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';

import { Category } from '@common/interfaces/dataJson';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../pages/category-dialog/category-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule,MaterialModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {

  // json数据
  data: Category[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient
  ) {}


  // 从FullComponent组件传入侧边栏
  @Input() sidenav?:  MatSidenav;

  // 切换侧边栏
  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }


  // 加载数据
  loadData() {
    this.httpClient.get<Category[]>(`/read`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.data = res;
      });
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
        this.loadData();
      }

    });
  }



}
