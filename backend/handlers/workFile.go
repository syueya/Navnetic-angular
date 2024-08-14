package handlers

import (
	"backend/models"
	"encoding/json"
	"os"
)

// 读取数据文件并解析成结构体
func readDataFromFile() ([]models.Category, error) {
	data, err := os.ReadFile("data/data.json")
	if err != nil {
		return nil, err
	}

	var categories []models.Category
	err = json.Unmarshal(data, &categories)
	return categories, err
}

// 写入数据到文件
func writeDataToFile(categories []models.Category) error {
	data, err := json.MarshalIndent(categories, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile("data/data.json", data, os.ModePerm)
}
