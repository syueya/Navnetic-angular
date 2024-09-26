/* eslint-disable @typescript-eslint/no-explicit-any */
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {SPACE} from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Output,
  OnDestroy,
  Optional,
  Self,
  TemplateRef,
  ViewChild,
  EventEmitter
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NgControl} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { isArray } from '@common/util';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'cm-input-seleted-search',
  templateUrl: './input-seleted-search.component.html',
  styleUrls: ['./input-seleted-search.component.scss'],
  providers: [
    {provide: MatFormFieldControl, useExisting: CmInputSeletedSearchComponent},
  ],
  exportAs: 'InputSeletedSearch',
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[class.mat-form-field-invalid]': 'invalid',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmInputSeletedSearchComponent implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {

  $destroy: Subject<void>;

  // 展示空选项
  private _showEmptyOption = false;
  @Input()
  get showEmptyOption(): boolean {
    return this._showEmptyOption;
  }

  set showEmptyOption(value: boolean) {
    this._showEmptyOption = coerceBooleanProperty(value);
  }

  // 是否自定义选项模板
  private _customSelectTrigger = false;
  @Input()
  get customSelectTrigger(): boolean {
    return this._customSelectTrigger;
  }

  set customSelectTrigger(value: boolean) {
    this._customSelectTrigger = coerceBooleanProperty(value);
  }
