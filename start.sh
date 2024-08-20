
# 启动 Go 二进制文件
./main &

# 等待 Go 服务启动
sleep 2

# 启动 Nginx
nginx -g "daemon off;"
