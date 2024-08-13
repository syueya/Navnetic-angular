// server.go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

// json文件路径
var filePath = "../resource/data.json"

// 主函数，启动服务器
func main() {
	http.HandleFunc("/api/read", handleReadData)
	http.HandleFunc("/api/write", handleWriteData)
	http.HandleFunc("/api/delete", handleDeleteData)

	log.Println("Listening on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

// 读取数据请求
func handleReadData(w http.ResponseWriter, r *http.Request) {
	jsonData, err := os.ReadFile(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound) // 设置状态码为 404 Not Found
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}

// 写入数据请求
func handleWriteData(w http.ResponseWriter, r *http.Request) {
	jsonData, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = os.WriteFile(filePath, jsonData, 0644)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK) // 设置状态码为 200 OK
}

// 删除数据请求
func handleDeleteData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	err := os.Remove(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
