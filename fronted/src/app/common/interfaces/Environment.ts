export interface Environment {
  [key: string]: any;
  production:boolean; // 是否是生产环境
  backEndUrl:string;  // 后端地址
  version:string;     // 版本
  navName:string;     // 自定义名称
}
