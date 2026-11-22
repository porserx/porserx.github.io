# PorserX · 项目主页

一个无依赖的静态项目主页，用来介绍 PorserX 的 GitHub 公开项目。

## 文件

```text
index.html    页面结构
styles.css    全部样式
app.js        主题切换、项目筛选、搜索、滚动动画
.nojekyll     关闭 GitHub Pages 的 Jekyll 处理
```

## 本地预览

直接打开 `index.html` 即可；也可以在目录中启动任意静态服务器：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080/`。

## 部署到 GitHub Pages

最简单的方式是使用用户主页仓库：

1. 新建 GitHub 仓库：`porserx.github.io`
2. 把本目录内的全部文件推到仓库根目录：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `.nojekyll`
3. 打开仓库 **Settings → Pages**
4. Source 选择 **Deploy from a branch**
5. Branch 选择 `main`，目录选择 `/ (root)`，保存
6. 等待 Actions 部署完成，访问 `https://porserx.github.io/`

如果不想新建仓库，也可以把文件放到任意仓库的 `docs/` 目录，然后在 Pages 中选择 `main` / `/docs`。

## 更新项目

项目信息目前写在 `index.html` 的 `#projectGrid` 中，每个卡片对应一个 `<article class="project-card">`。

更新时同步修改：

- 标题与描述
- `data-category`（`browser` / `hardware` / `tool`）
- `data-search`（搜索关键词）
- GitHub 链接
- EXET 下载链接

## 说明

- 不加载外部字体、图标库或追踪脚本
- 深浅色主题会记住用户选择
- 项目筛选和搜索在纯前端完成
- 响应式布局，支持手机和桌面
