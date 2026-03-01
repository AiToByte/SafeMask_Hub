#!/usr/bin/env bash

# 发生错误时终止脚本
set -e

# 1. 打包构建
echo "正在构建静态文件..."
npm run build

# 2. 进入打包后的任务目录
cd out

# 3. 如果是部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 4. 部署到 https://<USERNAME>.github.io/<REPO>
# 注意修改为你自己的仓库地址
git push -f git@github.com:你的用户名/safemask-hub.git master:gh-pages

cd -
echo "部署完成！"