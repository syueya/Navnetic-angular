export interface  UrlItem {
  name: string;
  icon: string;
  href: string;
  description: string;
}

export interface  Category {
  category_name: string;
  category_id: string;
  category_icon: string;
  url: UrlItem[];
}
