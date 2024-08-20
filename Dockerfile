

# 第一阶段：构建 Go 后端应用
FROM golang:1.22-alpine AS build-backend

WORKDIR /app

# 只复制 backend 目录中的文件到工作目录
COPY ./backend ./backend

# 下载依赖
RUN go mod download

# 静态编译 Go 应用
RUN go build -o /app/backend/main ./backend/main.go && go clean -cache



# 第二阶段：构建 Angular 前端应用
FROM node:20-alpine AS build-frontend

WORKDIR /app

# 复制所有源代码到工作目录
COPY . .

# 设置 npm 镜像源为淘宝的 npm 镜像
RUN npm config set registry https://registry.npmmirror.com

# 安装项目依赖
RUN npm install --force


# 构建 Angular 应用为生产版本
RUN npm run build

# 第三阶段：设置最终的运行环境
FROM nginx:alpine AS final

# 将构建好的 Angular 静态文件复制到镜像中
COPY --from=build-frontend /app/dist/navnetic-angular /usr/share/nginx/html

# 复制Go后端的可执行文件
COPY --from=build-backend /app/backend/main /usr/local/bin/backend


# 设置后端URL的环境变量
ENV BACKEND_URL=http://localhost:8080

# 挂载Go后端的`data`目录
VOLUME /backend/data

# 挂载Angular前端的`images`目录
VOLUME /frontend/images

# 启动Go后端和Nginx服务器
CMD ["sh", "-c", "backend & nginx -g 'daemon off;'"]
