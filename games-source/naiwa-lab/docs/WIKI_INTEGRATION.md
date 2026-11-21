# 接入 Docusaurus Wiki

本包准备了集成组件，但没有直接修改或部署你的 Wiki。现有项目结构为 `source/package.json`、`source/src/pages/index.js`、`source/static/`，Docusaurus 3.10.2 + React 19。

## 1. 放置游戏

在小游戏项目根目录执行 `npm run build`，将 **dist 内的全部文件**复制到 Wiki 的：

```text
source/static/games/naiwa-lab/
  index.html
  style.css
  engine.js
  app.js
  assets.js
  audio.js
  embed.js
```

构建输出已内嵌图像与声音的资源数据，不需要复制源码的 `assets/`。也可以只将 `standalone/index.html` 复制到这个静态目录，两种方式任选一种；多文件方式更适合后续维护和缓存。

Docusaurus 会保留 `static` 中的目录结构，将内容复制到构建产物。[官方静态资源说明](https://docusaurus.io/docs/static-assets)

## 2. 复制组件

将 `integration/docusaurus/NaiwaLab.jsx` 和 `NaiwaLab.module.css` 放到：

```text
source/src/components/NaiwaLab/
```

在 `source/src/pages/index.js` 增加：

```jsx
import NaiwaLab from '@site/src/components/NaiwaLab/NaiwaLab';
```

把现有的 `<header className={styles.hero}> ... </header>` 整块包起来：

```jsx
<Layout title="首页" description="奶龙机器人 Wiki">
  <NaiwaLab>
    <header className={styles.hero}>
      {/* 原来的 heroInner、标题、说明、按钮和图片保持在这里 */}
    </header>
  </NaiwaLab>
  {/* 原来的 slogan、文档入口、照片区继续放在这里 */}
</Layout>
```

上面是结构示例：保留原 header 里面的真实代码，不要用注释替换已有内容。组件中已使用 `useBaseUrl`，适配 Wiki 的 `/` 或 GitHub 项目站点的子路径。

## 3. 加上奶蛙入口图片

将最终 Q 版角色图放到 `source/static/img/naiwa-mascot.png`。在 Home 组件顶层调用 `useBaseUrl` 后传入：

```jsx
const mascotUrl = useBaseUrl('/img/naiwa-mascot.png');
// ...
<NaiwaLab mascotSrc={mascotUrl}>
  {/* 原有完整 header */}
</NaiwaLab>
```

项目已有 `useBaseUrl` 导入时不要重复导入。若还没有角色图，先不传此参数即可使用文字入口。入口在桌面默认靠左上方；修改 CSS 的 `.trigger` 可调整位置，避免遮住原介绍。手机端默认放在 hero 后方，防止覆盖正文。

## 4. 接入后的行为

- 点击入口：隐藏首页 hero，按需创建 iframe；未点击前不加载约 7 MB 的游戏资源。
- 游戏地址：`/games/naiwa-lab/index.html?embed=1`（实际地址由 `baseUrl` 拼接）。
- 嵌入模式隐藏小游戏自带的 Wiki 导航、模拟正文与入口，保留核心游戏。
- iframe 通过 `ResizeObserver` 通知父页面高度，适配手机三个标签区；高度限制在 420–2400px。
- 父组件只接收**同源且来自该 iframe**的消息。
- 点击“返回 Wiki”：移除 iframe、恢复 hero；已进行的每次操作都已自动保存。
- 没有给可信的自有 iframe 加不透明来源 sandbox，保证 localStorage 正常；不要改为 `sandbox="allow-scripts"` 后又期待同源存档继续工作。

当前组件面向同域静态部署。不要直接把 iframe 地址改成另一个域名；跨域方式需要双方同时配置消息目标来源及存档策略。

## 5. 本地验收后部署

在 Wiki 的 `source/` 下执行现有项目的安装、构建和预览命令：

```sh
npm ci
npm run build
npm run serve
```

逐项检查：入口无挡字；打开/关闭后页面位置合理；手机不横向溢出；免费海克斯不能重复领取；刷新可恢复进度；音效只能手动开启；Wiki 搜索和文档入口仍能使用。

游戏样式完全留在 iframe 中，不需要将 `src/style.css` 导入 Wiki 的全局 CSS。遇到资源 404，先核对复制的是 dist 的内容，而不是额外套了一层 dist 目录。若服务器设置 CSP，当前游戏需要允许本地脚本、`data:`/`blob:` 图像、`data:` 音频，以及页面使用的内联样式；单文件版还包含内联脚本。

## 更新与存档

修改小游戏源码后重新 build，再同步静态目录。不要手工修改 dist 后忘记回写源码。

当前使用 `naiwa-singularity-v3` 和 `naiwa-singularity-v3-prefs` 两个 localStorage key；在同一域名的不同路径下会共享进度。从本地 file 地址转到线上域名不会自动迁移。修改规则导致旧存档验证失败时会回到初始状态，发布不兼容更新前应考虑明确迁移或换版本key。

## 其他 Wiki / 普通 HTML

参考 `integration/plain-html.html`，把它的 hero 和 docs 示例替换成自己的页面内容，游戏仍放在同域 `games/naiwa-lab/`。使用 HTTP 服务测试嵌入，不要用 file 地址测试跨 iframe 通信。
