"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = document.documentElement.dataset.theme === "dark";
    setDark(isDark);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }
  return <button className="ghost-btn icon-btn" onClick={toggle} aria-label="切换亮暗模式" title="切换亮暗模式"><img className="theme-icon" src={dark ? "/icons/mode-light.svg" : "/icons/mode-dark.svg"} alt="" /></button>
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!response.ok) { setError("账号或密码错误"); return; }
    onSuccess();
  }
  return <div className="login-wrap"><div className="eyebrow">GPT-IMAGE / PRIVATE CONSOLE</div><h1 className="admin-title">站点后台</h1><p>登录后查看站点访问趋势。统计只保存匿名访客标识，不保存原始 IP。</p><form className="login-form" onSubmit={submit}><div className="field"><label htmlFor="email">管理员邮箱</label><input id="email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="field"><label htmlFor="password">管理员密码</label><input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div><button className="primary-btn" type="submit">登录后台</button>{error && <div className="error">{error}</div>}</form><p className="setup-note">首次部署前，请在 Vercel 环境变量中设置 ADMIN_EMAIL、ADMIN_PASSWORD、ADMIN_SESSION_SECRET。</p></div>;
}

type Analytics = { rows: { day: string; page_views: number; unique_visitors: number }[]; totals: { page_views: number; unique_visitors: number }; sources: { name: string; count: number }[]; devices: { name: string; count: number }[]; demo?: boolean };

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<Analytics | null>(null);
  useEffect(() => { fetch(`/api/analytics?days=${days}`).then((response) => response.json()).then(setData).catch(() => setData(null)); }, [days]);
  const chart = useMemo(() => (data?.rows || []).slice(-7), [data]);
  const max = Math.max(1, ...chart.map((item) => item.page_views));
  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); onLogout(); }
  return <div className="wrap admin-page"><div className="admin-header"><div><div className="eyebrow">GPT-IMAGE / PRIVATE CONSOLE</div><h1 className="admin-title">访问分析</h1></div><div className="nav-actions"><a className="outline-btn" href="/">返回前台</a><ThemeToggle /><button className="ghost-btn" onClick={logout}>退出</button></div></div><div className="toolbar"><span className="section-desc">只统计已接入数据库后的访问；切换时间范围查看趋势。</span><select className="select" style={{ width: 130 }} value={days} onChange={(event) => setDays(Number(event.target.value))}><option value={7}>最近 7 天</option><option value={30}>最近 30 天</option><option value={90}>最近 90 天</option></select></div>{data?.demo && <div className="notice" style={{ marginBottom: 18 }}><span className="demo-badge">数据库尚未连接</span><p style={{ marginTop: 10 }}>当前显示空数据。配置 DATABASE_URL 并执行 <code>db/schema.sql</code> 后，前台访问会自动进入统计。</p></div>}<div className="metric-grid"><div className="metric"><span className="metric-label">页面访问量 PV</span><strong className="metric-value">{data?.totals?.page_views ?? "—"}</strong></div><div className="metric"><span className="metric-label">独立访客 UV</span><strong className="metric-value">{data?.totals?.unique_visitors ?? "—"}</strong></div><div className="metric"><span className="metric-label">平均每日 PV</span><strong className="metric-value">{data ? Math.round((data.totals.page_views || 0) / days) : "—"}</strong></div><div className="metric"><span className="metric-label">访客转化观察</span><strong className="metric-value">{data?.totals?.unique_visitors ? `${Math.round(data.totals.page_views / data.totals.unique_visitors)}x` : "—"}</strong></div></div><div className="analytics-grid"><section className="admin-panel"><h2 className="panel-title"><span>每日趋势</span><span className="demo-badge">PV / UV</span></h2><div className="chart">{chart.length ? chart.map((item) => <div className="bar-wrap" key={item.day}><div className="bar" style={{ height: `${Math.max(4, item.page_views / max * 190)}px` }} title={`${item.day}: ${item.page_views} PV / ${item.unique_visitors} UV`} /><span className="bar-label">{item.day.slice(5)}</span></div>) : <div className="section-desc">暂无统计记录</div>}</div></section><section className="admin-panel"><h2 className="panel-title">来源</h2><div className="list">{(data?.sources || []).length ? data?.sources.map((item) => <div className="list-row" key={item.name}><span>{item.name}</span><strong>{item.count}</strong></div>) : <span className="section-desc">暂无来源数据</span>}</div><h2 className="panel-title" style={{ marginTop: 34 }}>设备</h2><div className="list">{(data?.devices || []).length ? data?.devices.map((item) => <div className="list-row" key={item.name}><span>{item.name}</span><strong>{item.count}</strong></div>) : <span className="section-desc">暂无设备数据</span>}</div></section></div></div>;
}

export default function AdminShell({ authenticated }: { authenticated: boolean }) {
  const [loggedIn, setLoggedIn] = useState(authenticated);
  return loggedIn ? <Dashboard onLogout={() => setLoggedIn(false)} /> : <><div className="wrap admin-page"><div className="admin-header"><a className="brand" href="/"><span className="brand-mark" />GPT-IMAGE / INDEX</a><div className="nav-actions"><a className="ghost-btn" href="/">返回前台</a><ThemeToggle /></div></div><Login onSuccess={() => setLoggedIn(true)} /></div></>;
}




