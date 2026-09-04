# GPT-Image-2 中转站索引

一个纯静态的单页站点：把分散在社区、群聊与收藏夹里的 GPT-Image-2 生图中转站渠道，整理成一张可搜索、可比较的使用地图。

**线上地址**：https://fleetglow.github.io/image-transit/

## 站点功能

- 渠道按计费方式分组：按量计费 / 按次计费，含价格、评分与备注
- 表头「推荐」「价格」点击排序，搜索框支持名称、备注、网址模糊过滤
- 亮暗双主题，跟随系统偏好，选择记忆在 localStorage
- 无框架、无构建、无依赖，全部为原生 HTML / CSS / JS

## 文件结构

```
index.html   页面结构，含内联主题图标与防闪烁的主题初始化脚本
data.js      渠道与平台数据（日常更新只需改这个文件）
main.js      渲染、搜索、排序、主题切换逻辑
style.css    全部样式
```

## 如何更新内容

编辑 `data.js`，按既有条目的字段结构增改（name / url / billing / price / rating / note / highlights），保存后提交推送：

```bash
git add data.js
git commit -m "更新渠道数据"
git push origin master
```

推送后 GitHub Actions 自动发布，约半分钟生效。

## 部署说明

- 托管于 GitHub Pages，来源为 GitHub Actions，工作流见 `.github/workflows/deploy.yml`
- 工作流不做任何构建，仅收集根目录静态文件直接发布
- 全站相对路径引用，部署在 `/image-transit/` 子路径下无需任何适配
- 本地预览：直接双击 `index.html`，或任意静态服务器指向本目录
