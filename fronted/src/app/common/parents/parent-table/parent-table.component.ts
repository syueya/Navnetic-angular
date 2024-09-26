/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BasicQueryParams, PaginatorPropsType, ServiceQueryParams, TableSortData, initialPaginatorProps } from '@common/interfaces';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { CmParentComponent } from '../parent/parent.component';

@Component({
  selector: 'cm-parent-table',
  templateUrl: './parent-table.component.html',
  styleUrls: ['./parent-table.component.scss']
})
export class CmParentTableComponent extends CmParentComponent implements OnInit {
  @ViewChild(MatTable, {static: false})
  matTable: MatTable<any>;
  // 分页器初始化;
  paginatorProps: PaginatorPropsType = initialPaginatorProps();

  // 分页器发生改变时
  $pagintorEvent: Subject<PageEvent>;

  // table 表头搜索页
  searchForm: FormGroup;

  /**
   * table 表格列搜索表头
   *
   * @type {string[]}
   * @memberof ParentTableComponent
   */
  searchFormColumns: string[] = [];
  displayedColumns: string[] = [];

  // 当前操作table data 数据对象
  activeTableDataItem: any;

  defaultPageSizeOptions = [20, 50, 100, 500, 999];

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  public get sortData(): TableSortData {
    return this.getSortData(this.sort);
  }

  constructor() {
    super();
    this.$pagintorEvent = new Subject();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.pagintorAndSearchFormChange();
    if (this.sort) {
      this.sort.sortChange.pipe(takeUntil(this.$destroy)).subscribe(sort => {
        // 如果存在分页器，且用户修改了分页器的page size，
        this.reloadTableData((!!this.paginatorProps && this.paginatorProps.pageSize !== BasicQueryParams.pageSize) ? {
          pageNum: BasicQueryParams.pageNum,
          pageSize: this.paginatorProps.pageSize
        } : BasicQueryParams, this.getSortData(this.sort));
      });
    }
  }

  onSearchSubmit() {
    this.$searchFormEvent.next();
  }

  /**
   * 分页器发生变化
   *
   * @param {PageEvent} e
   * @memberof ParentTableComponent
   */
  onPaginatorChange(e: PageEvent) {
    this.$pagintorEvent.next(e);
  }

  // 表单重置
  resetSearchForm() {
    if (this.searchForm.dirty) {
      this.searchForm.reset();
    }
  }
  /**
   * 当页下表，或者搜索表单改变时，联网获取网络数据
   *
   * @memberof TempalteTemplateListComponent
   */
  pagintorAndSearchFormChange() {
    // 监听表单值变化事件
    if (this.searchForm) {
      this.searchForm.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(v => {
        this.$searchFormEvent.next();
      });
    }

    // 收到搜索条件变化，发出网络请求，设置table data
    this.$searchFormEvent.pipe(debounceTime(500), takeUntil(this.$destroy)).subscribe(_ => {
      this.reloadTableData();
    });
    // 分页器数值发生变化时
    this.$pagintorEvent.pipe(debounceTime(500), takeUntil(this.$destroy)).subscribe((e: PageEvent) => {
      const { pageIndex, pageSize } = e;
      if (this.paginatorProps.pageIndex !== pageIndex || this.paginatorProps.pageSize !== pageSize) {
        this.paginatorProps.pageIndex = pageIndex;
        this.paginatorProps.pageSize = pageSize;
        this.reloadTableDataByPage();
      }
    });
  }
  // 按分页，重新获取
  reloadTableDataByPage() {
    const { pageIndex, pageSize } = this.paginatorProps;
    const query = { pageNum: pageIndex + 1, pageSize };
    if(this.sort){
      this.reloadTableData(query, this.getSortData(this.sort));
    }else{
      this.reloadTableData(query, undefined);
    }
  }

  /**
   * 转换sort 对象
   *
   * @private
   * @param {MatSort} sort
   * @memberof CmParentTableComponent
   */
  protected getSortData(sort: Sort) {
    if (sort && sort.active && sort.direction) {
      const data: TableSortData = {
        orderBy: sort.active,
        orderDirection: sort.direction
      };
      return data;
    }
    return undefined;
  }
  // 由继承组件实现
  reloadTableData(query?: ServiceQueryParams, sortData?: TableSortData) {}
}
