import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@common/material.module';
import { IconsModule } from '@common/icons/icons.module';
import { ManageComponent } from '../manage/manage.component';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { Category, UrlItem } from '@common/interfaces/dataJson';
import { MatDialog } from '@angular/material/dialog';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { MySvgComponent } from '@common/my-svg/my-svg.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-full',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // 添加 ChangeDetectionStrategy.OnPush 来保证组件的变更检测
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    ManageComponent,
    ReactiveFormsModule,
    MySvgComponent
  ],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})


export class FullComponent {

  // 获取侧边栏实例
  @ViewChild('sidenav') sidenav: MatSidenav | null = null;

  data: Category[] = []; // json数据
  isSidebarCollapsed: boolean = true; // 切换侧边栏状态是折叠的
  showButtons: boolean = true; // 控制按钮显示的状态
  searchForm: FormGroup; // 搜索表单
  searchData: UrlItem[] = []; // 定义一个属性来存储搜索过滤后的数据
  activeCategoryId: number | null = null; // 用于跟踪当前活动的类别ID
  private dataSubscription: Subscription | null = null; // 订阅 DataService 提供的数据流


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef

  ) {
    this.searchForm = this.fb.group({
      searchKeyword: [''], // 初始化 searchKeyword 控件为空字符串
    });
  }


  ngOnInit() {
    // 订阅搜索表单的值变化
    this.searchForm.get('searchKeyword')?.valueChanges
      .pipe(debounceTime(500)) // 用户停止输入500毫秒后触发搜索
      .subscribe((value) => {
      if (value) {
        this.filterDataBySearchTerm(value); // 过滤数据
        this.cdr.markForCheck(); // 表单值变化时触发变更检测
      } else {
        this.clearSearchTerm(); // 若没有输入，清空搜索结果
      }
    });
  }


  // 点击侧边栏滚动到指定分类
  scrollToCategory(categoryId: number): void {
    this.activeCategoryId = categoryId; // 设置为当前类别
    // 滚动到指定分类
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  // 判断当前类别是否为点击状态
  isActive(categoryId: number): boolean {
    return this.activeCategoryId === categoryId; // 检查当前类别是否为活动状态
  }

  // 根据搜索词过滤数据
  filterDataBySearchTerm(term: string): void {
    if (term) {
      const filteredUrls = this.data
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

    // 执行对话框关闭后的操作
    dialogRef.afterClosed().subscribe(result => {
      if(result){

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
