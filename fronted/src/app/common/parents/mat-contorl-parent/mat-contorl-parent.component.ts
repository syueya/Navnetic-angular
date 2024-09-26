/* eslint-disable @typescript-eslint/no-explicit-any */
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, AbstractControl, NgControl, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';

import { CmParentComponent } from '../parent/parent.component';

@Component({
  selector: 'cm-mat-contorl-parent',
  templateUrl: './mat-contorl-parent.component.html',
  styleUrl: './mat-contorl-parent.component.scss'
})
export class CmMatContorlParentComponent extends CmParentComponent
implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {
 
static nextId = 0;
// 表单控制器
// valueCtrl: FormControl;
valueCtrl: AbstractControl;

// 状态检测
stateChanges = new Subject<void>();
focused = false;
// 错误状态
errorState = false;

controlType = 'custom-input-control';
id = `${this.controlType}-${CmMatContorlParentComponent.nextId++}`;
describedBy = '';


onChange = (_: any) => { }
onTouch = () => { }

get empty() {
  return !this.valueCtrl.value;
}
// 一直浮动
get shouldLabelFloat() {
  return this.focused || !this.empty
}

public get invalid() {
  return this.valueCtrl.invalid;
}

@Input()
get placeholder(): string { return this._placeholder; }
set placeholder(value: string) {
  this._placeholder = value;
  this.stateChanges.next();
}
private _placeholder = '';

@Input()
get required(): boolean { return this._required; }
set required(value: boolean) {
  this._required = coerceBooleanProperty(value);
  this.stateChanges.next();
}
private _required = false;

@Input()
get disabled(): boolean { return this._disabled; }
set disabled(value: boolean) {
  this._disabled = coerceBooleanProperty(value);
  if (value) {
    this.valueCtrl.disable();
  } else {
    this.valueCtrl.enable();
  }
  this.stateChanges.next();
}
private _disabled = false;

@Input()
get value(): any {
  return this.valueCtrl.value;
}
set value(v: any) {
  this.valueCtrl.reset(v)
}

constructor(private fm: FocusMonitor,
  private elRef: ElementRef<HTMLElement>,
  @Optional() @Self() public ngControl: NgControl) {
  super();

  this.valueCtrl = new FormControl(null);
  // 见监控fm的点击事件
  fm.monitor(elRef, true).subscribe(origin => {
    if (this.focused && !origin) {
      this.onTouch();
    }
    this.focused = !!origin;
    this.stateChanges.next();
  });
  if (this.ngControl !== null) {
    this.ngControl.valueAccessor = this;
  }

  // 监听状态
  // merge(this.valueCtrl.valueChanges, this.stateChanges).pipe(takeUntil(this.$destroy)).subscribe(_ => {
  //   this._handleInput()
  // })
  this.valueCtrl.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(_ => {
    this._handleInput()
  })
  this.stateChanges.pipe(takeUntil(this.$destroy)).subscribe(_ => {
    this.errorState = this.ngControl && this.ngControl.touched && this.ngControl.invalid;
  })
}


override ngOnDestroy() {
  super.ngOnDestroy()
  this.stateChanges.complete();
  this.fm.stopMonitoring(this.elRef);
}

setDescribedByIds(ids: string[]) {
  this.describedBy = ids.join(' ');
}

/**
 * 点击后
 */
onContainerClick(event: MouseEvent) {
  if ((event.target as Element).tagName.toLowerCase() !== 'input') {
    this.valueCtrl.markAsTouched();
  }
}

writeValue(v: any | null): void {
  this.value = v
}
registerOnChange(fn: any): void {
  this.onChange = fn;
}
registerOnTouched(fn: any): void {
  this.onTouch = fn;
}
setDisabledState(isDisableed: boolean): void {
  this.disabled = isDisableed;
}

private _handleInput(): void {

  // 用户touch之后,才做错误信息判断
  if (this.valueCtrl.touched || this.focused) {
    this.onChange(this.value)
  }
}
}
