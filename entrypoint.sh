#!/bin/bash

envsubst '${PORT}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf
nginx
cd /app || exit
