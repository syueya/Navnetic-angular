/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { toCssPixel } from '@common/util/convertUtil';
import { CM_MESSAGE_DEFAULT_CONFIG } from '@common/util/defines';

import { CmMNContainerComponent } from './base';
import { CmMessageComponent } from './message.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'cm-message-container',
  exportAs: 'cmMessageContainer',
  preserveWhitespaces: false,
  template: `
    <div class="ms-message" [style.top]="top">
      <cm-message
        *ngFor="let instance of instances"
        [instance]="instance"
        (destroyed)="remove($event.id, $event.userAction)"
      ></cm-message>
    </div>
  `,
  imports: [CmMessageComponent, NgForOf],
  standalone: true
})
export class CmMessageContainerComponent extends CmMNContainerComponent {
  top?: string | null;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }


  protected updateConfig(): void {
    this.config = CM_MESSAGE_DEFAULT_CONFIG;

    this.top = toCssPixel(this.config.cmTop);
    this.cdr.markForCheck();
  }
}
