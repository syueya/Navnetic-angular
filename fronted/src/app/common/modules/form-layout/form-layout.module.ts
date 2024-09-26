import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@common/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

import { CmFormFieldComponent } from './cm-form-field/cm-form-field.component';


@NgModule({
  declarations: [CmFormFieldComponent],
  imports: [
    CommonModule,MaterialModule,TablerIconsModule
  ],
  exports:[CmFormFieldComponent]
})
export class FormLayoutModule { }
