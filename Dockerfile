# 构建Angular前端
FROM node:20-alpine AS frontend

WORKDIR /app

# 安装前端依赖项
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --force

COPY . .

# 暴露前端端口
EXPOSE 3000
# 构建前端应用程序
RUN npm run build



# 构建Go后端
FROM golang:1.22-alpine AS backend

WORKDIR /go/src/mygo


COPY ./backend/go.mod ./
RUN go mod download

COPY ./backend .
RUN CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -a -o main main.go && go clean -cache

# 暴露后端端口
EXPOSE 8080



# 合并前后端阶段
FROM nginx:alpine AS final

# 复制自定义的Nginx配置
COPY ./nginx.conf /etc/nginx/nginx.conf

# 复制前端的构建结果到Nginx的静态文件目录
COPY --from=frontend /app/dist/navnetic-angular /usr/share/nginx/html

RUN chmod +x /start.sh

# 使用启动脚本来启动服务
CMD ["nginx", "-g", "daemon off;"]


