import { NextRequest, NextResponse } from "next/server";

const APP_ID = 730;

function extractInput(raw: string) {
  const v = raw.trim();
  if (/^\d{17}$/.test(v)) return { type: "steamid", value: v };
  if (v.includes("steamcommunity.com")) {
    const mId = v.match(/\/id\/([^/]+)/);
    if (mId) return { type: "vanity", value: mId[1] };
    const mProf = v.match(/\/profiles\/(\d{17})/);
    if (mProf) return { type: "steamid", value: mProf[1] };
  }
  return { type: "vanity", value: v };
}

async function resolveVanity(key: string, vanity: string): Promise<string | null> {
  const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${key}&vanityurl=${encodeURIComponent(vanity)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  if (json?.response?.success === 1) return json.response.steamid;
  return null;
}

export async function GET(req: NextRequest) {
  const key = process.env.STEAM_API_KEY;
  if (!key) return NextResponse.json({ error: "Missing STEAM_API_KEY" }, { status: 500 });

  const input = req.nextUrl.searchParams.get("input");
  if (!input) return NextResponse.json({ error: "Missing input parameter" }, { status: 400 });

  const parsed = extractInput(input);
  let steamId: string | null = parsed.type === "steamid" ? parsed.value : await resolveVanity(key, parsed.value);

  if (!steamId) return NextResponse.json({ error: "Unable to resolve Steam ID" }, { status: 404 });

  try {
    const statsUrl = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=${APP_ID}&key=${key}&steamid=${steamId}`;
    const profileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamId}`;

    const [statsRes, profileRes] = await Promise.all([fetch(statsUrl), fetch(profileUrl)]);
    if (!statsRes.ok || !profileRes.ok) {
      return NextResponse.json({ error: "Steam API request failed" }, { status: 502 });
    }

    const statsJson = await statsRes.json();
    const profileJson = await profileRes.json();

    const rawStats: any[] = statsJson?.playerstats?.stats || [];
    console.log("Raw stats:", rawStats);
    const mapped: Record<string, number> = {};
    for (const s of rawStats) {
      if (s.name.startsWith("total_")) mapped[s.name] = s.value;
    }

    const player = profileJson?.response?.players?.[0] || null;
    return NextResponse.json({ player, stats: mapped });
  } catch {
    return NextResponse.json({ error: "Internal fetch error" }, { status: 500 });
  }
}