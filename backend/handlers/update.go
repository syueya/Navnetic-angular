package handlers

import (
	"backend/models"
	"encoding/json"
	"net/http"
)

// 写入分类数据到文件
func HandleWriteCategories(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost && r.Method != http.MethodPut {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var newCategories []models.Category
	err := json.NewDecoder(r.Body).Decode(&newCategories)
	if err != nil {
		http.Error(w, "Invalid data", http.StatusBadRequest)
		return
	}

	err = writeDataToFile(newCategories)
	if err != nil {
		http.Error(w, "Error writing data", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
