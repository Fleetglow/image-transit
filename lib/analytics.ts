import { getDb } from "./db";

export type AnalyticsRow = {
  day: string;
  page_views: number;
  unique_visitors: number;
};

export async function recordPageView(input: { visitorId: string; path: string; referrer: string; userAgent: string; ip: string }) {
  const sql = getDb();
  if (!sql) return;
  await sql`
    INSERT INTO analytics_events (visitor_hash, path, referrer, device, created_at)
    VALUES (
      ${input.visitorId},
      ${input.path},
      ${input.referrer || "direct"},
      ${getDevice(input.userAgent)},
      NOW()
    )
  `;
}

export async function getAnalytics(days: number) {
  const sql = getDb();
  if (!sql) return null;
  const safeDays = Math.min(Math.max(days, 1), 90);
  const rows = await sql`
    SELECT
      TO_CHAR(day, 'YYYY-MM-DD') AS day,
      page_views,
      unique_visitors
    FROM daily_analytics
    WHERE day >= CURRENT_DATE - ${safeDays - 1}
    ORDER BY day ASC
  `;
  const totals = await sql`
    SELECT
      COUNT(*)::int AS page_views,
      COUNT(DISTINCT visitor_hash)::int AS unique_visitors
    FROM analytics_events
    WHERE created_at >= CURRENT_DATE - ${safeDays - 1}
  `;
  const sources = await sql`
    SELECT COALESCE(NULLIF(referrer, ''), 'direct') AS name, COUNT(*)::int AS count
    FROM analytics_events
    WHERE created_at >= CURRENT_DATE - ${safeDays - 1}
    GROUP BY 1 ORDER BY count DESC LIMIT 8
  `;
  const devices = await sql`
    SELECT device AS name, COUNT(*)::int AS count
    FROM analytics_events
    WHERE created_at >= CURRENT_DATE - ${safeDays - 1}
    GROUP BY 1 ORDER BY count DESC
  `;
  return { rows, totals: totals[0], sources, devices };
}

export function getDevice(userAgent: string) {
  if (/mobile|android|iphone|ipad/i.test(userAgent)) return "移动端";
  if (/bot|crawler|spider/i.test(userAgent)) return "爬虫";
  return "桌面端";
}