/* 自定义选项模板  */
  @Input()
  triggerRenderTemplate: TemplateRef<any>;
  // 是否多选
  private _multiple = false;
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }

  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }

  static nextId = 0;
  // 搜索表单控制器
  searchCtrl: FormControl;

  @ViewChild('search_input', {static: false})
  _searchInput: ElementRef;

  @ViewChild('select', {static: true})
  select: MatSelect;

  selectCtrl = new FormControl(null);

  // 支持的列表
  private _selectData: any[];
  @Input('selectData')
  public get selectData(): any[] {
    return this._selectData;
  }

  public set selectData(value: any[]) {
    this.$selectDataSub.next(value);
  }
  $selectDataSub: Subject<any[]>;

  // 上一个值
  private prevValue: any;
  // 展示空选项
  @Input()
  showSearch = true;
  /**
   * 搜索后的列表
   */
  searchRes: any[];
  // 默认显示的字符串
  @Input()
  renderProp = 'name';
  //  自动提示渲染内容，
  @Input()
  optionRender: TemplateRef<any>;

  // 用来作为option value的对象属性
  @Input()
  valueProp = 'id';

  // 跟踪函数
  @Input('trackByFunc')
  trackByItemId = (_: number, item: any) => item[this.valueProp] || item['code'] || item;
  // 用于判断autocompelete是否一致
  @Input()
  isEqualFunc: (target: any, search: string) => boolean;


  @Output()
  readonly changeOpened = new EventEmitter<boolean>();
  // 状态检测
  stateChanges = new Subject<void>();
  focused = false;

  /**
   * 用户选择change事件
   */
  @Output()
  readonly selectionChange = new EventEmitter<MatSelectChange>();

  // 错误状态
  get errorState(): boolean {
    return this.ngControl && this.ngControl.touched && this.ngControl.invalid;
  }

  controlType = 'select-role-user-input';
  id = `input-select-${CmInputSeletedSearchComponent.nextId++}`;
  describedBy = '';


  onChange = (_: any) => {
  };
  onTouch = () => {
  };

  get empty() {
    if (this.multiple) {
      if (Array.isArray(this.value)) {
        return this.value.length === 0;
      }
      return true;
    }
    return this.value === null || this.value === '';;
  }

  // 一直浮动
  get shouldLabelFloat() {
    return !this.empty || this.focused;
  }


  public get invalid() {
    try {
      return this.ngControl.invalid;
    } catch (error) {
      return false;
    }
  }


  @Input()
  placeholder = '';

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _required = false;

  /*
  *禁用指定的选项
   */
  @Input()
  disabledIds: any[];

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
    if (value) {
      this.selectCtrl.disable();
    } else {
      this.selectCtrl.enable();
    }
  }

  private _disabled = false;

  @Input()
  get value(): any {
    //  如果每个值都存在，则有效
    return this.selectCtrl.value;
  }

  set value(v: any) {
    // setTimeout(() => {
    // if(this.select){
    this.selectCtrl.setValue(v);
    // }
    // }, 0);
    this.stateChanges.next();
  }

  private valueChangeSubscriptions: Subscription[];
  /**
   * 过滤后的可用的列表
   */
  get validList(): any[]{
    return (this.searchRes || [])
            .filter(item => !(this.disabledIds || [])
            .includes(item[this.valueProp]))
  }
  constructor(fb: FormBuilder, private fm: FocusMonitor,
              private elRef: ElementRef<HTMLElement>,
              @Optional() @Self() public ngControl: NgControl,
              private cdr: ChangeDetectorRef
  ) {
    this.$destroy = new Subject();

    this.valueChangeSubscriptions = [];
    this.$selectDataSub = new Subject();
    // 初始化，并订阅事件
    // 初始化
    this.searchCtrl = fb.control(null);
    this.subscribeValueChange();
    // 见监控fm的点击事件
    fm.monitor(elRef, true).pipe(takeUntil(this.$destroy)).subscribe(origin => {
      // 禁用后不再触发点击时间
      if (this.disabled) {
        return;
      }
      if (this.focused && !origin) {
        this.onTouch();
      }
      this.focused = !!origin;
      this.stateChanges.next();
      this.cdr.detectChanges();
    });
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;

    }

    const sub1 = this.selectCtrl.valueChanges.pipe(takeUntil(this.$destroy)).pipe(debounceTime(200)).subscribe(_ => {
      this._handleInput();
      this.cdr.detectChanges();
    });

    this.valueChangeSubscriptions.push(sub1);

    // 阻止相同的下拉选项进行赋值 避免页面节点发生变化时重复赋值
    const sub2 = this.$selectDataSub.pipe(takeUntil(this.$destroy)).pipe(distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y))).subscribe(value => {
      this._selectData = value;
      this.searchRes = value;
    })
    this.valueChangeSubscriptions.push(sub2);
  }

  ngOnDestroy() {
    // console.warn('销毁')
    this.$destroy.next();
    this.$destroy.complete();
    if(this.valueChangeSubscriptions){
      this.valueChangeSubscriptions.forEach(s => s.unsubscribe());
    }
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  transformValues(): string {
    return this.value.map(val =>
      this.selectData.find(item => item[this.valueProp] === val)?.[this.renderProp]
    ).filter(Boolean).join(', ');
  }

  /**
   * 点击后,自动展开第一个select
   *
   * @param {MouseEvent} event
   * @memberof SelectUser
   */
  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'mat-select') {
      // 用户点击后，
      this.onTouch();
      this.select.open();
    }
  }

  writeValue(v: any | null): void {
    this.value = v;
    this.searchCtrl.setValue('');
    this.prevValue = v;
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
    if (!this.ngControl || this.ngControl.touched || this.focused) {
      // 那么判断用户是否选择了select，如果不再存在，则返回null
      const p = this.convertValue(this.prevValue);
      const v = this.convertValue(this.selectCtrl.value);
      if ((p === null && v === null) || p !== v) {
        this.onChange(this.selectCtrl.value);
        this.prevValue = this.selectCtrl.value;
      }
    }
  }

  /**
   * 将null/undefined和''空字符串转成undefined;
   */
  private convertValue(v: any) {
    if (v === null || v === '') {
      return undefined;
    }
    return v;
  }


  /**
   * 监听input值变化事件
   *
   * @private
   * @memberof InputSelectComponent
   */
  private subscribeValueChange() {
    // 获取过滤后的question列表
    // 订阅事件

    const sub = this.searchCtrl.valueChanges.pipe(takeUntil(this.$destroy)).pipe(
      startWith(''),
      debounceTime(200),
      map((name: string) => {
        return name ? this._filterQuestion(name) : this.selectData;
      })).subscribe(list => {
      this.searchRes = list;
      this.cdr.detectChanges();
    });
    this.valueChangeSubscriptions.push(sub);
  }

  // 过滤
  private _filterQuestion(question: string) {
    if (question) {
      return this.selectData.filter(q => {
        if (this.isEqualFunc) {
          return this.isEqualFunc(q, question);
        } else {
          return q[this.renderProp].toLowerCase().indexOf(question.toLowerCase()) !== -1;
        }
      });
    } else {
      return this.selectData;
    }
  }

  // select展开或关闭
  selectOpendChange(opened: boolean) {
    // 如果展开或者关闭时，如果过滤后的 条件为空那么，需要重置搜索条件
    if ((this._filterQuestion(this.searchCtrl.value) || []).length === 0) {
      this.searchCtrl.setValue(null);
    }
    this.onTouch();

    if (opened) {
      //展开后自动聚焦input
      if(this._searchInput){
        this._searchInput.nativeElement.focus();
      }
    } else {
      // 关闭后，判断错误状态
      this.stateChanges.next();
    }
    this.changeOpened.emit(opened);
  }

  /**
   * 用户选择change
   * @param $event
   */
  userSelectionChange($event: MatSelectChange) {
    this.selectionChange.emit($event);
    this.stateChanges.next();
  }

  /**
   *是否全部选中
   */
  isAllSelected(): boolean {
    const list = this.validList;
    return this.value && list.length > 0 && list.every(item => this.value.includes(item[this.valueProp]));
  }

  /**
   *选择全部
   *
   * @memberof CmInputSeletedSearchComponent
   */
  selectAll() {
    if (this.searchRes) {
      this.value = Array.from(new Set([
        ...(this.value || []),
        ...this.validList.map(item => item[this.valueProp])
      ]));
      this._handleInput();
      this.stateChanges.next();
    }
  }

  /**
   *取消选择
   *
   * @memberof CmInputSeletedSearchComponent
   */
  deselectAll() {
    if(isArray(this.value)){
      this.value = this.value.filter((val: any) => !this.validList.some(item => item[this.valueProp] === val));
    }
    this._handleInput();
    this.stateChanges.next();
  }

  hasSelected(): boolean {
    return this.value && this.value.length > 0 && this.validList.some(item => this.value.includes(item[this.valueProp]));
  }

  get selectItem(): any | any[] {
    if (this.selectData) {
      if (this.multiple) {
        if (!this.value) {
          return [];
        }
        return this.selectData.filter(item => this.value.includes(item[this.valueProp]));
      }
      return this.selectData.find(item => item[this.valueProp] === this.value);
    }
    return null;
  }

  searchKeydownHandle(event: KeyboardEvent) {
    const {keyCode} = event;
    if (
      keyCode === SPACE
    ) {
      event.stopPropagation();
    }
  }

}
