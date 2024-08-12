import { Component } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    SidebarComponent,HeaderComponent,

    MatSidenavModule,

    MatListModule,
    MatIconModule,
  ],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent {

}
