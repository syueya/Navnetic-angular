import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'cm-on-destory',
  templateUrl: './on-destory.component.html',
  styleUrl: './on-destory.component.scss'
})
export class CmOnDestoryComponent implements OnDestroy, OnInit {

  $destroy: Subject<void>;

  constructor() {
    this.$destroy = new Subject();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    // console.warn('销毁')
    this.$destroy.next();
    this.$destroy.complete();
  }
}

