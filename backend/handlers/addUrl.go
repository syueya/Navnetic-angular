package handlers

import (
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"
)

// 添加 URL 到分类
func HandleAddURLToCategory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// 解析请求体中的 URL 数据
	var urlToAdd models.URL
	err := json.NewDecoder(r.Body).Decode(&urlToAdd)
	if err != nil {
		http.Error(w, "Invalid data", http.StatusBadRequest)
		return
	}

	// 获取查询参数中的 category_id
	categoryIDStr := r.URL.Query().Get("category_id")
	if categoryIDStr == "" {
		http.Error(w, "Missing category_id query parameter", http.StatusBadRequest)
		return
	}

	// 将查询参数转换为 int
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		http.Error(w, "Invalid category_id", http.StatusBadRequest)
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
			// 检查 URL 是否存在
			for j, existingURL := range category.URLs {
				if existingURL.ID == urlToAdd.ID {
					// 存在相同 ID 的 URL，进行更新
					categories[i].URLs[j] = urlToAdd
					updated = true
					break
				}
			}
			if !updated {
				// 新增 URL，需设置新的 ID（这里假设自增ID逻辑）
				maxID := 0
				for _, u := range category.URLs {
					if u.ID > maxID {
						maxID = u.ID
					}
				}
				urlToAdd.ID = maxID + 1
				categories[i].URLs = append(categories[i].URLs, urlToAdd)
				updated = true
			}
			break
		}
	}

	// 处理分类中都没有找到匹配categoryID的情况
	if !updated {
		http.Error(w, "找不到分类", http.StatusBadRequest)
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
		"message": "成功增加数据",
		"data":    urlToAdd, // 返回更新后的分类数据
		"code":    20000,    // 返回状态码
	}
	json.NewEncoder(w).Encode(response)
}
