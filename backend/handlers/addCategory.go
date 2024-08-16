package handlers

import (
	"backend/models"
	"encoding/json"
	"net/http"
)

// 添加分类
func HandleAddCategory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// 定义一个新的分类变量
	var newCategory models.Category
	err := json.NewDecoder(r.Body).Decode(&newCategory)
	if err != nil {
		http.Error(w, "Invalid data", http.StatusBadRequest)
		return
	}

	// 读取数据文件
	categories, err := readDataFromFile()
	if err != nil {
		http.Error(w, "读取数据失败", http.StatusInternalServerError)
		return
	}

	// 检查是否已经存在
	updated := false

	for i, category := range categories {
		if category.CategoryID == newCategory.CategoryID {
			// 更新分类数据，保留原有的URL列表
			newCategory.URLs = category.URLs
			// 发现了具有相同ID的分类，进行更新
			categories[i] = newCategory
			updated = true
			break
		}
	}
	if !updated {
		// 没有找到具有相同ID的分类，是新增的分类
		maxID := 0
		for _, category := range categories {
			if category.CategoryID > maxID {
				maxID = category.CategoryID
			}
		}
		newCategory.CategoryID = maxID + 1 // 设置新的 ID 为当前最大 ID + 1
		categories = append(categories, newCategory)
	}

	// 写入数据文件
	err = writeDataToFile(categories)
	if err != nil {
		http.Error(w, "Error writing data", http.StatusInternalServerError)
		return
	}

	// 写入数据文件成功后，发送 JSON 响应体
	w.Header().Set("Content-Type", "application/json") // 设置响应头
	response := map[string]interface{}{
		"message": "成功添加数据",
		"code":    20000,
		"data":    newCategory, // 返回添加的分类
	}
	json.NewEncoder(w).Encode(response) // 发送 JSON 响应体
}
