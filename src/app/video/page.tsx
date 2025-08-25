"use client";

import { useState } from "react";

type SteamResolve =
  | { ok: true; title?: string; file_url?: string; isDem: boolean }
  | { ok: false; error: string };

function isShareCode(v: string) {
  const s = v.trim();
  return /^(CS2|CSGO)-[A-Z0-9]{5}(?:-[A-Z0-9]{5}){4}$/i.test(s);
}

function isWorkshopLike(v: string) {
  const s = v.trim();
  return /steamcommunity\.com\/sharedfiles\/filedetails\/\?id=\d+/i.test(s) || /^\d{6,}$/.test(s);
}

export default function DemosPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<SteamResolve | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setResult(null);

    const value = input.trim();
    if (!value) return;

    // 1) Code de partage: on affiche les instructions (pas d’API publique pour récupérer la démo)
    if (isShareCode(value)) {
      setResult({
        ok: true,
        title: "Code de partage détecté",
        file_url: undefined,
        isDem: false,
      });
      return;
    }

    // 2) Lien/ID Workshop: on tente une résolution via votre API
    if (isWorkshopLike(value)) {
      setLoading(true);
      try {
        const res = await fetch(`/api/steam/video?input=${encodeURIComponent(value)}`);
        const json = await res.json();
        if (!res.ok || json.error) {
          setErr(json.error || "Échec de la résolution Steam Workshop");
          setResult(null);
        } else {
          const fileUrl: string | undefined = json.file_url;
          setResult({
            ok: true,
            title: json.title,
            file_url: fileUrl,
            isDem: !!fileUrl && /\.dem(\?|$)/i.test(fileUrl),
          });
        }
      } catch {
        setErr("Erreur réseau");
      } finally {
        setLoading(false);
      }
      return;
    }

    // 3) Lien direct .dem
    if (/\.dem(\?|$)/i.test(value)) {
      setResult({ ok: true, title: "Fichier .dem direct", file_url: value, isDem: true });
      return;
    }

    setErr("Entrée non reconnue. Fournissez un code de partage CS2/CSGO, un lien/ID Workshop ou un lien direct .dem.");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Visionner des démos / replays CS2</h1>
      <p className="text-sm text-default-500">
        Collez un code de partage (CS2-xxxxx-… ou CSGO-xxxxx-…), un lien/ID Steam Workshop
        (filedetails?id=…), ou un lien direct vers un fichier .dem.
      </p>

      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ex: CS2-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX ou https://steamcommunity.com/sharedfiles/filedetails/?id=1234567890"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          {loading ? "Chargement..." : "Valider"}
        </button>
      </form>

      {err && <div className="text-danger text-sm">{err}</div>}

      {result?.ok && (
        <div className="rounded border p-4 space-y-4">
          {result.title && <div className="font-medium">{result.title}</div>}

          {/* Cas: code de partage */}
          {!result.isDem && !result.file_url && isShareCode(input) && (
            <div className="space-y-2 text-sm">
              <div>Code détecté: <code className="px-1 py-0.5 bg-content2 rounded">{input.trim()}</code></div>
              <div className="text-default-500">
                L’API Steam publique ne permet pas d’obtenir le replay vidéo. Pour regarder la démo:
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>Ouvrez CS2, onglet “Regarder”.</li>
                <li>Collez le code de partage dans la zone dédiée, puis téléchargez la démo.</li>
                <li>Lancez la lecture depuis l’interface ou via la console (playdemo).</li>
              </ol>
            </div>
          )}

          {/* Cas: lien .dem obtenu (Workshop ou direct) */}
          {result.isDem && result.file_url && (
            <div className="space-y-3 text-sm">
              <a
                className="inline-block px-3 py-2 rounded bg-success text-success-foreground"
                href={result.file_url}
                download
              >
                Télécharger la démo (.dem)
              </a>
              <div className="text-default-500">Instructions pour lire la démo dans CS2:</div>
              <ol className="list-decimal list-inside space-y-1">
                <li>Téléchargez le fichier <code>.dem</code>.</li>
                <li>Placez-le dans le dossier des démos CS2.</li>
                <li>Ouvrez CS2, activez la console développeur et utilisez <code>playdemo &lt;nom_fichier&gt;</code>.</li>
              </ol>

              <details className="mt-2">
                <summary className="cursor-pointer">Chemins utiles (macOS)</summary>
                <div className="mt-2 text-default-500">
                  Dossier CS2:
                  <div className="mt-1">
                    ~/Library/Application Support/Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/
                  </div>
                  Placez le .dem ici ou dans un sous-dossier (ex: replays/), puis lancez:
                  <div className="mt-1">
                    playdemo replays/nom_du_fichier.dem
                  </div>
                </div>
              </details>
            </div>
          )}

          {/* Cas: Workshop résolu mais pas de .dem lisible directement */}
          {!result.isDem && result.file_url && (
            <div className="text-sm text-default-500">
              Élément Workshop résolu, mais pas de fichier .dem directement téléchargeable.
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-default-500">
        Limitation: pas de streaming de replay via l’API publique Steam. Les codes de partage
        permettent de télécharger les démos dans CS2, mais ne sont pas exploitables côté web pour lire une vidéo.
      </div>
    </div>
  );
}