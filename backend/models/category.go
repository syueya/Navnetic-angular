// 包声明
package models

// URL 代表单个 URL 记录
type URL struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Icon        string `json:"icon"`
	Href        string `json:"href"`
	Description string `json:"description"`
}

// Category 代表一个分类，包含多个 URL
type Category struct {
	CategoryID   int    `json:"category_id"`
	CategoryName string `json:"category_name"`
	CategoryIcon string `json:"category_icon"`
	URLs         []URL  `json:"url"`
}
