package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
)

// 删除分类
func HandleDeleteCategory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	categoryIDStr := r.URL.Query().Get("category_id")
	if categoryIDStr == "" {
		http.Error(w, "category_id 是必须的", http.StatusBadRequest)
		return
	}

	// 将 categoryID 从 string 类型转换为 int 类型
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		http.Error(w, "转换失败", http.StatusBadRequest)
		return
	}

	categories, err := readDataFromFile()
	if err != nil {
		http.Error(w, "读取数据失败", http.StatusInternalServerError)
		return
	}

	// 找到并删除分类
	for i, category := range categories {
		if category.CategoryID == categoryID {
			categories = append(categories[:i], categories[i+1:]...)
			break
		}
	}

	err = writeDataToFile(categories)
	if err != nil {
		http.Error(w, "写入数据失败", http.StatusInternalServerError)
		return
	}

	// 发送成功响应
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"message":     "URL删除成功",
		"code":        20000,
		"category_id": categoryID, // 返回删除的分类ID
	}
	json.NewEncoder(w).Encode(response)
}
