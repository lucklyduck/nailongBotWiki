#!/bin/bash
# 本地预览 wiki：构建后的静态站点跑在 http://localhost:3000 ，并用 Chrome 打开。
# 用法：./preview.sh        （先改完内容记得 npm run build）
cd "$(dirname "$0")"
if [ ! -d build ]; then
  npm run build || exit 1
fi
(sleep 3 && open -a "Google Chrome" http://localhost:3000) &
npm run serve -- --port 3000
