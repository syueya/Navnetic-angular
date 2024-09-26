import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { CmOnDestoryComponent } from '../on-destory/on-destory.component';

@Component({
  selector: 'cm-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class CmParentComponent extends CmOnDestoryComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {


  /**
   * 搜索表单事件
   */
  $searchFormEvent: Subject<void>;


  constructor() {
    super();
    this.$searchFormEvent = new Subject();


  }

  override ngOnInit() {
  }
  override ngOnDestroy() {
    super.ngOnDestroy();


  }
  ngAfterViewInit() {
    // //console.log('调用父组件')
    setTimeout(() => {
      this.handlerAfterViewInit();
    }, 0);
  }

  ngAfterContentInit() {

  }

  /**
   * 内容初始化后调用该方法
   *
   * @memberof CmParentComponent
   */
  handlerAfterViewInit() {

  }
}
