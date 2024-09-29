import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from './icons/icons.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { CmStringTemplateOutletDirective } from './directives/string_template_outlet.directive';
import { MaterialModule } from './material.module';
import { FormLayoutModule } from './modules/form-layout/form-layout.module';
import { CmMessageModule } from './modules/message';
import { CmNotificationModule } from './modules/notification';
import { ParentsModule } from './parents/parents.module';


@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    DirectivesModule,
    MaterialModule,
    CmMessageModule,
    CmNotificationModule,
    CmStringTemplateOutletDirective,
    ReactiveFormsModule,
    ComponentsModule,
    ParentsModule,
    FormLayoutModule,
    IconsModule
  ],
  exports: [
    CommonModule,
    DirectivesModule,
    MaterialModule,
    CmMessageModule,
    CmNotificationModule,
    CmStringTemplateOutletDirective,
    ReactiveFormsModule,
    ComponentsModule,
    ParentsModule,
    FormLayoutModule,
    IconsModule
  ]
})

export class CommonUseModule {
  constructor() {}
 }
