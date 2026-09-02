import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/analytics";
import { isAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "未登录" }, { status: 401 });
  const days = Number(new URL(request.url).searchParams.get("days") || 7);
  const data = await getAnalytics(days);
  return NextResponse.json(data || { rows: [], totals: { page_views: 0, unique_visitors: 0 }, sources: [], devices: [], demo: true });
}
