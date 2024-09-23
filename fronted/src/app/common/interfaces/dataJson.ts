export interface UrlItem {
  id : number;
  name: string;
  icon: string;
  href: string;
  description: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  category_icon: string;
  url: Array<UrlItem> | null;
}
