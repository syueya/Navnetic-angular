# 第一阶段：构建 Angular 前端应用
FROM node:20-alpine AS ng-build

WORKDIR /app

# 复制 Angular 源代码到工作目录
COPY . .

# 设置 npm 镜像源为淘宝的 npm 镜像
RUN npm config set registry https://registry.npmmirror.com

# 安装项目依赖
RUN npm install --force


# 构建 Angular 应用为生产版本
RUN npm run build



# 第二阶段：构建 Go 后端应用
FROM golang:1.22-alpine AS builder

WORKDIR /app/backend

# 复制 Go 模块文件和源代码到工作目录
COPY backend/ .

# 下载依赖并构建 Go 应用
RUN go mod download && go build -o /app/backend/app && go clean -cache




# 第三阶段：设置最终的运行环境
FROM alpine:latest

# 设置时区
ENV TZ=Asia/Shanghai

# 将构建好的 Angular 静态文件复制到镜像中
COPY --from=ng-build /app/dist /app/frontend

# 将构建好的 Go 应用复制到镜像中
COPY --from=builder /app/backend/app /app/backend/app



# 创建存储卷

VOLUME /app/frontend/assets/images
VOLUME /app/backend/app/data

# 增加作者信息
LABEL author=夏夏子

# 设置工作目录为后端应用目录
WORKDIR /app/backend

# 暴露 Go 应用的端口（根据你的应用配置调整端口号）
EXPOSE 2260


# 启动 Go 应用
CMD [./app]
