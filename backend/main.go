package main

import (
	"backend/handlers"
	"log"
	"net/http"
)

// 设置CORS头部通用函数
func setCORSHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200") // 前端应用域名
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
	w.Header().Set("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language,, Expires, Last-Modified, Pragma")
}

// 包装原有的handler，增加支持
func withCORS(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		setCORSHeaders(w)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		h(w, r)
	}
}

func main() {
	// 路由
	http.HandleFunc("/api/read", withCORS(handlers.HandleReadCategories))
	http.HandleFunc("/api/addCategory", withCORS(handlers.HandleAddCategory))
	http.HandleFunc("/api/delCategory", withCORS(handlers.HandleDeleteCategory))
	http.HandleFunc("/api/addUrl", withCORS(handlers.HandleAddURLToCategory))
	http.HandleFunc("/api/delUrl", withCORS(handlers.HandleRemoveURLFromCategory))

	// 启动服务器
	port := ":8080"
	log.Printf("服务在端口 %s 上启动...", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatalf("服务启动失败: %v", err)
	}
}
