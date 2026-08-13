/** Generate voice reply via Fish Audio S2.1 Pro free tier */
interface Env {
  FISH_AUDIO_API_KEY: string;
  SUPPORT_TTS_SECRET?: string;
}

export const onRequestGet: PagesFunction<Env> = async () =>
  new Response("Method Not Allowed", { status: 405 });

export const onRequestPost: PagesFunction<Env> = async context => {
  const apiKey = context.env.FISH_AUDIO_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "FISH_AUDIO_API_KEY not configured" }, { status: 503 });
  }

  const secret = context.env.SUPPORT_TTS_SECRET;
  if (secret) {
    const auth = context.request.headers.get("Authorization");
    if (auth !== `Bearer ${secret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: { text?: string; reference_id?: string };
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = body.text?.trim();
  if (!text || text.length > 2000) {
    return Response.json({ error: "text required (max 2000 chars)" }, { status: 400 });
  }

  const payload: Record<string, unknown> = {
    text,
    format: "mp3",
  };
  if (body.reference_id) payload.reference_id = body.reference_id;

  const res = await fetch("https://api.fish.audio/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      model: "s2.1-pro-free",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    return Response.json({ error: `Fish Audio error: ${errText}` }, { status: 502 });
  }

  const audio = await res.arrayBuffer();
  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "private, max-age=3600",
    },
  });
};
