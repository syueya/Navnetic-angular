package main

import (
	"backend/handlers"
	"log"
	"net/http"
)

func main() {
	// 路由
	http.HandleFunc("/read", handlers.HandleReadCategories)
	http.HandleFunc("/addCategory", handlers.HandleAddCategory)
	http.HandleFunc("/deleteCategory", handlers.HandleDeleteCategory)
	http.HandleFunc("/writeCategories", handlers.HandleWriteCategories)

	// 启动服务器
	port := ":8080"
	log.Printf("服务在端口 %s 上启动...", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatalf("服务启动失败: %v", err)
	}
}
