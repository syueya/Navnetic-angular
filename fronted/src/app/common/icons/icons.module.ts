import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerIconsModule } from 'angular-tabler-icons';
import { ImportTableIcons } from './import/import-table-icons';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TablerIconsModule.pick(ImportTableIcons)
  ],
  exports: [
    TablerIconsModule,
  ]
})
export class IconsModule { }
