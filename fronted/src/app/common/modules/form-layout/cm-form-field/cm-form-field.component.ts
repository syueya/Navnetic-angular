import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'cm-form-field',
  templateUrl: './cm-form-field.component.html',
  styleUrls: ['./cm-form-field.component.scss']
})

export class CmFormFieldComponent implements OnInit {
  // 样式
  @Input()
  class: string = '';

  // 帮助信息
  @Input()
  help: string = '';

  //按钮模板
  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonsTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
