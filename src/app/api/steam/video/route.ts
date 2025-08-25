import { NextRequest, NextResponse } from "next/server";

// Tente d’extraire un publishedfileid depuis un lien Workshop ou une entrée numérique
function extractPublishedFileId(raw: string): string | null {
  const v = raw.trim();
  const m = v.match(/filedetails\/\?id=(\d{6,})/i);
  if (m) return m[1];
  if (/^\d{6,}$/.test(v)) return v;
  return null;
}

// Appelle ISteamRemoteStorage/GetPublishedFileDetails (pas de clé requise)
async function getPublishedFileDetails(publishedFileId: string) {
  const body = new URLSearchParams();
  body.set("itemcount", "1");
  body.set("publishedfileids[0]", publishedFileId);

  const res = await fetch(
    "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }
  );

  if (!res.ok) {
    throw new Error("Steam API error");
  }
  const json = await res.json();
  const details = json?.response?.publishedfiledetails?.[0];
  return details;
}

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("input");
  if (!input) {
    return NextResponse.json({ error: "Paramètre 'input' manquant" }, { status: 400 });
  }

  const fileId = extractPublishedFileId(input);
  if (!fileId) {
    return NextResponse.json(
      { error: "Aucun publishedfileid Workshop détecté" },
      { status: 400 }
    );
  }

  try {
    const details = await getPublishedFileDetails(fileId);
    if (!details || details.result !== 1) {
      return NextResponse.json(
        { error: "Élément Workshop introuvable" },
        { status: 404 }
      );
    }

    // Champs potentiellement utiles
    const title = details.title as string | undefined;
    const file_url = details.file_url as string | undefined; // parfois présent pour les fichiers uploadés
    const preview_url = details.preview_url as string | undefined;

    // On renvoie ce qu'on peut (lecture directe si MP4/WebM)
    return NextResponse.json({
      id: fileId,
      title,
      file_url,
      preview_url,
      file_type: details.file_type,
      consumer_app_id: details.consumer_app_id,
      time_updated: details.time_updated,
    });
  } catch {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}