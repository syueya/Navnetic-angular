import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../common/material/material.module';
import { MenuList, MenuItem } from '../../common/menu-list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  mainMenuList: MenuItem[] = MenuList;
  /* 点击菜单，expanded状态取反 */
  toggleSubMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }

}
