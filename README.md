# GPT-Image-2 中转站索引

Vercel-ready Next.js site for the Notion page `GPT-Image-2 中转站可用渠道汇总`.

## 功能

- 前台渠道目录：按次 / 按量分表、搜索、点击推荐 / 价格排序
- 生成平台卡片、外链、YouTube 视频
- 亮色 / 暗色模式，记住浏览器选择
- `/admin` 管理后台
- 管理员登录
- PV / UV、每日趋势、来源、设备统计
- 匿名访客统计：服务端只保存哈希后的访客标识

## 本地准备

```powershell
npm install
Copy-Item .env.example .env.local
```

编辑 `.env.local`：

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ANALYTICS_SALT`
- `DATABASE_URL`

## Neon 数据库

在 Neon SQL Editor 执行 [`db/schema.sql`](./db/schema.sql)。执行后，前台访问会写入 `analytics_events`，每日汇总写入 `daily_analytics`。

## Vercel 部署

1. 将项目导入 Vercel。
2. 通过 Vercel Marketplace 添加 Neon Postgres。
3. 配置上述管理员环境变量。
4. 在 Neon SQL Editor 执行 `db/schema.sql`。
5. 部署。

无需 Vercel Cron：每条访问事件写入时同步维护当天汇总，减少部署配置。

## 当前内容来源

页面与数据基于用户提供的 Notion 页面及其「生图中转站」数据源快照，整理日期为 2026-09-02。价格、注册链接、可用性可能变化，充值前以目标站点实时信息为准。

