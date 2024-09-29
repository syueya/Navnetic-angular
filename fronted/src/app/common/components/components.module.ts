import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@common/directives/directives.module';
import { MaterialModule } from '@common/material.module';
import { IconsModule } from '@common/icons/icons.module';

import { FormFieldErrorComponent } from './form-field-error/form-field-error.component';
import { NoDataComponent } from './no-data/no-data.component';
import { RequiredMarkComponent } from './required-mark/required-mark.component';


@NgModule({
  declarations: [FormFieldErrorComponent, RequiredMarkComponent,NoDataComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    IconsModule
  ],
  exports: [FormFieldErrorComponent, RequiredMarkComponent,NoDataComponent],
})
export class ComponentsModule { }
