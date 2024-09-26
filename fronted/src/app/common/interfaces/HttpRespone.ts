import { SortDirection } from "@angular/material/sort";

// 定义了一个简单的JSON值
export type PlainJsonValue = boolean | number | string | null | undefined;


// 定义了一个简单的JSON对象类型
export interface JsonType {
  [key: string]: PlainJsonValue | PlainJsonValue[] | JsonType | JsonType[];
}

// 定义了一个HTTP响应类型，其中T表示响应数据的类型
export interface HttpRespone<T extends JsonType | PlainJsonValue | PlainJsonValue[] | JsonType[] | any = any> {
  code: number;
  data?: T;
  message?: string | null;
}


// 定义了一个分页列表的HTTP响应结构
export interface ListRespone<T extends JsonType | PlainJsonValue | PlainJsonValue[] | JsonType[] | any = any> {
  /** 0: no error */
  code: number;
  /** payload */
  data?: {
    list: T[];
    total:number;
    pageNum:number;
    pageSize:number;
  };
  message?: string | null;
}

export interface TableSortData {

  // 排序字段

  orderBy: string;

  // 升序还是降序

  orderDirection: SortDirection;

}

/**
 * 列表查询，基础 query params
 *
 * @export
 * @interface ServiceQueryParams
 */
export interface ServiceQueryParams {
  pageNum: number;
  pageSize: number;
}

export const BasicQueryParams: ServiceQueryParams = {
  pageNum: 1,
  pageSize: 25
};

/**
 * 用于设置table分页表，属性类型
 *
 * @export
 * @interface PaginatorPropsType
 */
export interface PaginatorPropsType {
  pageIndex: number;
  pageSize: number;
  length: number;
}

export function initialPaginatorProps(): PaginatorPropsType {
  return {
      pageIndex: 0,
      pageSize: 25,
      length: 0,
  }
}
