"use client";
import { useState } from "react";

type SteamStats = {
  total_kills?: number;
  total_deaths?: number;
  total_kills_headshot?: number;
  total_wins?: number;
  total_mvps?: number;
  total_time_played?: number;
};

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; player: any; stats: SteamStats };

export default function AboutPage() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<FetchState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setData({ status: "loading" });
    try {
      const res = await fetch(`/api/steam/stats?input=${encodeURIComponent(input.trim())}`);
      const json = await res.json();
      if (!res.ok || json.error) {
        setData({ status: "error", message: json.error || "Fetch failed" });
        return;
      }
      setData({ status: "done", player: json.player, stats: json.stats });
    } catch (err: any) {
      setData({ status: "error", message: "Network error" });
    }
  }

  const stats = data.status === "done" ? data.stats : {};
  const player = data.status === "done" ? data.player : null;

  function ratio(a?: number, b?: number) {
    if (!a || !b) return "-";
    return (a / b).toFixed(2);
  }
  function hsPercent(hs?: number, kills?: number) {
    if (!hs || !kills) return "-";
    return ((hs / kills) * 100).toFixed(1) + "%";
  }
  function timePlayed(sec?: number) {
    if (!sec) return "-";
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h}h ${m}m`;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-semibold">Lookup CS2 Stats</h1>
      <p className="text-sm text-default-500">
        Enter a Steam profile URL (custom or numeric), a vanity name, or a 64-bit SteamID.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 border rounded px-3 py-2 bg-content1"
          placeholder="e.g. https://steamcommunity.com/id/s1mple/ or 7656119..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
          disabled={data.status === "loading"}
        >
          {data.status === "loading" ? "Loading..." : "Search"}
        </button>
      </form>

      {data.status === "error" && (
        <div className="text-danger text-sm">{data.message}</div>
      )}

      {data.status === "done" && (
        <>
          <div className="flex gap-4 items-center">
            {player?.avatarfull && (
              <img
                src={player.avatarfull}
                alt="Avatar"
                className="w-24 h-24 rounded-lg shadow"
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold">
                {player?.personaname || "Unknown Player"}
              </h2>
              <p className="text-xs break-all text-default-500">
                SteamID64: {player?.steamid}
              </p>
              {player?.profileurl && (
                <a
                  href={player.profileurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline text-sm"
                >
                  View Steam Profile
                </a>
              )}
            </div>
          </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard label="Kills" value={stats.total_kills} />
              <StatCard label="Deaths" value={stats.total_deaths} />
              <StatCard label="K/D" value={ratio(stats.total_kills, stats.total_deaths)} accent />
              <StatCard label="Headshot Kills" value={stats.total_kills_headshot} />
              <StatCard label="Headshot %" value={hsPercent(stats.total_kills_headshot, stats.total_kills)} />
              <StatCard label="Wins" value={stats.total_wins} />
              <StatCard label="MVPs" value={stats.total_mvps} />
              <StatCard label="Time Played" value={timePlayed(stats.total_time_played)} />
            </div>
        </>
      )}

      {data.status === "idle" && (
        <div className="text-sm text-default-400">
          Submit a Steam profile to see stats.
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div
      className={
        "rounded-lg border p-4 flex flex-col gap-1 bg-content1 " +
        (accent ? "border-primary/60 shadow-md" : "border-divider")
      }
    >
      <span className="text-xs uppercase tracking-wide text-default-500">
        {label}
      </span>
      <span className="text-xl font-semibold">{value ?? "-"}</span>
    </div>
  );
}