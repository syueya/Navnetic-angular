import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { MaterialModule } from '@common/material/material.module';
import { IconsModule } from '@common/icons/icons.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsModule,MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {

  // 从FullComponent组件传入侧边栏
  @Input() sidenav?:  MatSidenav;

  // 切换侧边栏
  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
