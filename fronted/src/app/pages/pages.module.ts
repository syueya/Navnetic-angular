import { CommonUseModule } from '@common/commonUse.module';
import { MaterialModule } from '@common/material.module';
import { IconsModule } from '@common/icons/icons.module';
import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { UrlUpdateComponent } from './url-update/url-update.component';
import { PagesCardComponent } from './pages-card/pages-card.component';
import { PagesSidenavComponent } from './pages-sidenav/pages-sidenav.component';
import { PagesFullComponent } from './pages-full/pages-full.component';


@NgModule({
  declarations: [
    PagesCardComponent,
    PagesSidenavComponent,
    CategoryUpdateComponent,
    UrlUpdateComponent,
    PagesFullComponent
  ],
  imports: [
    CommonUseModule,
    MaterialModule,
    IconsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
