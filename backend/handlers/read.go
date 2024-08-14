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
		http.Error(w, "Error reading data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
}
