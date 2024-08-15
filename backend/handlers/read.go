package handlers

import (
	"encoding/json"
	"net/http"
)

// 读取分类数据
func HandleReadCategories(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	categories, err := readDataFromFile()
	if err != nil {
		http.Error(w, "读取数据失败", http.StatusInternalServerError)
		return
	}

	// 发送成功响应
	w.Header().Set("Content-Type", "application/json")

	// 构建包含成功消息和数据的响应体
	response := map[string]interface{}{
		"message": "成功获取数据",
		"data":    categories,
		"code":    20000, // 可选的返回状态码
	}

	// 发送响应
	json.NewEncoder(w).Encode(response)

}
