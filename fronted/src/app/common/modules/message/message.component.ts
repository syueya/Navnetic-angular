/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule, NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { moveUpMotion } from '@common/animation/move';
import { CmStringTemplateOutletDirective } from '@common/directives/string_template_outlet.directive';
import { TablerIconsModule } from 'angular-tabler-icons';

import { CmMNComponent } from './base';
import { CmMessageData } from './typings';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'cm-message',
  exportAs: 'cmMessage',
  preserveWhitespaces: false,
  animations: [moveUpMotion],
  template: `
    <div
      class="ms-message-notice"
      [@moveUpMotion]="instance.state"
      (@moveUpMotion.done)="animationStateChanged.next($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div class="ms-message-notice-content">
        <div class="ms-message-custom-content" [ngClass]="'ms-message-' + instance.type">
          <ng-container [ngSwitch]="instance.type">
            <i-tabler *ngSwitchCase="'success'"  name="circle-check" class="icon-20"></i-tabler>
            <i-tabler *ngSwitchCase="'info'" name="info-circle" class="icon-20"></i-tabler>
            <i-tabler *ngSwitchCase="'warning'" name="exclamation-circle" class="icon-20"></i-tabler>
            <i-tabler *ngSwitchCase="'error'" name="circle-x" class="icon-20"></i-tabler>
            <mat-spinner *ngSwitchCase="'loading'" diameter="20"></mat-spinner>
          </ng-container>

          <ng-container *cmStringTemplateOutlet="instance.content">
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule,NgClass, NgSwitch, NgSwitchCase,TablerIconsModule,MatProgressSpinnerModule,CmStringTemplateOutletDirective],
  standalone: true
})
export class CmMessageComponent extends CmMNComponent implements OnInit, OnDestroy {
  @Input() instance!: Required<CmMessageData>;
  @Output() override readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
