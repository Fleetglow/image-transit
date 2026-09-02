import { NextResponse } from "next/server";
import { hashVisitor } from "@/lib/auth";
import { recordPageView } from "@/lib/analytics";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const visitorId = String(body.visitorId || "").slice(0, 120);
  if (!visitorId) return NextResponse.json({ ok: false }, { status: 400 });
  const headers = request.headers;
  await recordPageView({
    visitorId: hashVisitor(visitorId),
    path: String(body.path || "/").slice(0, 200),
    referrer: String(body.referrer || headers.get("referer") || "direct").slice(0, 300),
    userAgent: String(body.userAgent || headers.get("user-agent") || "").slice(0, 500),
    ip: headers.get("x-forwarded-for") || "",
  }).catch(() => undefined);
  return NextResponse.json({ ok: true });
}
