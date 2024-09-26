import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@common/directives/directives.module';
import { MaterialModule } from '@common/material.module';
import { IconsModule } from '@common/icons/icons.module';

import { FormFieldErrorComponent } from './form-field-error/form-field-error.component';
import { CmInputSeletedSearchComponent } from './input-seleted-search/input-seleted-search.component';
import { NoDataComponent } from './no-data/no-data.component';
import { RequiredMarkComponent } from './required-mark/required-mark.component';


@NgModule({
  declarations: [FormFieldErrorComponent, RequiredMarkComponent,CmInputSeletedSearchComponent,NoDataComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    IconsModule
  ],
  exports: [FormFieldErrorComponent, RequiredMarkComponent,CmInputSeletedSearchComponent,NoDataComponent],
})
export class ComponentsModule { }
