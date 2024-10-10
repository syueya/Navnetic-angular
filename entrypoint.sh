#!/bin/bash

# 替换 nginx 配置文件中的 PORT 变量
envsubst '${PORT}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

# 将环境变量 NavName 的值写入 navName.ts 文件
echo "export const navName = '$NavName';" > fronted/navName.ts

# 修改用户和用户组
groupmod -o -g "${PGID}" navnetic
usermod -o -u "${PUID}" navnetic
chown navnetic:navnetic -R \
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
exec su-exec navnetic:navnetic /app/Navnetic
