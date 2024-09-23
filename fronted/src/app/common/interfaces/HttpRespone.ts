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
