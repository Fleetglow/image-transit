CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  visitor_hash TEXT NOT NULL,
  path TEXT NOT NULL DEFAULT '/',
  referrer TEXT NOT NULL DEFAULT 'direct',
  device TEXT NOT NULL DEFAULT '桌面端',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events (created_at);
CREATE INDEX IF NOT EXISTS analytics_events_visitor_hash_idx ON analytics_events (visitor_hash);

CREATE TABLE IF NOT EXISTS daily_analytics (
  day DATE PRIMARY KEY,
  page_views INTEGER NOT NULL DEFAULT 0,
  unique_visitors INTEGER NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION update_daily_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO daily_analytics (day, page_views, unique_visitors)
  VALUES (
    CURRENT_DATE,
    1,
    (SELECT COUNT(DISTINCT visitor_hash) FROM analytics_events WHERE created_at::date = CURRENT_DATE)
  )
  ON CONFLICT (day) DO UPDATE SET
    page_views = daily_analytics.page_views + 1,
    unique_visitors = EXCLUDED.unique_visitors;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS analytics_event_daily_rollup ON analytics_events;
CREATE TRIGGER analytics_event_daily_rollup
AFTER INSERT ON analytics_events
FOR EACH ROW EXECUTE FUNCTION update_daily_analytics();
