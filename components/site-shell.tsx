"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Channel, Platform } from "@/lib/data";

type Props = { channels: Channel[]; platforms: Platform[] };
type SortKey = "rating" | "price";
type SortDirection = "asc" | "desc";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }
  const icon = dark ? "mode-light.svg" : "mode-dark.svg";
  return <button className="ghost-btn icon-btn" onClick={toggle} aria-label="切换亮暗模式" title="切换亮暗模式"><img className="theme-icon" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/${icon}`} alt="" /></button>;
}

function priceValue(price: string) {
  const values = price.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  return values[0] ?? Number.POSITIVE_INFINITY;
}
function renderNote(note: string, highlights?: { text: string; color: "blue" | "red"; url?: string; code?: boolean }[]) {
  if (!highlights?.length) return note;
  const parts: ReactNode[] = [];
  let rest = note;
  let key = 0;
  while (rest) {
    const matches = highlights.map((highlight) => ({ highlight, index: rest.indexOf(highlight.text) })).filter((item) => item.index >= 0).sort((a, b) => a.index - b.index);
    if (!matches.length) {
      parts.push(rest);
      break;
    }
    const { highlight, index } = matches[0];
    if (index) parts.push(rest.slice(0, index));
    parts.push(highlight.url ? <a className={`note-highlight ${highlight.color}${highlight.code ? " code" : ""}`} href={highlight.url} target="_blank" rel="noreferrer" key={key++}>{highlight.text}</a> : <span className={`note-highlight ${highlight.color}${highlight.code ? " code" : ""}`} key={key++}>{highlight.text}</span>);
    rest = rest.slice(index + highlight.text.length);
  }
  return parts;
}
export default function SiteShell({ channels, platforms }: Props) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const matchingChannels = useMemo(() => channels.filter((channel) => {
    const text = `${channel.name} ${channel.note} ${channel.url}`.toLowerCase();
    return !query || text.includes(query.toLowerCase());
  }), [channels, query]);

  const byBilling = (billing: string) => matchingChannels.filter((channel) => channel.billing === billing).sort((a, b) => {
    if (sortKey === "rating") {
      const ratingResult = sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating;
      return ratingResult || priceValue(a.price) - priceValue(b.price) || a.name.localeCompare(b.name);
    }
    const priceResult = sortDirection === "asc" ? priceValue(a.price) - priceValue(b.price) : priceValue(b.price) - priceValue(a.price);
    return priceResult || b.rating - a.rating || a.name.localeCompare(b.name);
  });

  function toggleSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
      return;
    }
    setSortKey(nextKey);
    setSortDirection(nextKey === "rating" ? "desc" : "asc");
  }

  function sortLabel(key: SortKey) {
    if (sortKey !== key) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  }

  function renderTable(title: string, billing: string, index: string) {
    const rows = byBilling(billing);
    return <section className={`section table-section color-block ${billing === "按量计费" ? "block-lime" : "block-lilac"}`} key={billing}>
      <div className="wrap">
        <div className="section-header"><div><div className="eyebrow">{index} / {billing === "按次计费" ? "PAY PER IMAGE" : "PAY AS YOU GO"}</div><h2 className="section-title">{title}</h2><p className="section-desc">{billing === "按次计费" ? "按出图张数计费，多参考图场景更划算。" : "按 token 消耗计费，参考图越多越贵；适合单张文生图。"}</p></div><span className="section-index">{rows.length} CHANNELS</span></div>
        <div className="table-shell"><div className="table-scroll"><table><thead><tr><th>名称 / 注册网址</th><th><button className={`sort-button ${sortKey === "rating" ? "active" : ""}`} onClick={() => toggleSort("rating")}>推荐 {sortLabel("rating")}</button></th><th><button className={`sort-button ${sortKey === "price" ? "active" : ""}`} onClick={() => toggleSort("price")}>价格 {sortLabel("price")}</button></th><th>备注</th></tr></thead><tbody>{rows.map((channel) => <tr key={channel.name}><td><span className="channel-name">{channel.name}</span><a className="channel-url" href={channel.url} target="_blank" rel="noreferrer">{channel.url}</a></td><td><span className="rating">{channel.rating}.0 <span className="rating-bar"><span style={{ width: `${channel.rating * 10}%` }} /></span></span></td><td className="price">{channel.price}</td><td className="note">{renderNote(channel.note, channel.highlights)}</td></tr>)}</tbody></table>{rows.length === 0 && <div className="empty">没有匹配的渠道</div>}</div></div>
      </div>
    </section>;
  }

  return <>

    <header className="site-header">
      <div className="wrap"><nav className="nav"><a className="brand" href="#top"><span className="brand-mark" />GPT-IMAGE / INDEX</a><div className="nav-actions"><ThemeToggle /></div></nav></div>
      <div className="wrap hero" id="top"><div className="hero-grid"><div><div className="eyebrow">GPT-IMAGE-2 / CHANNEL DIRECTORY</div><h1>找到适合你的<br />生图中转站。</h1><p className="hero-copy">把分散在社区、群聊与收藏夹里的 GPT-Image-2 渠道，整理成一张可搜索、可比较的使用地图。按计费方式分组，再看价格、评分和备注。</p><div className="hero-meta"><span className="meta-chip">当前收录 {channels.length} 个渠道</span><span className="meta-chip">最后整理：2026-09-04</span></div></div><aside className="hero-aside"><strong>{channels.filter((item) => item.rating >= 8).length}</strong><span>个渠道获得 8 分及以上评分</span></aside></div><div className="notice-grid"><div className="notice warning"><span className="notice-label">充值提醒</span><p><strong className="recharge-warning">谨慎充值</strong> 价格、注册状态、模型分组会变化。充值前请以渠道站点实时信息为准。</p></div><div className="notice"><span className="notice-label">网络工具</span><p>需要科学上网？<a href="https://xn--9kqz23b19z.com/#/register?code=Llp9tlCM" target="_blank" rel="noreferrer">查看低价稳定方案 ↗</a></p></div></div><div className="video-card"><iframe src="https://www.youtube.com/embed/zAT2wiqBalY" title="GPT-Image-2 使用介绍" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div><div className="video-caption">视频无法加载？<a href="https://www.youtube.com/watch?v=zAT2wiqBalY" target="_blank" rel="noreferrer">在 YouTube 打开 ↗</a></div></div>
    </header>
    <main id="channels"><div className="wrap section search-section"><div className="toolbar"><div><div className="eyebrow">FILTER / SORT</div><p className="section-desc">点击表头「推荐」或「价格」即可切换排序方向。</p></div><input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索名称、备注、网址…" /></div></div>{renderTable("按量计费", "按量计费", "01")}{renderTable("按次计费", "按次计费", "02")}<section className="section color-block block-cream" id="platforms"><div className="wrap"><div className="section-header"><div><div className="eyebrow">03 / CREATION TOOLS</div><h2 className="section-title">生成平台</h2></div><span className="section-index">{platforms.length} TOOLS</span></div><div className="platform-grid">{platforms.map((platform) => <article className="platform" key={platform.name}><div><h3>{platform.name}</h3><p className="platform-note">{platform.note}</p></div><div className="platform-bottom"><div className="platform-links">{platform.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div><div className="ratio"><strong>{platform.customRatio ? "支持" : "不支持"}</strong>自定义比例</div></div></article>)}</div></div></section></main>
    <footer className="site-footer"><div className="wrap footer-row"><span>GPT-IMAGE / INDEX</span><span>价格与可用性以目标站点为准</span></div></footer>
  </>;
}
