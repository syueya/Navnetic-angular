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
		http.Error(w, "Error reading data", http.StatusInternalServerError)
		return
	}

	// 添加新的分类
	categories = append(categories, newCategory)

	// 写入数据文件
	err = writeDataToFile(categories)
	if err != nil {
		http.Error(w, "Error writing data", http.StatusInternalServerError)
		return
	}

	// 写入数据文件成功后，发送 JSON 响应体
	w.Header().Set("Content-Type", "application/json") // 设置响应头
	response := map[string]interface{}{
		"message":  "Category added successfully",
		"category": newCategory,
	}
	json.NewEncoder(w).Encode(response) // 发送 JSON 响应体
}
