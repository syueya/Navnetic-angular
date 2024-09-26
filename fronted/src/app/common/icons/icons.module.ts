import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerIconsModule } from 'angular-tabler-icons';
import { CustomTablerIcons } from './import';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TablerIconsModule.pick(CustomTablerIcons)
  ],
  exports: [
    TablerIconsModule,
  ]
})
export class IconsModule { }
