FROM alpine:3.20

# 定义构建参数，以便在构建时指定目标平台
ARG TARGETPLATFORM

ENV TZ="Asia/Shanghai" \
    PORT="8888" \
    PUID=1007 \
    PGID=10 \
    UMASK=022

# 设置工作目录
WORKDIR /app

# 复制json数据文件
COPY backend/data/data.json /app/data/data.json

# 根据 TARGETPLATFORM 变量复制相应平台的可执行文件到工作目录
COPY backend/dist/$TARGETPLATFORM/Navnetic /app/Navnetic

# 复制前端文件
COPY fronted/dist/fronted/browser/. /app/front

# 复制nginx配置文件
COPY nginx.template.conf /etc/nginx/nginx.template.conf

# 复制entrypoint.sh脚本
COPY entrypoint.sh /entrypoint.sh

# 查看/app目录的内容
RUN ls -al /app

# 这条指令使用Alpine Linux的包管理器apk来安装一系列软件包，包括tzdata（时区数据），nginx（Web服务器），gettext（用于国际化的消息翻译），su-exec（用于以其他用户身份执行命令的工具），bash（Bourne Again SHell），和shadow（用于管理用户和组的包）。--no-cache选项表示不使用缓存，每次都从远程仓库获取最新版本的包。
RUN apk --no-cache add \
        tzdata \
        nginx \
        gettext \
        su-exec \
        bash \
        shadow \
    && addgroup -S navnetic -g 1000 \
    && adduser -S navnetic -G navnetic -h /app -u 1000 -s /bin/bash \
    # 在容器内创建一个名为/app/config的目录
    && mkdir /app/config \
    # 为/app/Navnetic和/entrypoint.sh文件添加执行权限。
    && chmod +x /app/Navnetic /entrypoint.sh \
    # 控制用户可以创建的inotify监视器的数量
    && echo 'fs.inotify.max_user_watches=5242880' >> /etc/sysctl.conf \
    # 控制用户可以创建的inotify实例的数量
    && echo 'fs.inotify.max_user_instances=5242880' >> /etc/sysctl.conf

ENTRYPOINT [ "/entrypoint.sh" ]

EXPOSE 8888
VOLUME ["/app/config"]
VOLUME ["/app/data/data.json"]
VOLUME ["/app/front/assets/logos"]
VOLUME ["/app/front/assets/svgs"]