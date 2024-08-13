import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '../../common/material/material.module';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { PagesComponent } from '../pages/pages.component';


@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    SidebarComponent,HeaderComponent,
    MaterialModule,
    MatIconModule,
    PagesComponent
  ],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent {



}
