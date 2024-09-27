// 分类
export interface Category {
  category_id: number;          // id
  category_name: string;        // 分类名称
  category_icon: string;        // 分类图标
  url?: UrlItem[];              // 网址列表
}

// 网址
export interface UrlItem {
  id : number;                  // id
  name: string;                 // 网址名称
  icon: string;                 // 网址图标
  href: string;                 // 网址
  description: string;          // 网址描述
}
