import { Component } from '@angular/core';

import { MaterialModule } from '../../common/material/material.module';
import { IconsModule } from '../../common/icons/icons.module';



@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    MaterialModule,
    IconsModule
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
