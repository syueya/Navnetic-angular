import { CommonUseModule } from '@common/commonUse.module';
import { MaterialModule } from '@common/material.module';
import { IconsModule } from '@common/icons/icons.module';
import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { UrlUpdateComponent } from './url-update/url-update.component';

@NgModule({
  declarations: [CategoryUpdateComponent, UrlUpdateComponent],
  imports: [
    CommonUseModule,
    MaterialModule,
    IconsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
