import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickNotDragDirective } from './click-not-drag/click-not-drag.directive';
import { DebounceTimeDirective } from './debounce-time/debounce-time.directive';
import { DoubleClickDirective } from './double-click/double-click.directive';
import { ErrorImageDirective } from './error-image/error-image.directive';
import { CmHideDirective } from './hidden/hide.directive';
@NgModule({
  declarations: [DebounceTimeDirective, DoubleClickDirective, CmHideDirective,ErrorImageDirective,ClickNotDragDirective],
  imports: [CommonModule],
  exports: [DebounceTimeDirective, DoubleClickDirective, CmHideDirective,ErrorImageDirective,ClickNotDragDirective]
})
export class DirectivesModule {}
