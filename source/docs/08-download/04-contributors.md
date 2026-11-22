---
slug: /contributors
title: 创作者与共创
sidebar_label: 创作者与共创
---

## 创作者名单

| 创作者 | 负责内容 | 联系方式 |
|---|---|---|
| Kyle | 课程设计 | [微信二维码](/img/community/qr/kyle-wechat.jpg) |
| Howtion0 | 技术方案 | — |
| Spida | 项目共创 | — |
| 李浩远 | 项目共创 | — |
| 猫猫草 | 项目共创 | — |
| mean179 | 项目共创 | — |
| 李鑫浩 | 项目共创 | — |
| 致远Lyu | 项目共创 | — |

欢迎一起完善 NailongBotWiki。文档、装配记录、照片、设计和代码都是贡献。新增署名时，请提供希望公开的昵称、具体贡献和个人链接（可选），由维护者核对后加入。

[查看 GitHub 提交贡献者](https://github.com/lucklyduck/nailongBotWiki/graphs/contributors) · [项目仓库](https://github.com/lucklyduck/nailongBotWiki) · [首页交流群](/)

GitHub 的贡献者统计主要反映代码提交，不等同于完整创作者名单；未通过 Git 提交的贡献也可以在本页署名。

## 可以参与什么

- 修正错别字、失效链接和遗漏步骤。
- 提供真实的组装照片、打印参数、排错过程与设备测试结果。
- 改善手机排版、导航和其他阅读体验。
- 完善 Catnip Forge 教程、MCP 示例或互动作品。

只想反馈问题，可以直接 [提交 Issue](https://github.com/lucklyduck/nailongBotWiki/issues/new)。附上页面链接、问题描述和截图即可；涉及设备时，再说明主板与固件版本。

## 先分清 Fork、Clone 和 Pull

| 操作 | 作用 |
|---|---|
| Fork | 在自己的 GitHub 账号下建立仓库副本，供你提交改动 |
| Clone | 将 GitHub 仓库下载到电脑，首次参与时使用 |
| Pull | 把远端的新提交同步到已经克隆的本地仓库 |
| Pull Request（PR） | 请维护者审查并合并你的改动 |

普通参与者推荐 **Fork → Clone → 新分支 → 修改 → PR**，无需原仓库的写权限。已有协作者权限的成员也应在独立分支提交 PR，便于审查。

## 第一次拉取项目

安装 Git 与 Node.js（项目要求 Node.js 20 或以上；现有环境使用 Node.js 24）。先在 [仓库页面](https://github.com/lucklyduck/nailongBotWiki) 点击 **Fork**，然后把下面的 `YOUR_USERNAME` 替换成自己的 GitHub 用户名。

```bash
git clone https://github.com/YOUR_USERNAME/nailongBotWiki.git
cd nailongBotWiki
git remote add upstream https://github.com/lucklyduck/nailongBotWiki.git
git switch -c docs/my-improvement
cd source
npm ci
npm run start
```

浏览器打开终端显示的本地地址，修改后可实时预览。按 `Ctrl+C` 停止预览。

## 到哪里修改

| 内容 | 源文件位置 |
|---|---|
| 课程正文 | `source/docs/` |
| 创作者名单与本指南 | `source/docs/08-download/04-contributors.md` |
| 首页、照片墙与交流群 | `source/src/pages/index.js` |
| 全站样式 | `source/src/css/custom.css` |
| 电子件、购买链接与参考价 | `source/docs/_partials/materials-electronics.mdx` |
| 打印件清单 | `source/docs/_partials/materials-printed-parts.mdx` |
| 图片、视频、模型文件 | `source/static/` |
| 互动游戏源码 | `games-source/` |

物料共享文件同时用于“规格参数”和“物料与工具”，修改后要检查两页。页面地址由文档顶部 `slug` 决定，日常改文案不需要改网址。

## 构建并提交 PR

在仓库根目录执行以下 PowerShell 命令：

```powershell
Push-Location source
npm.cmd run build
if ($LASTEXITCODE -ne 0) { Pop-Location; throw '构建失败，请先处理报错' }
Pop-Location
Get-ChildItem -LiteralPath .\source\build -Force |
  Copy-Item -Destination .\site -Recurse -Force
git status --short
git diff -- source
git -c core.autocrlf=false add -- source site
git diff --cached --stat
git commit -m "docs: improve assembly instructions"
git push -u origin docs/my-improvement
```

这里的 `origin` 是你的 Fork。若改动包含 `games-source/`、根目录文档等文件，审查后也要单独 `git add` 对应路径。不要提交依赖目录、私人配置或密钥。

macOS / Linux 可在 `source/` 执行 `npm run build`，成功后回到根目录执行 `cp -R source/build/. site/`，其余 Git 步骤相同。

进入自己的 GitHub 仓库，点击 **Compare & pull request**：目标仓库选择 `lucklyduck/nailongBotWiki`，目标分支选择 `main`，来源选择自己的工作分支。说明改了什么、如何验证，页面调整附上截图。

当前网站发布的是仓库中的 **`site/`**。维护者确认源码和发布文件一致后合并，GitHub 上的 `main` 更新会触发既有 Cloudflare 发布流程；你的 Fork 或未合并 PR 不会自动更新正式网站。

只修一个错字，也可以在 GitHub 网页中编辑对应源码文件并提交 PR，在说明中注明“未本地构建”。由维护者补充构建并同步 `site/` 后完成发布。

## 下次参与前同步最新内容

先确保工作区没有未处理改动，再从原仓库同步：

```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
git switch -c docs/next-improvement
```

如果提示无法快进合并，先检查本地与远端的差异；不要直接用强制推送覆盖改动。多人共创时，一次 PR 尽量只处理一个主题，避免同时改同一段内容。

## 如何加入名单

提交 PR 时，可以一起修改本页的创作者表格，写明自己的昵称、贡献和可公开链接；也可以在 Issue 或交流群中联系维护者补充。只公开本人同意展示的信息，引用外部项目与素材时保留原有来源说明。

GitHub 操作参考：[Fork 仓库](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo) · [从 Fork 发起 PR](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork) · [同步 Fork](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/syncing-a-fork)。
