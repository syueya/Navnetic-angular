import { Component, Input } from '@angular/core';
import { Category } from '../interfaces/dataJson';
import { environment } from '@env/environment';

@Component({
  selector: 'app-pages-sidenav',
  templateUrl: './pages-sidenav.component.html',
  styleUrl: './pages-sidenav.component.scss'
})

export class PagesSidenavComponent {

  // 从父组件获取数据
  @Input() allData: Category[];
  @Input() isSidebarCollapsed: boolean = true;

  // 当前版本号
  currentVersion: string = environment.version;


  // 用于跟踪当前活动的类别ID
  activeCategoryId: number | null = null;

  // 分类图标路径
  svgPath(name: string): string {
    return `assets/svgs/${name}.svg`; // 所有图标都是svg格式
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
}
