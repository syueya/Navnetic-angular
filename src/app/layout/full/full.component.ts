import { Component,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/modules/material.module';
import { IconsModule } from '@common/icons/icons.module';
import { ManageComponent } from '../manage/manage.component';
import { PagesComponent } from '../pages/pages.component';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { DataService } from '@common/service/data.service';
import { Subscription } from 'rxjs';
import { Category, UrlItem } from '@common/interfaces/dataJson';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../manage/category-dialog/category-dialog.component';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-full',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // 添加 ChangeDetectionStrategy.OnPush 来保证组件的变更检测
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    ManageComponent,
    PagesComponent,
    ReactiveFormsModule
  ],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent {

  isSidebarCollapsed: boolean = true; // 切换侧边栏状态是折叠的

  currentComponent: string = 'pages'; // 默认显示 pages 组件

  // 搜索表单
  searchForm: FormGroup;

  // json数据
  data: Category[] = [];

  searchData: UrlItem[] = []; // 定义一个属性来存储搜索过滤后的数据

  // 获取侧边栏实例
  @ViewChild('sidenav') sidenav: MatSidenav | null = null;

  // 订阅 DataService 提供的数据流
  private dataSubscription: Subscription | null = null;



  // 构造函数
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,

  ) {
    this.searchForm = this.fb.group({
      searchKeyword: [''], // 初始化 searchKeyword 控件为空字符串
    });
  }


  ngOnInit() {
    // 订阅 DataService 提供的数据流
    this.dataSubscription = this.dataService.data$.subscribe(
      (categories) => {
        this.data = categories;
        this.cdr.markForCheck(); // 通知视图更新
      }
    );
    // 加载数据
    this.dataService.loadData();

    // 订阅搜索表单的值变化
    this.searchForm.get('searchKeyword')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filterDataBySearchTerm(value); // 过滤数据
        this.cdr.markForCheck(); // 表单值变化时触发变更检测
      } else {
        this.clearSearchTerm(); // 若没有输入，清空搜索结果
      }
    });
  }


  scrollToCategory(categoryId: number): void {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // 根据搜索词过滤数据
  filterDataBySearchTerm(term: string): void {
    if (term) {
      console.log('Search term:', term);

      // 过滤数据，只处理 category.url 不为空的项，并只返回匹配的 url 数据
      const filteredUrls = this.data
        .flatMap(category => {
          // 确保 category.url 存在且不为空
          if (category.url && category.url.length > 0) {
            // 过滤当前分类下的 url 数组
            return category.url.filter(urlItem => {
              return (
                urlItem.name.toString().toLowerCase().includes(term.toLowerCase()) ||
                urlItem.href.includes(term) ||
                urlItem.description.includes(term)
              );
            });
          }
          // 如果 category.url 为空或不存在，则返回空数组
          return [];
        });

      this.searchData = filteredUrls; // 更新 filteredData 属性
    }
  }


  // 清空搜索词
  clearSearchTerm() {
    const searchControl = this.searchForm.get('searchKeyword');
    if (searchControl) {
      searchControl.setValue('');
    } else {
      console.error('Search form control not found');
    }
  }

  // 切换侧边栏
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidenav?.toggle(); // 切换侧边栏的显示状态
  }

  // 分类图片路径
  svgPath(name: string): string {
    return `assets/svg/${name}.svg`; // 假设所有图标都是.svg格式
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
