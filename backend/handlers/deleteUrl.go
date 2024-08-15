package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
)

// 删除指定分类下的特定ID对应的URL
// 删除指定分类下指定ID的URL
func HandleRemoveURLFromCategory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// 获取查询参数中的category_id和url_id
	categoryIDStr := r.URL.Query().Get("category_id")
	urlIDStr := r.URL.Query().Get("url_id")
	if categoryIDStr == "" || urlIDStr == "" {
		http.Error(w, "Missing category_id or url_id query parameter", http.StatusBadRequest)
		return
	}

	// 将查询参数转换为int
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		http.Error(w, "Invalid category_id", http.StatusBadRequest)
		return
	}
	urlID, err := strconv.Atoi(urlIDStr)
	if err != nil {
		http.Error(w, "Invalid url_id", http.StatusBadRequest)
		return
	}

	// 从文件中读取现有的分类数据
	categories, err := readDataFromFile()
	if err != nil {
		http.Error(w, "读取数据失败", http.StatusInternalServerError)
		return
	}

	updated := false
	for i, category := range categories {
		if category.CategoryID == categoryID {
			for j, existingURL := range category.URLs {
				if existingURL.ID == urlID {
					// 找到要删除的URL，进行删除操作
					categories[i].URLs = append(category.URLs[:j], category.URLs[j+1:]...)
					updated = true
					break // 从当前分类中删除URL后退出循环
				}
			}
			if updated {
				break // 如果已更新则无需继续检查其他分类
			}
		}
	}

	if !updated {
		http.Error(w, "未找到要删除的URL或分类", http.StatusBadRequest)
		return
	}

	// 把更新后的分类数据写回文件
	err = writeDataToFile(categories)
	if err != nil {
		http.Error(w, "数据写入失败", http.StatusInternalServerError)
		return
	}

	// 发送成功响应
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"message": "URL删除成功",
		"data":    urlIDStr, // 返回删除的URL
		"code":    20000,    // 返回状态码
	}
	json.NewEncoder(w).Encode(response)
}
