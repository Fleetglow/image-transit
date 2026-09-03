# GPT-Image-2 中转站索引

纯静态 Next.js 网站，适合部署到 Vercel。

## 功能

- 按量 / 按次计费渠道分表
- 搜索渠道名称、备注、网址
- 点击推荐 / 价格排序
- 亮色 / 暗色模式
- 生成平台展示
- 外部链接与 YouTube 视频
- 响应式布局

## 本地运行

```powershell
Set-Location "D:\AI\image transit codex"
npm install
npm run dev
```

## 生成静态文件

```powershell
Set-Location "D:\AI\image transit codex"
npm run build
```

静态文件输出到：

```text
D:\AI\image transit codex\out
```

## Vercel 部署

直接将项目导入 Vercel。项目使用 `output: "export"` 生成静态站点，不需要数据库、环境变量或服务器后台。

## 更新内容

修改：

```text
D:\AI\image transit codex\lib\data.ts
```

修改后重新部署即可。

## 内容来源

内容基于用户提供的 Notion 页面快照。价格、注册链接和可用性可能变化，请以目标站点实时信息为准。

