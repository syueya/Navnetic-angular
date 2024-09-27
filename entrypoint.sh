#!/bin/bash

# 替换 nginx 配置文件中的 PORT 变量
envsubst '${PORT}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

chown -R \
    /app \
    /var/lib/nginx \
    /run/nginx \
    /var/log/nginx \
    /etc/nginx

# 启动 nginx 服务
nginx

# 进入工作目录
cd /app || exit

umask "${UMASK}"

# 执行 Navnetic
exec /app/Navnetic
