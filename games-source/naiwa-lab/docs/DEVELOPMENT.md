# 开发与维护

## 文件职责

| 文件 | 职责 |
| --- | --- |
| src/engine.js | 状态机、概率、价格、卡牌、日结、进化、存档验证；浏览器 RogueLab / Node module.exports |
| src/app.js | DOM、弹窗、交互、存档、音效开关、图集解码 |
| src/style.css | 独立游戏视觉与移动端布局 |
| src/embed.js | `?embed=1` 时启用同源父子消息与自适应高度 |
| scripts/build.cjs | 将素材转为资源脚本，输出多文件站点与离线单文件 |

主要API：`initial`、`start`、`choose`、`hexCost`、`train`、`deliver`、`discard`、`buyGpu`、`buyModel`、`endDay`、`continueRun`、`restore`、`evolution`、`synergies`。失败返回 `{error}`，不修改状态；交付返回 `{value, contribution}`，经费和目标贡献可能不同。

## 修改数值

显卡与架构在 `GPUS`、`MODELS`；卡牌在 `HEXES`；日目标在 `quotaFor`；训练概率在 `probabilities`。修改后运行 `npm test`。不要只改描述而不改效果，或只改逻辑不改卡牌文本。

图集有25格，实际绘制行间距并非绝对均匀，`prepareTextureCells` 按真实边界读取并保持比例。更换图集时同步调整裁切边界与图鉴，不要只替换文件名。运行时将大图数据转为 Blob URL，避免超大的 CSS 自定义属性失效。

## 验证范围

- `npm run check`：主要运行脚本语法。
- `npm test`：30张海克斯、免费次数与资源消耗、3/6协同、条件效果、返还上限、日目标、进化、存档、长期运行；以及可重建输出、静态引用和无本机路径检查。
- `node tests/browser-smoke.cjs`：可选，先构建，使用 Node.js 22 或更新版本，并设置 `BROWSER_PATH` 为本机 Chrome/Chromium 程序路径。使用临时本地服务与单独浏览器测试目录，验证同源 iframe 展开、训练、刷新恢复、关闭与高度通信。测试输出在 `.qa/`，不提交 Git。
- 原型此前通过桌面/手机操作与素材解码检查。Docusaurus组件按现有项目结构提供；实际 Wiki 全站构建、导航及首页布局仍需在接入后按集成文档验收。

GitHub Actions 默认只做无浏览器的 check/test。无需 secrets；没有自动修改 Wiki 或推送其他仓库的行为。

## 打包与部署

`dist/` 适合静态托管，所有资源路径相对 index.html。`standalone/index.html` 可离线双击。源码仓库保留原始PNG、SVG、WAV；生成的Base64资源不提交。

游戏单HTML约7MB，建议只在用户点击入口后加载。后续可将资源改为按需下载，但要同步考虑离线试玩要求。

本地预览服务只监听127.0.0.1，不是生产服务器。生产使用现有 Wiki 静态托管即可。
