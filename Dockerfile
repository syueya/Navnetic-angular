# 第一步：构建Go后端
FROM golang:1.22-alpine AS backend-build

WORKDIR /backend
COPY ./backend /backend

RUN go mod tidy
RUN go build -o goland main.go && go clean -cache



# 第二步：构建Angular前端
FROM node:20-alpine AS frontend-build

WORKDIR /app
COPY . /app

RUN npm config set registry https://registry.npmmirror.com
RUN npm install --force
RUN npm run build


# 第三步：创建最终的Nginx镜像
FROM nginx:alpine AS final

# 复制自定义的Nginx配置
COPY ./nginx.conf /etc/nginx/nginx.conf

# 复制前端的构建结果到Nginx的静态文件目录
COPY --from=frontend-build /app/dist/navnetic-angular /usr/share/nginx/html

# 复制后端的Go可执行文件
COPY --from=backend-build /backend/goland /usr/local/bin/backend

# 添加一个启动脚本，启动Go后端和Nginx
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 暴露HTTP和HTTPS端口
EXPOSE 80 443

# 使用启动脚本来启动服务
CMD ["/start.sh"]


