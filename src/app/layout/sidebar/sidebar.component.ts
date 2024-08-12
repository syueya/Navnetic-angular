import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { MenuList, MenuItem } from '../../common/menu-list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule,RouterModule],
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
