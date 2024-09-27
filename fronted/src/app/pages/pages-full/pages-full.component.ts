import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { CmMessageService } from '@common/modules/message';
import { MatDialog } from '@angular/material/dialog';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { FormBuilder } from '@angular/forms';
import { CmParentFormComponent } from '@common/parents/parent-form/parent-form.component';
import { debounceTime, takeUntil, filter } from 'rxjs';
import { HttpRespone } from '@common/interfaces';

import { Category, UrlItem } from '../interfaces/dataJson';

@Component({
  selector: 'app-pages-full',
  templateUrl: './pages-full.component.html',
  styleUrl: './pages-full.component.scss'
})

export class PagesFullComponent extends CmParentFormComponent {

  // 获取侧边栏实例
  @ViewChild('sidenav') sidenav: MatSidenav | null = null;

  allData: Category[] = []; // 分类网址数据
  isSidebarCollapsed: boolean = true; // 切换侧边栏状态是折叠的
  showButtons: boolean = true; // 控制按钮显示的状态
  searchData: UrlItem[] = []; // 定义一个属性来存储搜索过滤后的数据

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private message: CmMessageService
  ) {
    super();

    this.getData(); // 获取数据

    this.editForm = this.fb.group({
      searchKeyword: [''], // 初始化 searchKeyword 控件为空字符串
    });

    // 订阅搜索表单的值变化
    this.editForm.get('searchKeyword')?.valueChanges
      .pipe(
        takeUntil(this.$destroy),
        debounceTime(500),
        filter(value => value.trim() !== '') // 忽略空字符串或仅包含空格的值
      )
      .subscribe(value => {
        this.filterDataBySearchTerm(value); // 过滤数据
      });

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


  // 根据搜索词过滤数据
  filterDataBySearchTerm(term: string): void {
    if (term) {
      const filteredUrls = this.allData
        .flatMap(category => {
          if (category.url && category.url.length > 0) {
            return category.url.filter(urlItem => {
              return (
                urlItem.name.toString().toLowerCase().includes(term.toLowerCase()) ||
                urlItem.href.includes(term) ||
                urlItem.description.includes(term)
              );
            });
          }
          return [];
        });

      this.searchData = filteredUrls;
    }
  }

  // 清空搜索词
  clearSearchTerm() {
    const searchControl = this.editForm.get('searchKeyword');
    if (searchControl) {
      searchControl.setValue('');
    } else {
      console.error('未找到搜索表单控件');
    }
  }

  // 切换侧边栏
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidenav?.toggle(); // 切换侧边栏的显示状态
  }



  // 切换是否显示按钮
  toggleButtons(): void {
    this.showButtons = !this.showButtons;
  }

  // 添加分类
  addCategory(row?: Category): void {
    const data = row || null;
    const dialogRef = this.dialog.open(CategoryUpdateComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.message.success('分类添加成功');
        this.getData(); // 获取数据
      }
    });
  }
}

