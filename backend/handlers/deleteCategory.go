package handlers

import (
	"net/http"
)

// 删除分类
func HandleDeleteCategory(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	categoryID := r.URL.Query().Get("category_id")
	if categoryID == "" {
		http.Error(w, "Category ID is required", http.StatusBadRequest)
		return
	}

	categories, err := readDataFromFile()
	if err != nil {
		http.Error(w, "Error reading data", http.StatusInternalServerError)
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
		http.Error(w, "Error writing data", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
