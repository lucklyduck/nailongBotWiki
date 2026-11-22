# 参与 NailongBotWiki 共创

欢迎改进教程、提交装配记录、修复页面问题或完善代码示例。

完整步骤与创作者名单：[在线阅读](https://nailong.nekokax.com/docs/contributors) · [仓库内阅读](source/docs/08-download/04-contributors.md)。

1. Fork 本仓库，Clone 自己的副本并新建工作分支。
2. 修改 `source/` 中的源码；电子件和打印件表格在 `source/docs/_partials/`。
3. 在 `source/` 运行 `npm ci`、`npm run start` 预览，再运行 `npm run build`。
4. 构建成功后将 `source/build/` 内容同步到 `site/`，审查并一起提交。
5. Push 到自己的 Fork，向 `lucklyduck/nailongBotWiki:main` 发起 PR，写清变化和验证方式。

仅在网页编辑小段文字也可以发起 PR，请注明未本地构建，由维护者补充发布文件。当前 `main` 关联 Cloudflare 正式站，提交 PR 不等于已上线。

已有仓库写权限的协作者也请使用独立分支与 PR。大规模调整先开 Issue 讨论，不要提交密码、令牌、私人配置或依赖目录。

希望加入署名时，请在 PR 中说明公开昵称、贡献及个人链接（可选），由维护者核对。
